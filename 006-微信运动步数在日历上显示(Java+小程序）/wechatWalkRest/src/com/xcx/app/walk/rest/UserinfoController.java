package com.xcx.app.walk.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xcx.app.walk.domain.Userinfo;
import com.xcx.app.walk.service.IUserinfoService;
import com.xcx.common.util.JsonView;


/**
 * 获取用户相关数据
 */
@Controller
@RequestMapping("/rest/user")
public class UserinfoController {
	
	@Autowired
	private IUserinfoService userinfoServiceImpl;
	
	/**
	 * 更新用户信息
	 */
	@RequestMapping(value="/updateUserinfo" , method=RequestMethod.POST)
	@ResponseBody
	public String updateUserinfo(HttpServletRequest request,Userinfo userinfo){
		if(StringUtils.isEmpty(userinfo.getOpenid())){
			return JsonView.error;
		}
		userinfoServiceImpl.updateUserinfoByOpenid(userinfo);
		return new JsonView().toString();
	}
	
}

