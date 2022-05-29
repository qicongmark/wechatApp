package com.xcx.app.walk.dao;

import java.util.List;

import com.xcx.app.walk.domain.WalkData;


public interface WalkDataDao {
	
	public void create(WalkData entity);
	
	public void update(WalkData entity);
	
	public void delete(WalkData entity);
	
	public WalkData getTodayData(WalkData queryEntity);
	
	public List<WalkData> getCalendarData(WalkData queryEntity);
	
	public void insertBatch(List<WalkData> list);

}

