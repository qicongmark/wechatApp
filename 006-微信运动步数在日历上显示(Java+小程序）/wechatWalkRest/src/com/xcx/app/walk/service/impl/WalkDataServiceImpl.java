package com.xcx.app.walk.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xcx.app.walk.dao.UserinfoDao;
import com.xcx.app.walk.dao.WalkDataDao;
import com.xcx.app.walk.domain.Userinfo;
import com.xcx.app.walk.domain.WalkData;
import com.xcx.app.walk.service.IWalkDataService;
import com.xcx.common.util.CalendarUtil;
import com.xcx.common.util.DateUtil;
import com.xcx.wechat.process.vo.StepListOpenid;


@Service
public class WalkDataServiceImpl implements IWalkDataService {
	
	@Autowired
	private WalkDataDao dataDao;
	
	@Autowired
	private UserinfoDao userinfoDao;
	
	//上传打卡数据
	@Override
	public void uploadDakaDaka(Userinfo userinfo, Integer step){
		Integer year = CalendarUtil.getYear();
		Integer month = CalendarUtil.getMonth();
		Integer kdate = CalendarUtil.getDate();
		
		if(StringUtils.isNotEmpty(userinfo.getOpenid())){
			WalkData entity = new WalkData();
			entity.setOpenid(userinfo.getOpenid());
			entity.setYear(year);
			entity.setMonth(month);
			entity.setKdate(kdate);
			
			WalkData walkData = dataDao.getTodayData(entity);
			if(null == walkData){//没有打卡过
				entity.setSteps(step);
				dataDao.create(entity);
			}else{//打过卡
				//先减去上次打卡数据
				userinfo.setMonthsteps(userinfo.getMonthsteps() - walkData.getSteps());
				userinfo.setSteps(userinfo.getSteps() - walkData.getSteps());
				userinfo.setKms(userinfo.getKms() - walkData.getKms());
				userinfo.setCaloris(userinfo.getCaloris() - walkData.getCaloris());
				
				if(walkData.getSteps() >= 10000){//上次是有效打卡
					userinfo.setMonthkeepcount(userinfo.getMonthkeepcount() - 1);
					userinfo.setKeepcount(userinfo.getKeepcount() - 1);
				}
				walkData.setSteps(step);
				dataDao.update(walkData);
			}
			
			//更新用户数据
			userinfo.setTodaysteps(step);
			userinfo.setSteps(userinfo.getSteps() + step);
			userinfo.setMonthsteps(userinfo.getMonthsteps() + step);
			
			//更新有效打卡次数
			if(step >= 10000){
				userinfo.setMonthkeepcount(userinfo.getMonthkeepcount() + 1);
				userinfo.setKeepcount(userinfo.getKeepcount() + 1);
			}
			userinfoDao.update(userinfo);
		}
	}
		
	//获取打卡数据
	@Override
	public	List<WalkData> getCalendarData(String openid, Integer year, Integer month){
		WalkData queryData = new WalkData();
		queryData.setOpenid(openid);
		queryData.setYear(year);
		queryData.setMonth(month);
		return dataDao.getCalendarData(queryData);
	}
	
	//补打卡
	@Override
	public	List<WalkData> resignCalendarData(Userinfo userinfo, StepListOpenid stepObj, Integer year, Integer month){
		List<WalkData> returnList = new ArrayList<WalkData>();
		
		String openid = stepObj.getOpenid();
		WalkData queryData = new WalkData();
		queryData.setOpenid(openid);
		queryData.setYear(year);
		queryData.setMonth(month);
		List<WalkData> list = dataDao.getCalendarData(queryData);
		List<WalkData> insertList = new ArrayList<WalkData>();
		
		JSONArray steplist = stepObj.getSteplist();
		for(Object item : steplist){
			JSONObject jsObj = (JSONObject)item;
			Long timestamp = jsObj.getLong("timestamp");
			Integer step = jsObj.getInteger("step");
			
			Date tdate = new Date(timestamp*1000);
			Integer tm = CalendarUtil.getMonth(tdate);
			Integer td = CalendarUtil.getDate(tdate);
			
			if(!month.equals(tm)){
				continue;
			}
			
			boolean insertFlag = true;
	        if(list.size() > 0){//当前月
	        	WalkData d = list.get(0);
	        	if(d.getKdate().equals(td)){
	        		returnList.add(list.remove(0));//删除，并加入到返回列表中
	        		insertFlag = false;
        		}
	        }
	        
	        //需要插入
	        if(insertFlag && step > 0){
	        	WalkData d = new WalkData();
	        	d.setOpenid(openid);
	        	d.setYear(year);
	        	d.setMonth(month);
	        	d.setKdate(td);
	        	d.setSteps(step);
	        	
	        	insertList.add(d);
	        	
	        	//更新用户数据
				userinfo.setSteps(userinfo.getSteps() + step);
				userinfo.setMonthsteps(userinfo.getMonthsteps() + step);
				
				//更新有效打卡次数
				if(step >= 10000){
					userinfo.setMonthkeepcount(userinfo.getMonthkeepcount() + 1);
					userinfo.setKeepcount(userinfo.getKeepcount() + 1);
				}
	        	returnList.add(d);
	        }
		}
		
		//批量插入
		if(CollectionUtils.isNotEmpty(insertList)){
			dataDao.insertBatch(insertList);
			userinfoDao.update(userinfo);
		}
		return returnList;
	}
	
	@Override
	public void create(WalkData entity){
		dataDao.create(entity);
	}

	@Override
	public void update(WalkData entity){
		dataDao.update(entity);
	}

	@Override
	public void delete(WalkData entity){
		dataDao.delete(entity);
	}
	
	
	public static void main(String[] args){
		long timestamp = 1531670400L;
		Date tdate = new Date(timestamp*1000);
		System.out.println(DateUtil.COMMON.getDateText(tdate));
	}
	
}
