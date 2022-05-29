package com.xcx.app.walk.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xcx.app.AppConfig;
import com.xcx.app.walk.domain.Userinfo;
import com.xcx.app.walk.domain.WalkData;
import com.xcx.app.walk.service.IWalkDataService;
import com.xcx.app.walk.service.IUserinfoService;
import com.xcx.common.util.CalendarUtil;
import com.xcx.common.util.JsonView;
import com.xcx.wechat.process.WeChatClient;
import com.xcx.wechat.process.vo.StepListOpenid;

/**
 *更多免费视频教程、源码获取、如何赚钱：
 *关注公众号：程序员祁老司 
 *或者关注 “程序员祁老司” 的B站：
 *https://space.bilibili.com/305587632
 */

/**
 * 用户步数打开数据数据
 */
@Controller
@RequestMapping("/rest/walk")
public class WalkController {
	
	@Autowired
	private IWalkDataService dataService;
	
	@Autowired
	private IUserinfoService userinfoServiceImpl;
	
	/**
	 * 获取加密打卡数据
	 */
	@RequestMapping(value="/encryptWeRunData" , method=RequestMethod.POST)
	@ResponseBody
	public String encryptWeRunData(HttpServletRequest request,String encryptedData, String iv, String code, Integer mystep){
		System.out.println(request.getHeader("serverid"));
		if(StringUtils.isEmpty(encryptedData)||StringUtils.isEmpty(iv)||StringUtils.isEmpty(code)){
			return JsonView.error;
		}
		
		StepListOpenid stepObj = WeChatClient.getStepListOpenid(AppConfig.WECHAT_WALK.getAppId(),
				AppConfig.WECHAT_WALK.getAppSecret(), encryptedData, iv, code);
		
		JsonView jv = new JsonView();
		if(null != stepObj && StringUtils.isNotEmpty(stepObj.getOpenid())){
			String openid = stepObj.getOpenid();
			JSONObject jsObj = new JSONObject();
			jsObj.put("openid", openid);
			
			Integer step = stepObj.getTodayStep();
			jsObj.put("step",step);
			
			Integer nowMonth = CalendarUtil.getMonth();//当前月
			List<WalkData> stepList = new ArrayList<WalkData>();
			for(Object item : stepObj.getSteplist()){
				com.alibaba.fastjson.JSONObject tmpStepObj = (com.alibaba.fastjson.JSONObject)item;
				Long timestamp = tmpStepObj.getLong("timestamp");
				Date tdate = new Date(timestamp*1000);
				Integer tm = CalendarUtil.getMonth(tdate);
				Integer td = CalendarUtil.getDate(tdate);
				if(nowMonth == tm){
					Integer tmpStep = tmpStepObj.getInteger("step");
					WalkData data = new WalkData();
					data.setKdate(td);
					data.setSteps(tmpStep);
							        	
					stepList.add(data);
				}
				jsObj.put("stepList", stepList);
			}
			
			try{
				//获取当前用户
				Userinfo userinfo = userinfoServiceImpl.getOrCreate(openid);
				jsObj.put("userinfo", userinfo);
				
				//和上次打卡数据不一致，上传
				if(!step.equals(mystep)){
					dataService.uploadDakaDaka(userinfo, step);
				}
			}catch(Exception e){
				
			}
			jv.setData(jsObj);
		}
		return jv.toString();
	}
	
	/**
	 * 获取打卡数据
	 */
	@RequestMapping(value="/getCalendarData" ,method=RequestMethod.POST)
	@ResponseBody
	public String getCalendarData(HttpServletRequest request, String openid, Integer year, Integer month){
		if(StringUtils.isEmpty(openid)||null == year||null == month){
			return JsonView.error;
		}
		List<WalkData> list = dataService.getCalendarData(openid, year, month);
		JsonView jv = new JsonView();
		jv.setData(list);
		return jv.toString();
	}
		
}

