package com.xcx.common.util;

import net.sf.json.JSONObject;

public class JsonView {
	//sessionkey
	private String sessionkey;
	
	//错误代码 0-成功
	private Integer errcode = 0;
	
	// 消息
	private String message;
	
	// 数据
	private Object data;
	
	public static String error = "error";
	
	public static String render(Object data){
		JsonView tmp = new JsonView(0, "success",data);
		return JSONObject.fromObject(tmp).toString();
	}
	
	public static String render(Integer errcode){
		JsonView tmp = new JsonView(errcode, "");
		return JSONObject.fromObject(tmp).toString();
	}
	
	public static String render(Integer errcode, String message){
		JsonView tmp = new JsonView(errcode, message);
		return JSONObject.fromObject(tmp).toString();
	}
	
	public static String render(Integer errcode, String message, Object data){
		JsonView tmp = new JsonView(errcode, message, data);
		return JSONObject.fromObject(tmp).toString();
	}
	
	public JsonView(Integer errcode, String message, Object data) {
		this.errcode = errcode;
		this.message = message;
		this.data = data;
	}
	
	public JsonView(Integer errcode, String message) {
		this.errcode = errcode;
		this.message = message;
	}

	public JsonView(Integer errcode) {
		this.errcode = errcode;
	}

	public JsonView() {
	}

	public Integer getErrcode() {
		return errcode;
	}

	public void setErrcode(Integer errcode) {
		this.errcode = errcode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
	
	public String getSessionkey() {
		return sessionkey;
	}

	public void setSessionkey(String sessionkey) {
		this.sessionkey = sessionkey;
	}

	public String toString(){
		return JSONObject.fromObject(this).toString();
	}
	
}
