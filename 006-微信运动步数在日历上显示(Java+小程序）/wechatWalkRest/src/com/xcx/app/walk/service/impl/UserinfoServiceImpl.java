package com.xcx.app.walk.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.xcx.app.walk.dao.UserinfoDao;
import com.xcx.app.walk.domain.Userinfo;
import com.xcx.app.walk.service.IUserinfoService;
import com.xcx.common.util.CalendarUtil;

@Service
public class UserinfoServiceImpl implements IUserinfoService {
	
	@Autowired
	private UserinfoDao userinfoDao;
	
	
	@Override
	public void updateUserinfoByOpenid(Userinfo userinfo){
		if(null != userinfo.getWeight() && userinfo.getWeight() <= 0){
			userinfo.setWeight(null);
		}
		if(null != userinfo.getHeight() && userinfo.getHeight() <= 0){
			userinfo.setHeight(null);
		}
		if(StringUtils.isEmpty(userinfo.getNickname())){
			userinfo.setNickname(null);
		}
		if(StringUtils.isEmpty(userinfo.getAvatarurl())){
			userinfo.setAvatarurl(null);
		}
		
		userinfoDao.updateUserinfoByOpenid(userinfo);
	}
	
	@Override
	public Userinfo getByOpenid(String openid){
		return userinfoDao.getByOpenid(openid);
	}
	
	@Override
	public void resetTodayStep(){
//		System.out.println("---------------------------------- resetTodayStep");
		userinfoDao.resetTodayStep();
		
		Integer date = CalendarUtil.getDate();
		if(date == 1){//第一天
			userinfoDao.resetMonthStep();
		}
		
	}
	
	@Override
	public Userinfo getOrCreate(String openid){
		Userinfo userinfo = getByOpenid(openid);
		if(null == userinfo){
			userinfo = new Userinfo();
			userinfo.setOpenid(openid);
			userinfo.setWeight(60);
			userinfo.setHeight(170);
			userinfoDao.create(userinfo);
		}
		return userinfo;
	}
	
	@Override
	public List<Userinfo> queryTodayRank(){
		return userinfoDao.queryTodayRank();
	}
	
	@Override
	public List<Userinfo> queryMonthRank(){
		return userinfoDao.queryMonthRank();
	}
	
	@Override
	public List<Userinfo> queryAllRank(){
		return userinfoDao.queryAllRank();
	}
	
	@Override
	public void create(Userinfo entity){
		userinfoDao.create(entity);
	}

	@Override
	public void update(Userinfo entity){
		userinfoDao.update(entity);
	}

	@Override
	public void delete(Userinfo entity){
		userinfoDao.delete(entity);
	}

	public static void main(String[] args){
		System.out.println(CalendarUtil.getDate());
	}
}
