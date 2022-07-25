package com.we.sport.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;
import com.we.sport.common.util.CalendarUtil;
import com.we.sport.common.util.JsonData;
import com.we.sport.common.util.JsonError;
import com.we.sport.common.util.JsonView;
import com.we.sport.controller.AppConfig;
import com.we.sport.vo.SportData;
import com.we.sport.vo.SportDay;
import com.we.wechat.process.WeChatClient;
import com.we.wechat.process.dto.StepListOpenid;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 用户步数打开数据数据
 */
@Controller
public class SportController {
	
	/**
	 * 获取加密打卡数据
	 */
	@RequestMapping(value="/encryptWeRunData")
	@ResponseBody
	public String encryptWeRunData(HttpServletRequest request,String encryptedData, String iv, String code){

		if(!StringUtils.hasText(encryptedData)||!StringUtils.hasText(iv)||!StringUtils.hasText(code)){
			return JsonView.renderError(JsonError.EMPTY);
		}
		
		StepListOpenid stepObj = WeChatClient.getStepListOpenid(AppConfig.APP_ID,
				AppConfig.APP_SECRET, encryptedData, iv, code);

		SportData sportData = new SportData();

		if(null != stepObj && StringUtils.hasText(stepObj.getOpenid())){
			String openid = stepObj.getOpenid();
			sportData.setOpenid(openid);
			
			Integer step = stepObj.getTodayStep();
			sportData.setStep(step);
			
			Integer nowMonth = CalendarUtil.getMonth();//当前月

			List<SportDay> stepList = new ArrayList<SportDay>();
			for(Object item : stepObj.getSteplist()){
				JSONObject tmpStepObj = (JSONObject)item;
				Long timestamp = tmpStepObj.getLong("timestamp");
				Date tmpDate = new Date(timestamp*1000);
				Integer tm = CalendarUtil.getMonth(tmpDate);
				Integer td = CalendarUtil.getDate(tmpDate);

				if(nowMonth == tm){
					Integer tmpStep = tmpStepObj.getInteger("step");
					stepList.add(new SportDay(td, tmpStep));
				}

				sportData.setStepList(stepList);
			}
		}

		return JsonView.render(new JsonData(sportData));
	}

}


