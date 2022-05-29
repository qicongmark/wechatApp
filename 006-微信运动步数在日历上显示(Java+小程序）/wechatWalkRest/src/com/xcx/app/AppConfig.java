package com.xcx.app;

/**
 *app全局配置，以后可以放到数据库中
 *更多免费视频教程、源码获取、如何赚钱：
 *关注公众号：程序员祁老司 
 *或者关注 “程序员祁老司” 的B站：
 *https://space.bilibili.com/305587632
 */
public enum AppConfig {

	WECHAT_WALK("wechatWalk20200406", "wx5bc743c1ba6135ed", "9b6df914f12463ce09ce65186eb9a561");
	
	private String serverId;
	private String appId;
	private String appSecret;
	
	
	private AppConfig(String serverId, String appId, String appSecret) {
		this.serverId = serverId;
		this.appId = appId;
		this.appSecret = appSecret;
	}

	public static String getAppId(String serverId) {
		if (AppConfig.WECHAT_WALK.getServerId().equals(serverId)) {
			return AppConfig.WECHAT_WALK.getAppId();

		}

		return null;
	}

	public static AppConfig getInstance(String serverId) {
		if (AppConfig.WECHAT_WALK.getServerId().equals(serverId)) {
			return AppConfig.WECHAT_WALK;
		}

		return null;
	}

	public static AppConfig getInstanceByAppid(String appId) {
		if (AppConfig.WECHAT_WALK.getAppId().equals(appId)) {
			return AppConfig.WECHAT_WALK;
		}

		return null;
	}

	public String getServerId() {
		return serverId;
	}

	public String getAppId() {
		return appId;
	}

	public String getAppSecret() {
		return appSecret;
	}
	
}
