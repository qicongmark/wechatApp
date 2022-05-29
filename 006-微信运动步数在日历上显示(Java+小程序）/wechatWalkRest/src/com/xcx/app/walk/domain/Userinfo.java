package com.xcx.app.walk.domain;

import com.xcx.common.orm.LongModel;


public class Userinfo extends LongModel{

private static final long serialVersionUID = 1L;
	private String openid;//
	private String nickname;//
	private String avatarurl;//
	private String avatarlocal;//
	private Integer weight;//
	private Integer height;//
	private Integer todaysteps;//今日步数
	private Integer steps;//总步数
	private Integer keepcount;//
	private Integer premonthkeepcount;//
	private Integer monthkeepcount;//
	private Double kms;//
	private Double caloris;//
	private Integer myreward;//
	private Integer mypoint;//
	private String lastday;//
	private Integer premonthsteps;//
	private Integer monthsteps;//
	private Integer resigncount;//
	private Integer gender;//
	private Integer usertype;//
	private String wxid;//
	private String country;//
	private String province;//
	private String city;//
	private String address;//


	public String getOpenid(){
		return openid;
	}
	public void setOpenid(String openid){
		this.openid = openid;
	}

	public String getNickname(){
		return nickname;
	}
	public void setNickname(String nickname){
		this.nickname = nickname;
	}

	public String getAvatarurl(){
		return avatarurl;
	}
	public void setAvatarurl(String avatarurl){
		this.avatarurl = avatarurl;
	}

	public String getAvatarlocal(){
		return avatarlocal;
	}
	public void setAvatarlocal(String avatarlocal){
		this.avatarlocal = avatarlocal;
	}

	public Integer getWeight(){
		return weight;
	}
	public void setWeight(Integer weight){
		this.weight = weight;
	}

	public Integer getHeight(){
		return height;
	}
	public void setHeight(Integer height){
		this.height = height;
	}

	public Integer getSteps(){
		return steps;
	}
	public void setSteps(Integer steps){
		this.steps = steps;
	}

	public Integer getKeepcount(){
		return keepcount;
	}
	public void setKeepcount(Integer keepcount){
		this.keepcount = keepcount;
	}

	public Integer getPremonthkeepcount(){
		return premonthkeepcount;
	}
	public void setPremonthkeepcount(Integer premonthkeepcount){
		this.premonthkeepcount = premonthkeepcount;
	}

	public Integer getMonthkeepcount(){
		return monthkeepcount;
	}
	public void setMonthkeepcount(Integer monthkeepcount){
		this.monthkeepcount = monthkeepcount;
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

	public Integer getMyreward(){
		return myreward;
	}
	public void setMyreward(Integer myreward){
		this.myreward = myreward;
	}

	public Integer getMypoint(){
		return mypoint;
	}
	public void setMypoint(Integer mypoint){
		this.mypoint = mypoint;
	}

	public String getLastday(){
		return lastday;
	}
	public void setLastday(String lastday){
		this.lastday = lastday;
	}

	public Integer getPremonthsteps(){
		return premonthsteps;
	}
	public void setPremonthsteps(Integer premonthsteps){
		this.premonthsteps = premonthsteps;
	}

	public Integer getMonthsteps(){
		return monthsteps;
	}
	public void setMonthsteps(Integer monthsteps){
		this.monthsteps = monthsteps;
	}

	public Integer getResigncount(){
		return resigncount;
	}
	public void setResigncount(Integer resigncount){
		this.resigncount = resigncount;
	}

	public Integer getGender(){
		return gender;
	}
	public void setGender(Integer gender){
		this.gender = gender;
	}

	public Integer getUsertype(){
		return usertype;
	}
	public void setUsertype(Integer usertype){
		this.usertype = usertype;
	}

	public String getWxid(){
		return wxid;
	}
	public void setWxid(String wxid){
		this.wxid = wxid;
	}

	public String getCountry(){
		return country;
	}
	public void setCountry(String country){
		this.country = country;
	}

	public String getProvince(){
		return province;
	}
	public void setProvince(String province){
		this.province = province;
	}

	public String getCity(){
		return city;
	}
	public void setCity(String city){
		this.city = city;
	}

	public String getAddress(){
		return address;
	}
	public void setAddress(String address){
		this.address = address;
	}
	public Integer getTodaysteps() {
		return todaysteps;
	}
	public void setTodaysteps(Integer todaysteps) {
		this.todaysteps = todaysteps;
	}

	

}

