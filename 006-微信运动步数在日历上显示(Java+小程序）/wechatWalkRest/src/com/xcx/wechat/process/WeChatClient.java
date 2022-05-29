package com.xcx.wechat.process;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import com.xcx.common.HttpMethod;
import com.xcx.wechat.process.vo.JsCodeSession;
import com.xcx.wechat.process.vo.StepListOpenid;
import com.xcx.wechat.process.vo.TemplateMsg;


/**
 * 微信 客户端，统一处理微信相关接口
 */
public class WeChatClient {
	
	//获取access token
	public static String getAccessToken(String appId, String appSecret) {
		String url = WeChatApi.getAccessTokenUrl(appId, appSecret);
		JSONObject jsonObject = WeChatApi.httpsRequest(url, HttpMethod.GET, null);
		if (null != jsonObject && !jsonObject.containsKey("errcode")) {
			try {
				return jsonObject.getString("access_token");
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	//获取用户的openid
	public static JsCodeSession getJsCodeSession(String appId, String appSecret, String jscode) {
		String url = WeChatApi.getJsCodeSessionUrl(appId, appSecret, jscode);
		JSONObject jsonObject = WeChatApi.httpsRequest(url, HttpMethod.GET, null);
		JsCodeSession jsCode = null;
		if (null != jsonObject && !jsonObject.containsKey("errcode")) {
			try {
				jsCode = new JsCodeSession();
				jsCode.setOpenid(jsonObject.getString("openid"));
				jsCode.setSessionKey(jsonObject.getString("session_key"));
			} catch (JSONException e) {
				jsCode = null;//获取失败
			}
		}
		return jsCode;
	}
	
	//发送客服消息
	public static void sendTemplateMsg(String appId, String appSecret, TemplateMsg msg){
		String accessToken = getAccessToken(appId, appSecret);
		String requestUrl = WeChatApi.getTemplateMsgUrl(accessToken);
		
		String msgData = JSONObject.fromObject(msg).toString();
		WeChatApi.httpsRequest(requestUrl, HttpMethod.POST, msgData);
	}
	
	
	//获取用户的步数和openid
	public static StepListOpenid getStepListOpenid(String appId, String appSecret, 
			String encryptedData, String iv, String code){
		JsCodeSession jscode = getJsCodeSession(appId, appSecret, code);
		if(null != jscode){
			StepListOpenid returnObj = new StepListOpenid();
			String openid = jscode.getOpenid();
			returnObj.setOpenid(openid);
			String sessionkey = jscode.getSessionKey();
			
			com.alibaba.fastjson.JSONObject steplist = BizDataCrypt.decrypt(encryptedData, sessionkey, iv);
			if(null != steplist){
				returnObj.setSteplist(steplist.getJSONArray("stepInfoList"));
			}
			return returnObj;
		}
		return null;
	}
	
}



