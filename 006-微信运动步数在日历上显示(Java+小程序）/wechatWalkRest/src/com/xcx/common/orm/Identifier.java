package com.xcx.common.orm;

import java.io.Serializable;

/**
 * @param <KEY>
 */
public interface Identifier<KEY extends Serializable> {

	public KEY getId(); 
	
}
