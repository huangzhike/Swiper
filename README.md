# mySwiper

**模仿jQuerySwiper插件，可在PC及移动端使用，目前实现功能：**
* 图片轮播；
* 鼠标悬停或拖动翻页时轮播暂停；
* PC端鼠标拖动翻页页，手机端滑动翻页；
* 点击上下页按钮翻页；
* 分页按钮点击翻到指定页；
* 翻页到底有回弹动画；
* 翻页距离不够则回弹；
* 一些自定义设置；
* 其它；

**优点：**
* 轻量；
* 无依赖，纯原生；

**缺点：**
* 可能有bug，我写了好几天，如果发现bug欢迎随时指正；
* 低版本IE可能不兼容，比如addEventListener，其实本来想兼容的，无奈改动比较大，懒癌+拖延症真心伤不起；

**使用方法：**
* 引入js文件后 `new Swiper` 调用：
```
new Swiper({
	// 绑定的DOM对象，必选
	element: document.getElementsByClassName('swiper-container')[0],
	// 设置翻页动画过度时间，可选
	time: .4,
	// 设置翻页动画曲线，可选
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
* 在移动端关闭了上下页按钮，因为没什么用；
* 移动端与PC端分页有所不同，具体看Js；
* 其它请看Js；


