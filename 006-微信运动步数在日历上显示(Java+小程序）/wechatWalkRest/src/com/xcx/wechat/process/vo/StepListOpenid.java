package com.xcx.wechat.process.vo;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;


/**
 * 用户的步数和openid
 */
public class StepListOpenid {
	
	private String openid;
	private JSONArray steplist;
	
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	public JSONArray getSteplist() {
		return steplist;
	}
	public void setSteplist(JSONArray steplist) {
		this.steplist = steplist;
	}
	
	public Integer getTodayStep(){
		if(null != steplist && steplist.size() > 0){
			JSONObject stepObj = (JSONObject)steplist.get(steplist.size()-1);
			if(stepObj.containsKey("step")){
				return stepObj.getIntValue("step");
			}
		}
		return 0;
	}
	
}
