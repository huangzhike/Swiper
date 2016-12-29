 (function() {

 	// 辨别手机还是PC
 	var isMobile = "ontouchstart" in window ? true : false;

 	var Swiper = function(configObject) {

 			// 配置对象
 			this.config = configObject;
 			// 绑定的DOM对象
 			this.container = this.config.element;
 			this.wrapper = this.container.getElementsByClassName("swiper-wrapper")[0];
 			this.wrapper.style.webkitTransitionTimingFunction = this.config.transitionTiming || "linear";
 			this.wrapper.style.transitionTimingFunction = this.config.transitionTiming || "linear";
 			this.pages = this.container.getElementsByClassName("swiper-slide");
 			// 轮播页面数量
 			this.pagesLen = this.pages.length;
 			// 动画过度时间
 			this.time = this.config.time || .3;
 			// 当前页码
 			this.currIndex = 0;
 			// flag
 			this.notAnimating = true;
 			// PC手机相应事件名
 			this.start = isMobile ? "touchstart" : "mousedown";
 			this.move = isMobile ? "touchmove" : "mousemove";
 			this.end = isMobile ? "touchend" : "mouseup";
 			// 初始化
 			this.init();
 			// 开始轮播
 			this.interval();

 		};

 	// 初始化
 	Swiper.prototype.init = function() {

 		// 保存this在回调中使用，后面经常经常经常用到
 		var that = this;

 		if (!isMobile) {
 			this.container.style.marginLeft = -this.container.clientWidth / 2 + "px";
 			this.container.style.marginTop = this.container.clientHeight / 2 + "px";

 		} else {
 			// 移动端图片充满屏幕宽度
 			this.container.style.top = "0";
 			this.container.style.left = "0";
 			this.container.style.width = "100%";
 			var wW = document.body.clientWidth;

 			for (var i = 0; i < this.pages.length; i++) {
 				this.pages[i].style.width = wW + "px";
 			}
 		}

 		// 每页宽度
 		this.width = this.pages[0].clientWidth;
 		// 回弹距离
 		this.band = Math.ceil(this.width / 4);
 		// 如果有分页
 		if (this.config.pagination) {
 			// 根据页面数量动态添加分页
 			var pagination = document.createElement("div");

 			pagination.className = "swiper-pagination";
 			for (var i = 0; i < this.pagesLen; i++) {
 				var bullet = document.createElement("div");
 				bullet.className = "bullet";
 				pagination.appendChild(bullet);
 			}
 			this.container.appendChild(pagination);
 			var bullet = this.container.getElementsByClassName("bullet");

 			bullet[0].classList.add("bullet-on");
 			this.bullet = this.container.getElementsByClassName("bullet");

 			// 分页添加点击事件处理函数
 			for (var i = 0; i < this.pagesLen; i++) {
 				this.bullet[i].index = i;
 				this.bullet[i].onclick = function() {
 					that.currIndex = this.index;
 					that.swipe(-that.width * that.currIndex);
 				}
 			}

 			pagination.style.marginLeft = -pagination.clientWidth / 2 + "px";
 		}

 		// 如果有上下页按钮
 		if (this.config.button) {
 			var prev = this.container.getElementsByClassName("swiper-button-prev")[0];
 			var next = this.container.getElementsByClassName("swiper-button-next")[0];

 			if (!isMobile) {
 				// 添加相应点击事件处理
 				prev.addEventListener("click", function() {
 					if (that.currIndex == 0) return;
 					that.swipe(-that.width * --that.currIndex);
 				}, false);
 				next.addEventListener("click", function() {
 					if (that.currIndex == that.pagesLen - 1) return;
 					that.swipe(-that.width * ++that.currIndex);
 				}, false);

 			} else {
 				// 移动端不需要
 				prev.style.display = "none";
 				next.style.display = "none";
 			}
 		}

 		// 一大堆监听，这里不能用bind改变this，that.dragStart().bind(that,e)，e无效？
 		this.wrapper.addEventListener(this.start, function(e) {
 			that.dragStart(e);
 		}, false);

 		this.wrapper.addEventListener(this.move, function(e) {
 			that.dragMove(e);
 		}, false);

 		this.wrapper.addEventListener(this.end, function(e) {
 			that.dragEnd(e);
 		}, false);

 		this.container.addEventListener("mouseover", function() {
 			clearInterval(that.timer);
 			// 修复移动端点击后不再轮播bug
 			isMobile ? that.interval() : "";
 		}, false);

 		this.container.addEventListener("mouseleave", function() {
 			if (that.timer) clearInterval(that.timer);
 			that.interval();
 		}, false);

 		// 拖动的一个问题是如果在监听对象外放开鼠标则无法监听
 		document.addEventListener("mouseup", function() {
 			that.swipe(-that.width * that.currIndex);
 			// 解决办法就是这个
 			that.notAnimating = true;
 		}, false);

 	};

 	// 轮播interval
 	Swiper.prototype.interval = function() {
 		var that = this;
 		this.timer = setInterval(function() {
 			if (that.currIndex == that.pagesLen - 1) that.currIndex = -1;
 			that.swipe(-that.width * ++that.currIndex);
 		}, this.config.intervalTime || 2500);
 	};
 	// 点击或触摸开始
 	Swiper.prototype.dragStart = function(e) {
 		this.touch = false;
 		this.notAnimating = false;
 		// 先清除定时器
 		if (this.timer) clearInterval(this.timer);
 		e = e || window.event;
 		// 得到触摸或拖动的开始坐标
 		this.startX = e.clientX ? e.clientX : e.touches[0].clientX;
 		return false;
 	};
 	// 拖动
 	Swiper.prototype.dragMove = function(e) {
 		// 移动端区别点击与拖动
 		this.touched = true;
 		if (this.notAnimating) return;
 		e = e || event;
 		this.endX = e.clientX ? e.clientX : e.touches[0].clientX;

 		if (this.currIndex == this.pagesLen - 1 || this.currIndex == 0) {
 			// 如果是第一页或最后一页则给个回弹，因为是即时随手的，过度时间为0
 			this.swipe(-this.width * this.currIndex + (this.endX - this.startX) / 7, "0");
 		} else {
 			// 同上，给个回弹动画
 			this.swipe(-this.width * this.currIndex + this.endX - this.startX, "0");
 		}

 		e.stopPropagation();
 		e.preventDefault();
 		this.notAnimating = false;
 	};
 	// 鼠标放开或触摸结束
 	Swiper.prototype.dragEnd = function(e) {
 		if (this.touched) {

 			if (this.notAnimating) return;

			// 判断左右
			this.right = this.startX - this.endX;
			// 翻下页
			this.right > 0 && this.currIndex < this.pagesLen - 1&& this.right > this.band && this.currIndex++;
			// 如果小于1/4宽度则回弹，不翻页
			this.right > 0 && this.currIndex < this.pagesLen - 1&& this.right < this.band;
			// 翻上页
			this.right < 0 && this.currIndex > 0 && -this.right > this.band && this.currIndex--;
			// 如果小于1/4宽度则回弹，不翻页
			this.right < 0 && this.currIndex > 0 && -this.right < this.band;

			this.swipe(-this.width * this.currIndex);			
 		}

 		if (this.timer) clearInterval(this.timer);
 		this.interval();
 		this.notAnimating = true;

 	};
 	// 分页
 	Swiper.prototype.paging = function() {
 		// 如果没有设置分页直接返回
 		if (!this.config.pagination) return;
 		for (var i = 0; i < this.pagesLen; i++) {
 			this.bullet[i].classList.remove("bullet-on");
 		}
 		this.bullet[this.currIndex].classList.add("bullet-on");
 	};
 	// 页面swipe
 	Swiper.prototype.swipe = function(w, t) {
 		// 更新分页图标
 		this.paging();
 		// this.wrapper.style.left = -this.width * this.currIndex+"px";
 		this.wrapper.style.msTransform = "translate(" + w + "px, 0)";
 		this.wrapper.style.webkitTransform = "translate(" + w + "px, 0)";
 		this.wrapper.style.transform = "translate(" + w + "px, 0)";

 		this.wrapper.style.webkitTransitionDuration = (t || this.time) + "s";
 		this.wrapper.style.transitionDuration = (t || this.time) + "s";
 	};
 	// 对外暴露Swiper
 	window.Swiper = Swiper;
 })();
 