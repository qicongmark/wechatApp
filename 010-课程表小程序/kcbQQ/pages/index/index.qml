<!--index.wxml-->
<view class="container">
    <!-- 星期 start -->
    <view class="schedule-top-fixed">
        <view class="week-block">
            <view class="time-item" style="border: none;height:55px;">
                <image src="../../images/date-time.png"></image>
            </view>

            <view class="week-day">
                <view wx:for="{{weekList}}" class="{{item.curDay?'cur-day-item':'day-item'}}" wx:key="{{code}}">
                    <view>{{item.text}}</view>
                    <view>{{item.time}}</view>
                </view>
            </view>
        </view>
    </view>
    <!-- 星期 end-->

    <!-- 课表 start-->
    <view class="schedule-table" style='margin-top:100rpx;'>
        <!--时间-->
        <view class="section-time-block">
            <view class="{{item.siesta == 1?'time-item-siesta':'time-item'}}" wx:for="{{times}}" wx:key="{{item}}">
                <block wx:if="{{item.siesta==1}}">
                    <view class='time-no'>休息</view>
                </block>
                <block wx:else>
                    <view>{{item.startTime}}</view>
                    <view>~</view>
                    <view>{{item.endTime}}</view>
                </block>
            </view>
        </view>
        <!--时间-->

        <!--课表-->
        <view class="course-shedule-block">
            <view wx:for="{{courseList}}" wx:key="key" class="course-day-block">
                <block wx:for="{{item}}" wx:for-item="citem" wx:key="ckey" >
                    <block wx:if="{{citem.siesta == 1}}">
                        <view class="course-item" style='height:40px;' >
                        <!--午休-->
                        </view>
                    </block>
                    <block wx:else>
                        <view class="course-item" style="background-color:{{citem.bgcolor}}; height:{{citem.count*80+(citem.count-1)}}px;" >
                            <view class="course-name" >{{citem.name}}</view>
                            <view class="course-room" wx:if="{{citem.room}}">{{citem.room}}</view>
                        </view>
                    </block>
                </block>
            </view>
        </view>
        <!--课表-->
        
    </view>
    <!-- 课表 end-->

</view>

