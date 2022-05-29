package com.xcx.wechat;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.xcx.app.AppConfig;
import com.xcx.wechat.process.WeChatClient;
import com.xcx.wechat.process.vo.JsCodeSession;
import com.xcx.wechat.session.WeChatHttpSession;

/**
 * 微信小程序验证session有效性
 */
public class WeChatFilter {
	
	/**
	 * 验证session中的key是否正确
	 * @param request
	 * @return
	 */
	public static String validSessionOpenId(HttpServletRequest request){
		String openid = WeChatHttpSession.getSessionOpenId(request);
		if(StringUtils.isNotEmpty(openid)){
			return openid;
		}
		return null;
	}
	
	/**
	 * 返回openid
	 * @param request
	 * @param config
	 * @param code
	 * @return
	 */
	public static JsCodeSession refreshSessionOpenId(HttpServletRequest request, AppConfig config, String code){
		JsCodeSession jcs = WeChatClient.getJsCodeSession(config.getAppId(), config.getAppSecret(), code);
		if(null != jcs){
			String openid = jcs.getOpenid();
			String sessionkey = jcs.getSessionKey();
			WeChatHttpSession.setSessionOpenId(request, sessionkey, openid);
			return jcs;
		}
		return null;
	}
	
}

