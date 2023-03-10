<!--pages/tang/tang.wxml-->

<swiper class="banner" indicator-dots="true" autoplay="true" circular="true" indicator-color="#2b2b2b" indicator-active-color="#42c642">
  <swiper-item wx:for="{{banners}}">
    <navigator url="/pages/poem/poem?type={{item.type}}&id={{item.id}}">
    <image src="{{item.image}}" mode="aspectFill"></image>
    </navigator>
  </swiper-item>
</swiper>

<view class="nav-block">
  <view class="nav-item {{(activeCode == item.authorCode)? 'nav-active':''}}" data-code="{{item.authorCode}}" bindtap="getAuthorPoems" wx:for="{{poemAuthors}}">{{item.author}}</view>
</view>

<view class="poem-item" wx:for="{{tangShiArray}}">
  <navigator url="/pages/poem/poem?type=tangshi&id={{item.id}}">
  <view class="poem-title">{{item.title}}</view>
  <view>{{item.author}}</view>
  <view class="poem-verse" wx:for="{{item.verses}}">{{item}}</view>
  </navigator>
</view>

