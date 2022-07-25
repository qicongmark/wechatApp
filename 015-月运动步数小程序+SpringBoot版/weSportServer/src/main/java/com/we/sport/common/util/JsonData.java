package com.we.sport.common.util;

public class JsonData {

    //错误代码 0-成功
    private Integer errCode = 0;

    // 消息
    private String message;

    // 数据
    private SessionKey data;

    // 扩展数据
    private Object extData;


    public JsonData(SessionKey data){
        this.data = data;
    }

    public JsonData(Integer errCode, String message){
        this.errCode = errCode;
        this.message = message;
    }

    public Integer getErrCode() {
        return errCode;
    }

    public void setErrCode(Integer errCode) {
        this.errCode = errCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public SessionKey getData() {
        return data;
    }

    public void setData(SessionKey data) {
        this.data = data;
    }

    public Object getExtData() {
        return extData;
    }

    public void setExtData(Object extData) {
        this.extData = extData;
    }
}
