package com.xcx.wechat.process.vo;

import java.util.Map;

import org.apache.commons.lang.StringUtils;

import net.sf.json.JSONObject;

/**
 * 模板消息
 */
public class TemplateMsg {
	
	private String touser; //openid
	private String template_id;//模板id
	private String page = "/pages/index/index";
	private String form_id;//模板消息id
	private Map<String,String> mapdata;//数据
	private String emphasis_keyword = "keyword2.DATA";
	private JSONObject data;
	private String color;
	
	public String getTouser() {
		return touser;
	}
	public void setTouser(String touser) {
		this.touser = touser;
	}
	public String getTemplate_id() {
		return template_id;
	}
	public void setTemplate_id(String template_id) {
		this.template_id = template_id;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getForm_id() {
		return form_id;
	}
	public void setForm_id(String form_id) {
		this.form_id = form_id;
	}
	public void setMapdata(Map<String, String> mapdata, Map<String, String> color) {
		this.mapdata = mapdata;
		JSONObject jsonObj = new JSONObject();
		for(String key : this.mapdata.keySet()){
			String value = this.mapdata.get(key);
			JSONObject tmpObj = new JSONObject();
			tmpObj.put("value", value);
			if(StringUtils.isNotEmpty(color.get(key))){
				tmpObj.put("color", color.get(key));
			}
			jsonObj.put(key, tmpObj);
		}
		this.data = jsonObj;
	}
	public JSONObject getData() {
		return data;
	}
	public String getEmphasis_keyword() {
		return emphasis_keyword;
	}
	public void setEmphasis_keyword(String emphasis_keyword) {
		this.emphasis_keyword = emphasis_keyword;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	
}
