package com.github.dirkraft.jerseyboot.web;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.TreeMap;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.github.dirkraft.jerseyboot.base.BaseJsonResource;
import com.google.gson.Gson;

@Path("/timelines/")
public class FileCrawlerWeb extends BaseJsonResource {
	
	private String rootFile = "E:/_TEST/timelines";
	
	public FileCrawlerWeb()
	{
		rootFile = new File("").getAbsolutePath();
	}
	
	@GET
	@Path("/saveLoaded")
	@Produces(MediaType.APPLICATION_JSON)
	public Object saveLoaded(@QueryParam("loaded") String loadedKeys) 
	{
		String result = "ok";
		Properties props = getLoadedPropertyFiles();
		
		try {
			OutputStream output = new FileOutputStream(rootFile+"/loaded.properties");
			props.setProperty("loaded", loadedKeys);
			
			props.store(output, null);
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@GET
	@Path("/timelineData")
	@Produces(MediaType.APPLICATION_JSON)
	public Object getTimelines(@QueryParam("folderPaths") String folderPathsStr) 
	{
		String[] folderPaths = folderPathsStr.split(">");
		
		Map<String,Object> result = new HashMap<>();
		
		for (String folderPath : folderPaths) 
		{
			
			if(!folderPath.trim().isEmpty())
			{
				File folder = new File(folderPath);
				File[] listFiles = folder.listFiles();
				
				String timelineKey = getTimelineKey(folder.getName());
				String timelineName = getTimelineName(folder.getName(), timelineKey);
				
				List<Object> events = new ArrayList<>();
				
				for (File file : listFiles) {
					
					Properties p = getEventProperty(file); 
					Map<String,String> event = new HashMap<>();
					event.put("id", p.getProperty("id"));
					event.put("date", p.getProperty("date"));
					event.put("textContent", p.getProperty("textContent"));
					event.put("filePath", file.getAbsolutePath());
					event.put("folderPath", folder.getAbsolutePath());
					events.add(event);
				}
				
				Map<String,Object> timeLineData = new HashMap<>();
				timeLineData.put("timelineName", timelineName);
				timeLineData.put("events", events);
				timeLineData.put("folderPath", folder.getAbsolutePath());
				
				result.put(timelineKey, timeLineData);
			}
		}
		
		return result;
	}
	
	
	private Properties getEventProperty(File file) {
		
		Properties prop = new Properties();
		InputStream input;
		try {
			input = new FileInputStream(file);
			prop.load(input);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return prop;
	}

	@GET
	@Path("/timelineNames")
	@Produces(MediaType.APPLICATION_JSON)
	public Object getTimelineNames() 
	{
		Map<String, Object> results = getTimelinesLoadedNotLoaded();
		
		return results;
	}

	private Map<String, Object> getTimelinesLoadedNotLoaded() {
		
		Properties prop = getLoadedPropertyFiles();
		Set<String> loaded = new HashSet<>(Arrays.asList(prop.getProperty("loaded","").split(",")));
		
		File f = new File(rootFile);
		File[] listFiles = f.listFiles();
		Map<String,Object> results = new HashMap<>();
		Map<String, Map<String,String>> loadedMap = new HashMap<>();
		Map<String, Map<String,String>> notLoadedMap = new HashMap<>();
		
		for (File file : listFiles) {
			
			if(file.isDirectory())
			{
				String folderName = file.getName();

				String timelineKey = getTimelineKey(folderName);
				String timelineName = getTimelineName(folderName, timelineKey);
				
				Map<String, String> data = new HashMap<String,String>();
				data.put("timelineName", timelineName);
				data.put("folderPath", file.getAbsolutePath());
				
				if(loaded.contains(timelineKey))
				{
					loadedMap.put(timelineKey, data);
				}
				else
				{
					notLoadedMap.put(timelineKey, data);
				}
				
			}
		}
		
		results.put("loaded", loadedMap);
		results.put("notLoaded", notLoadedMap);
		return results;
	}


	private Properties getLoadedPropertyFiles() {
		Properties prop = new Properties();
		InputStream input = null;
	 
		Set<String> loaded = null;
		
		try {
			input = new FileInputStream(new File(rootFile+"/loaded.properties"));
			prop.load(input);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return prop;
	}

	private String getTimelineName(String folderName, String timelineKey) {
		return folderName.substring(timelineKey.length()+1, folderName.length());
	}

	private String getTimelineKey(String folderName) {
		String timelineKey;
		if(folderName.indexOf("-")==0)
		{
			String cleanId = folderName.substring(0, folderName.length()-1);
			timelineKey = "-"+cleanId.substring(0, cleanId.indexOf("-"));
		}
		else
		{
			timelineKey = folderName.substring(0, folderName.indexOf("-"));
		}
		return timelineKey;
	}
	
	@POST
	@Path("/saveEvent")
	@Consumes({"application/xml", "application/json"})
	@Produces({"application/xml", "application/json"})
	public Response saveEvent(Map<String,String> postData) 
	{
		
		//d: 1419432424972, date: 20120101121212, textContent: "fgdgdf", filePath: "E:\_TEST\timelines\1-timos1\20120101121212-1419432424972.properties"}
		
		if(postData.get("deleteOld") != null && postData.get("deleteOld").equals("true"))
		{
			File f = new File(postData.get("oldFilePath"));
			f.delete();
		}
		
		
		String id = postData.get("id");
		String date = postData.get("date");
		String textContent = postData.get("textContent");
		String filePath = postData.get("filePath");
		
		try {
			
			Properties prop = new Properties();
			File f = new File(filePath);
			OutputStream output = new FileOutputStream(filePath);
			prop.setProperty("id", id);
			prop.setProperty("date", date);
			prop.setProperty("textContent", textContent);
			
			prop.store(output, null);
			
			Gson gson = new Gson();
    		String json = gson.toJson(postData);
			
    		return Response.status(200).entity(json).build();
			
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("failed to create timeline - super fail").build();
		}
		
    }
	
	@POST
	@Path("/createNewTimeLine")
	@Consumes({"application/xml", "application/json"})
	@Produces({"application/xml", "application/json"})
	public Response saveTodo(Map<String,String> postData) 
	{
		
		try {
			String namePrefix = ""+new Date().getTime();
			String timelineName = postData.get("timelineName");
			String folderName = namePrefix+"-"+timelineName;
			File newTimelineFolder = new File(rootFile + "/" + folderName);
			
			if(!newTimelineFolder.exists() && !timelineName.isEmpty())
			{
				newTimelineFolder.mkdir();
				Map<String, Object> timelines = getTimelinesLoadedNotLoaded();
				Map<String,String> added = new HashMap<>();
				added.put("timelineKey", namePrefix);
				added.put("timelineName",timelineName);
				added.put("folderPath", newTimelineFolder.getAbsolutePath());
				
				Map<String,Object> loaded = (Map<String,Object>) timelines.get("loaded"); 
				loaded.put(namePrefix, added);
				
				Map<String,Object> result = new HashMap<>();
				result.put("added",added);
				result.put("timelines", timelines);
				
				Gson gson = new Gson();
	    		String json = gson.toJson(result);
				
	    		return Response.status(200).entity(json).build();
			}
			else
			{
				return Response.status(Status.INTERNAL_SERVER_ERROR).entity("failed to create timeline").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("failed to create timeline - super fail").build();
		}
		
    }
	
	private String getContents(File f) {
		
		String result = "";
		try{
			
			BufferedReader reader = new BufferedReader(new FileReader(f));
	
	        String line = null;
	        while ((line=reader.readLine()) != null) {
	        	result+=line + "\n";
	        }
	
	        reader.close(); 
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return result;
	}

	@GET
	@Path("/folder")
    @Produces(MediaType.APPLICATION_JSON)
    public Object getTopicWithId(@QueryParam("folderPath") String folderPath) 
	{
		
		if(folderPath.equalsIgnoreCase("main"))
		{
			folderPath = rootFile;
		}
		
		Map<String,Object> result = new HashMap<String,Object>();
		
		List<Object> folders = new ArrayList<Object>();
		List<Object> files = new ArrayList<Object>();
		
		File f = new File(folderPath);
		
		File[] subFiles = f.listFiles();
		
		try 
		{
			for(File file : subFiles)
			{
				if(file.isDirectory())
				{
					Map<String,String> folder = new TreeMap<String,String>();
					folder.put("folderPath", file.getAbsolutePath());
					folder.put("folderName", file.getName());
					
					folders.add(folder);
				}
				else if(file.getAbsolutePath().endsWith(".txt"))
				{
					Map<String,String> fileJson = new TreeMap<>();
					fileJson.put("filePath", file.getAbsolutePath());
					fileJson.put("content", getContent(file));
					files.add(fileJson);
				}
				else if(file.getAbsolutePath().endsWith(".concepts"))
				{
					Map<String,String> concepts = new TreeMap<String,String>();
					concepts.put("filePath", file.getPath());
					concepts.put("content", getContent(file));
					result.put("concepts", concepts);
				}
				else if(file.getAbsolutePath().endsWith(".symlinks"))
				{
					Map<String,String> symlinks = new TreeMap<String,String>();
					symlinks.put("filePath", file.getPath());
					symlinks.put("content", getContent(file));
					result.put("symlinks", symlinks);
				}
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		result.put("parentFolderPath", folderPath);
		result.put("subFolders", folders);
		result.put("textViews", files);
		
		return result;
		
    }
	
	private String getContent(File fromFile)
	{
		
		try{

			String result = "";
			BufferedReader reader = new BufferedReader(new FileReader(fromFile));

	        String line = null;
	        while ((line=reader.readLine()) != null) {
	        	result+=line + "\n";
	        }

	        reader.close(); 
	        return result;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return "";
	}
	
	@POST
	@Path("/newfolder")
	@Consumes({"application/xml", "application/json"})
	@Produces({"application/xml", "application/json"})
	public Response setSomeProps(Map<String,String> postData) 
	{
//		String result = "new subtopic created";
//		
//		
//		
//		System.out.println("received a mkdir request :: " + newFolder.getAbsolutePath());
//		
//		boolean createdFolder = newFolder.mkdir();
//		
//		postData.put("folderPath", newFolder.getAbsolutePath());
//		
//		Gson gson = new Gson();
//		String json = gson.toJson(postData);
//		
//		if(createdFolder)
//		{
//			return Response.status(200).entity(json).build();
//		}
//		else
//		{
//			System.out.println("DIDNT WORK");
//			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("failed to create folder").build();
//		}
		
		return null;
    }
	
	@POST
	@Path("/savetextview")
	@Consumes({"application/xml", "application/json"})
	@Produces({"application/xml", "application/json"})
	public Response saveTextView(Map<String,String> postData) 
	{
		
		try{
			
    		String[] expectedParams = new String[]{"signiture","filePath","content"};
    		
    		for(String key : expectedParams) 
    		{
    			if(postData.get(key) == null || postData.get(key).equals(""))
    			{
    				throw new RuntimeException("sad times");
    			}
    		}

    		String content = postData.get("content");
    		if(!content.trim().equals("-"))
    		{
    			String action = saveFile(postData.get("filePath"), content);
    			postData.put("action", action);
    		}
    		else{
    			deleteFile(postData.get("filePath"));
    			postData.put("action", "deleted");
    		}
    		
    		postData.remove("content");
    		Gson gson = new Gson();
    		String json = gson.toJson(postData);
    		
    		return Response.status(200).entity(json).build();
		
		}
		catch(Exception e)
		{
			System.out.println("DIDNT WORK");
			e.printStackTrace();
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("failed to save file").build();
		}
    }
	
	private void deleteFile(String filePath)
	{
		File deletedFile = new File(filePath);
		deletedFile.delete();
	}

	private String saveFile(String filePath, String content) throws Exception
	{
		
		String action = "ERROR";
		File f = new File(filePath);
		
		if(f.exists())
		{
			action = "saved";
		}
		else{
			action ="created";
		}
		
        BufferedWriter writer = new BufferedWriter(new FileWriter(filePath));

        writer.write(content);

        writer.close();  // Close to unlock and flush to disk.

        return action;
	}
	
}