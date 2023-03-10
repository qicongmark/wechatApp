
<view class="container">
  <scroll-view class="poem-nav" scroll-y>
    <view wx:for="{{poemAuthors}}" bindtap="getPoemAuthor" data-code="{{item.authorCode}}" class="nav-item {{(activeCode == item.authorCode)?'active':''}}">{{item.author}}</view>
  </scroll-view>

  <scroll-view class="poem-content" scroll-y>
    <view class="poem-item" wx:for="{{poems}}"> 
      <navigator url="/pages/poem/poem?type=songci&id={{item.id}}">
      <view class="poem-title">{{item.title}}</view>
      <view class="poem-verse" wx:for="{{item.verses}}">{{item}}</view>
      <image class="poem-img" wx:if="{{item.img}}" mode="aspectFill" src="{{item.img}}"></image>
      </navigator>
    </view>
  </scroll-view>

</view>

