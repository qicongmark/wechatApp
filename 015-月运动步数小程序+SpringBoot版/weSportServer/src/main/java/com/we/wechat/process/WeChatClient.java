package com.we.wechat.process;

import com.alibaba.fastjson.JSONObject;
import com.we.sport.common.util.BizDataCrypt;
import com.we.wechat.process.dto.JsCodeSession;
import com.we.wechat.process.dto.StepListOpenid;

/**
 * 微信 客户端，统一处理微信相关接口
 */
public class WeChatClient {

	static final String HTTP_GET = "GET";
	static final String ERROR_CODE = "errcode";
	static final String ACCESS_TOKEN = "access_token";
	static final String SESSION_KEY = "session_key";
	static final String OPENID = "openid";

	//获取access token
	public static String getAccessToken(String appId, String appSecret) {
		String url = WeChatApi.getAccessTokenUrl(appId, appSecret);
		JSONObject respObj = WeChatApi.httpsRequest(url, HTTP_GET, null);
		if (null != respObj && !respObj.containsKey(ERROR_CODE)) {
			return respObj.getString(ACCESS_TOKEN);
		}
		return null;
	}
	
	//获取用户的openid
	public static JsCodeSession getJsCodeSession(String appId, String appSecret, String jscode) {
		String url = WeChatApi.getJsCodeSessionUrl(appId, appSecret, jscode);
		JSONObject respObj = WeChatApi.httpsRequest(url, HTTP_GET, null);
		JsCodeSession jsCode = null;
		if (null != respObj && !respObj.containsKey(ERROR_CODE)) {
			jsCode = new JsCodeSession();
			jsCode.setOpenid(respObj.getString(OPENID));
			jsCode.setSessionKey(respObj.getString(SESSION_KEY));
		}
		return jsCode;
	}
	
	//获取用户的步数和openid
	public static StepListOpenid getStepListOpenid(String appId, String appSecret,
												   String encryptedData, String iv, String code){
		JsCodeSession jsCode = getJsCodeSession(appId, appSecret, code);
		if(null != jsCode){
			StepListOpenid returnObj = new StepListOpenid();
			String openid = jsCode.getOpenid();
			returnObj.setOpenid(openid);
			JSONObject stepList = BizDataCrypt.decrypt(encryptedData, jsCode.getSessionKey(), iv);
			if(null != stepList){
				returnObj.setSteplist(stepList.getJSONArray("stepInfoList"));
			}
			return returnObj;
		}
		return null;
	}


}



