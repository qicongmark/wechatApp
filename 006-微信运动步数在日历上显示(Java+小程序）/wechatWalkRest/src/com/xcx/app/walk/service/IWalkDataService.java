package com.xcx.app.walk.service;

import java.util.List;

import com.xcx.app.walk.domain.Userinfo;
import com.xcx.app.walk.domain.WalkData;
import com.xcx.wechat.process.vo.StepListOpenid;

public interface IWalkDataService {
	
	//上传打卡数据
	void uploadDakaDaka(Userinfo userinfo, Integer step);
	
	//获取打卡数据
	List<WalkData> getCalendarData(String openid, Integer year, Integer month);
	
	//补打卡数据
	List<WalkData> resignCalendarData(Userinfo userinfo,StepListOpenid stepObj, Integer year, Integer month);
	
	void create(WalkData entity);

	void update(WalkData entity);

	void delete(WalkData entity);

}
