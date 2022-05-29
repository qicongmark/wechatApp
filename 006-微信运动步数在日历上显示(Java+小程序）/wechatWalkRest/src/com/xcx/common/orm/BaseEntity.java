package com.xcx.common.orm;

import java.util.Date;

public class BaseEntity extends LongModel{
	private static final long serialVersionUID = 968132587307913395L;
	
	/**
	 * 创建时间
	 */
	private Date createTime;
	
	/**
	 * 创建人(username)
	 */
	private String createUser;
	
	/**
	 * 更新时间
	 */
	private Date updateTime;
	
	/**
	 * 最后一位更新人(username)
	 */
	private String updateUser;
	
	/**
	 * 逻辑删除
	 */
	private Integer del = 0;
	
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Integer getDel() {
		return del;
	}
	public void setDel(Integer del) {
		this.del = del;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}
	
}

