package com.xcx.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * 测试Controller
 */
@Controller
@RequestMapping("/demo")
public class DemoController {
	
	@RequestMapping(value="/index" , method=RequestMethod.GET)
	public ModelAndView index(){
		ModelAndView  mv = new ModelAndView("demoIndex");
		mv.addObject("myName", "JackMa");
		return mv;
	}

}
