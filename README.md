# mySwiper

**移动端观看**

<img width="200" height="200" src="data:image/png;base64,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">


**模仿[Swiper](http://www.swiper.com.cn/)制作的一个轮播及滑动插件，可在PC及移动端使用，目前实现功能：**

* 图片轮播；
* 鼠标悬停或拖动翻页时轮播暂停；
* PC端鼠标拖动翻页，手机端滑动翻页；
* 点击上下页按钮翻页；
* 点击分页按钮翻到指定页；
* 翻页到底有回弹动画；
* 拖动距离不够1/4则回弹；
* 一些自定义设置；
* 其它；

**待添加：**
* 移动到最后一页无缝返回第一页；
* 另外一种轮播效果，如方格淡入，透明度淡入；
* 另外一种轮播方式；

**优点：**
* 轻量；
* 无依赖，纯原生；

**缺点：**
* 可能有bug，欢迎随时指正；
* 因为时间比较赶，代码也比较挫；
* 不兼容低版本IE，如addEventListener，getElementsByClassName等等；

**使用方法：**
* 引入js文件后 `new Swiper` 调用：
```
new Swiper({
	// 绑定的DOM对象，必选
	element: document.getElementsByClassName('swiper-container')[0],
	// 设置翻页动画过度时间，可选
	time: .4,
	// 设置翻页动画，可选
	transitionTiming: "linear",
	// 设置轮播间隔，可选
	intervalTime: 3000,
	// 设置分页，可选
	pagination: true,
	// 设置上下页按钮，可选
	button: true
});
```
**注意：**
* 按照下面模板设置，即DOM结构及类名：
```
<div class="swiper-container">
	<div class="swiper-wrapper">
		<div class="swiper-slide"><img src="imgs/1.jpg" alt=""></div>
		<div class="swiper-slide"><img src="imgs/2.jpg" alt=""></div>
		<div class="swiper-slide"><img src="imgs/3.jpg" alt=""></div>
		<div class="swiper-slide"><img src="imgs/4.jpg" alt=""></div>
		<div class="swiper-slide"><img src="imgs/5.jpg" alt=""></div>
		<div class="swiper-slide"><img src="imgs/6.jpg" alt=""></div>
	</div>
	<!-- 分页器（不需要手动添加） -->
	<div class="swiper-pagination">
		<div class="bullet"></div>
		<div class="bullet"></div>
	</div>			
	<!-- 如果需要导航按钮 -->
	<div class="swiper-button-prev"></div>
	<div class="swiper-button-next"></div>			
</div>
```
* 在移动端取消了上下页按钮，因为没什么用；
* 移动端与PC端分页有所不同，具体看Js；
* 其它请看Js；
