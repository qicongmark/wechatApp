package com.xcx.app.walk.service;

import java.util.List;

import com.xcx.app.walk.domain.Userinfo;

public interface IUserinfoService {
	List<Userinfo> queryTodayRank();//今日榜
	List<Userinfo> queryMonthRank();//月榜
	List<Userinfo> queryAllRank();//总榜
	
	void updateUserinfoByOpenid(Userinfo userinfo);
	void resetTodayStep();
	
	Userinfo getByOpenid(String openid);
	Userinfo getOrCreate(String openid);
	void create(Userinfo entity);
	void update(Userinfo entity);
	void delete(Userinfo entity);
}
