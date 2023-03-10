<view class="container">
  <view wx:for="{{yuanArray}}" class="poem-card">
    <navigator url="/pages/poem/poem?type=yuanqu&id={{item.id}}">
    <view class="poem-author">
      <image class="poem-image" src="{{item.avatar}}" />
      <view>
        <view class="author">{{item.author}}</view>
        <view class="title">{{item.title}}</view>
        <view wx:for="{{item.verses}}">{{item}}</view>
      </view>
    </view>
    </navigator>
  </view>
  
</view>
