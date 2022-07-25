package com.we.sport.vo;

import com.we.sport.common.util.SessionKey;

import java.util.List;

/**
 * 运动数据
 */
public class SportData extends SessionKey {

    Integer step;

    List<SportDay> stepList ;

    public Integer getStep() {
        return step;
    }

    public void setStep(Integer step) {
        this.step = step;
    }

    public List<SportDay> getStepList() {
        return stepList;
    }

    public void setStepList(List<SportDay> stepList) {
        this.stepList = stepList;
    }
}
