package com.xcx.wechat.process.vo;

import java.io.Serializable;

public class JsCodeSession implements Serializable{
	
	private static final long serialVersionUID = 5241240812502739242L;
	
	private String openid;
	private String unionId;
	private String sessionKey;
	
	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getUnionId() {
		return unionId;
	}

	public void setUnionId(String unionId) {
		this.unionId = unionId;
	}

	public String getSessionKey() {
		return sessionKey;
	}

	public void setSessionKey(String sessionKey) {
		this.sessionKey = sessionKey;
	}
	
}
