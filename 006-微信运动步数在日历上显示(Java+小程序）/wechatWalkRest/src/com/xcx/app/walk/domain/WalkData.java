package com.xcx.app.walk.domain;

import com.xcx.common.orm.LongModel;

/**
 * 用户步数
 */
public class WalkData extends LongModel{

private static final long serialVersionUID = 1L;
	private String openid;//用户openid
	private Integer year;//年
	private Integer month;//月
	private Integer kdate;//日
	private Integer steps;//步数
	private Double kms;//千米
	private Double caloris;//卡路里
	
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
	public Integer getKdate() {
		return kdate;
	}
	public void setKdate(Integer kdate) {
		this.kdate = kdate;
	}
	public Integer getSteps() {
		return steps;
	}
	public void setSteps(Integer steps) {
		this.steps = steps;
	}
	public Double getKms(){
		return kms;
	}
	public void setKms(Double kms){
		this.kms = kms;
	}

	public Double getCaloris(){
		return caloris;
	}
	public void setCaloris(Double caloris){
		this.caloris = caloris;
	}



}

