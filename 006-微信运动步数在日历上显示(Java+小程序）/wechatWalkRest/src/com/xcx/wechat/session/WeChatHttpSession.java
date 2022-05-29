package com.xcx.wechat.session;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

/**
 * 模拟微信小程序session请求
 */
public class WeChatHttpSession {
	
	/**
	 * 缓存的session key数据
	 */
	private static Map<String, String> sessionIdMap = new HashMap<String,String>();
	
	//设置sessionid
	public static String setSessionOpenId(HttpServletRequest request, String sessionkey, String openid){
		String serverId = request.getParameter("serverId");
		if(StringUtils.isNotEmpty(serverId)){
			sessionIdMap.put(sessionkey, openid);
			return openid;
		}
		return null;
	}
	
	//获取sessionid
	public static String getSessionOpenId(HttpServletRequest request){
		String serverId = request.getParameter("serverId");
		if(StringUtils.isNotEmpty(serverId)){
			String sessionkey = request.getHeader("sessionkey");
			return sessionIdMap.get(sessionkey);
		}
		return null;
	}
	
}

