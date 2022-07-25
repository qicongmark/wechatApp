package com.we.sport.common.util;


import com.alibaba.fastjson.JSONObject;

public class JsonView {

	public static String render(JsonData data){
		return JSONObject.toJSONString(data);
	}

	public static String renderError(JsonError error){
		return JSONObject.toJSONString(new JsonData(error.code, error.message));
	}
	
}
