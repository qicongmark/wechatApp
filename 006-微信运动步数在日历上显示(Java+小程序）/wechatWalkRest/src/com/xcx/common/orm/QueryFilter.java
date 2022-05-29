package com.xcx.common.orm;


/**
 * 简单查询，目前只支持简单的  = 和  <> 查询
 * 只支持3个简单查询
 * @author bc_qi
 */
public class QueryFilter {
	
	Integer timeCount = 0;//计数器
	private StringBuilder where = new StringBuilder("");//最多3个条件
	private StringBuilder sort = new StringBuilder("");
	
	public String getWhere() {
		return where.toString();
	}
	
	public String getSort(){
		return sort.toString();
	}
	
}

