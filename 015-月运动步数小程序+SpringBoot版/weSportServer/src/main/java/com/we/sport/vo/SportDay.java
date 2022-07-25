package com.we.sport.vo;

/**
 * 用户每天步数
 */
public class SportDay {

	private String openid;//用户openid
	private Integer year;//年
	private Integer month;//月
	private Integer date;//日
	private Integer step;//步数

	public SportDay(){}

	public SportDay(Integer date, Integer step){
		this.date = date;
		this.step = step;
	}

	public String getOpenid(){
		return openid;
	}

	public void setOpenid(String openid){
		this.openid = openid;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Integer getDate() {
		return date;
	}

	public void setDate(Integer date) {
		this.date = date;
	}

	public Integer getStep() {
		return step;
	}

	public void setStep(Integer step) {
		this.step = step;
	}
}

