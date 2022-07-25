package com.we.sport.common.util;

public enum JsonError {

    EMPTY(1001,"内容为空");


    JsonError(Integer code, String message){
        this.message =  message;
        this.code = code;
    }

    String message;
    Integer code;

}
