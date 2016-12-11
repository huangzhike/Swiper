 (function() {
 	// 辨别手机还是PC
	// var isMobile = (function() {
	// 	try {
	// 		document.createEvent("TouchEvent");
	// 		return true;
	// 	} catch (e) {
	// 		return false;
	// 	}
	// })();
	var isMobile = 'ontouchstart' in window ? true : false;

	var Swiper = function(configObject) {
		// 保存this在回调中使用，后面经常经常经常用到，话说总是一不小心写错this。。。
		var that = this;
		// 配置对象
		this.config = configObject;
		// 绑定的DOM对象
		var container = this.config.element;
		this.wrapper = container.getElementsByClassName('swiper-wrapper')[0];
		this.pages = container.getElementsByClassName('swiper-slide');
		console.log("hh"+this.pages[0].clientWidth);

		if (!isMobile) {
			container.style.marginLeft = -container.clientWidth / 2 + "px";
			container.style.marginTop = container.clientHeight / 2 + "px";

		} else {
			container.style.top = "0";
			container.style.left = "0";
			container.style.width = "100%";
			var wW = document.body.clientWidth;
			for (var i = 0; i < this.pages.length; i++) {
				this.pages[i].style.width = wW + "px";
			}
		}

		// 每页宽度
		this.width = this.pages[0].clientWidth;
		// 轮播页面数量
		this.pagesLen = this.pages.length;
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
			container.appendChild(pagination);
			var bullet = container.getElementsByClassName('bullet');
			bullet[0].classList.add('bullet-on');
			this.bullet = container.getElementsByClassName('bullet');
			// 移动端不需要
			if (!isMobile) {
				// 分页添加点击事件处理函数
				for (var i = 0; i < this.pagesLen; i++) {
					this.bullet[i].index = i;
					this.bullet[i].onclick = function() {
						that.currIndex = this.index;
						that.swipe(-that.width * that.currIndex, that.time);
					}
				}
			}
			pagination.style.marginLeft = -pagination.clientWidth / 2 + "px";
		}
		// 如果有上下页按钮
		if (this.config.button) {
			// 移动端不需要
			if (!isMobile) {
				var prev = container.getElementsByClassName('swiper-button-prev')[0];
				var next = container.getElementsByClassName('swiper-button-next')[0];
				// 添加相应点击事件处理
				prev.addEventListener("click", function() {
					if (that.currIndex == 0) return;
					that.swipe(-that.width * --that.currIndex, that.time);
				}, false);
				next.addEventListener("click", function() {
					if (that.currIndex == that.pagesLen - 1) return;
					that.swipe(-that.width * ++that.currIndex, that.time);
				}, false);
			}
		}

		// 动画过度时间
		this.time = this.config.time || .3;
		// 当前页码
		this.currIndex = 0;
		// flag
		this.notAnimating = true;
		// 回弹距离
		this.band = Math.ceil(this.width / 4);
		// PC手机相应事件名
		this.start = isMobile ? 'touchstart' : 'mousedown';
		this.move = isMobile ? 'touchmove' : 'mousemove';
		this.end = isMobile ? 'touchend' : 'mouseup';
		// 一大堆监听
		this.wrapper.addEventListener(this.start, function(e) {
			that.dragStart(e);
		}, false);
		this.wrapper.addEventListener(this.move, function(e) {
			that.dragMove(e);
		}, false);
		this.wrapper.addEventListener(this.end, function(e) {
			that.dragEnd(e);
		}, false);
		container.addEventListener("mouseover", function() {
			clearInterval(that.timer);
		}, false);
		container.addEventListener("mouseleave", function() {
			if (that.timer) clearInterval(that.timer);
			that.interval();
		}, false);
		// 拖动的一个问题是如果在监听对象外放开鼠标则无法监听
		document.addEventListener("mouseup", function() {
			that.swipe(-that.width * that.currIndex, that.time);
			// 解决办法就是这个
			that.notAnimating = true;
		}, false);
		// 开始轮播
		this.interval();

		};

	// 轮播interval
	Swiper.prototype.interval = function() {
		var that = this;
		this.timer = setInterval(function() {
			if (that.currIndex == that.pagesLen - 1) that.currIndex = -1;
			that.swipe(-that.width * ++that.currIndex, that.time);
		}, this.config.intervalTime || 2500);
	};
	// 点击或触摸开始
	Swiper.prototype.dragStart = function(e) {
		this.touch = false;
		this.notAnimating = false;
		// 先清除定时器
		if (this.timer) clearInterval(this.timer);
		var that = this;
		e = e || window.event;
		// 得到触摸或拖动的开始坐标
		this.startX = e.clientX ? e.clientX : e.touches[0].clientX;
		return false;
	};
	// 拖动
	Swiper.prototype.dragMove = function(e) {
		// 移动端区别点击与拖动
		this.touch = true;
		if (this.notAnimating) return;
		e = e || event;
		this.endX = e.clientX ? e.clientX : e.touches[0].clientX;
		if (this.currIndex == this.pagesLen - 1 || this.currIndex == 0) {
			// 如果是第一页或最后一页则给个回弹，因为是即时随手的，过度时间为0
			this.swipe(-this.width * this.currIndex + (this.endX - this.startX) / 7, 0);
		} else {
			// 同上，给个回弹动画
			this.swipe(-this.width * this.currIndex + this.endX - this.startX, 0);
		}
		e.stopPropagation(); // touchmove冲突
		e.preventDefault();
		this.notAnimating = false;
	};
	// 鼠标放开或触摸结束
	Swiper.prototype.dragEnd = function(e) {
		if (this.touch) {
			var that = this;
			if (this.notAnimating) return;
			console.log("end");
			// PC端的mouseup事件
			if (this.end == 'mouseup') {
				this.right = this.startX - e.clientX;
				if (this.right > 0 && this.currIndex < this.pagesLen - 1) {
					console.log(this.currIndex + "1");
					// 翻页
					this.right > this.band && this.swipe(-this.width * ++this.currIndex, this.time);
					console.log(this.currIndex + "1");
					// 如果小于1/4宽度则回弹，不翻页
					this.right < this.band && this.swipe(-this.width * this.currIndex, this.time);
				}
				console.log(this.right);
				console.log(this.currIndex > 0);
				if (this.right < 0 && this.currIndex > 0) {
					console.log("here");
					 if (-this.right > this.band) {
					 	// 翻页
						this.swipe(-this.width * --this.currIndex, this.time);
					} else {
						// 如果小于1/3宽度则回弹，不翻页
						this.swipe(-this.width * this.currIndex, this.time);
					}
				}
			} else {
				// 手机端的touchend事件，其实可以合并PC，但我想实现不一样的效果
				this.endX < this.startX && this.currIndex < this.pagesLen - 1 && this.currIndex++;
				this.endX > this.startX && this.currIndex > 0 && this.currIndex--;
				this.swipe(-this.width * this.currIndex, this.time);
			}
		}
		if (this.timer) clearInterval(this.timer); 
		console.log("t");
		this.notAnimating = true;
		this.interval();
		
	};
	// 分页
	Swiper.prototype.paging = function() {
		// 如果没有设置分页直接返回
		if (!this.config.pagination) return;
		for (var i = 0; i < this.pagesLen; i++) {
			this.bullet[i].classList.remove('bullet-on');
		}
		console.log(this.currIndex);
		this.bullet[this.currIndex].classList.add('bullet-on');
	};
	// 页面swipe
	Swiper.prototype.swipe = function(w, t) {
		// 更新分页图标
		this.paging();
		console.log("swipe");
		console.log("this" + this.timer);
		console.log(this.currIndex);
		// this.wrapper.style.left = -this.width * this.currIndex+"px";
		this.wrapper.style.msTransform = 'translate(' + w + 'px, 0)';
		this.wrapper.style.webkitTransform = 'translate(' + w + 'px, 0)';
		this.wrapper.style.transform = 'translate(' + w + 'px, 0)';

		this.wrapper.style.webkitTransitionDuration = t + 's';
		this.wrapper.style.transitionDuration = t + 's';

		this.wrapper.style.webkitTransitionTimingFunction = this.config.transitionTiming || "linear"
		this.wrapper.style.transitionTimingFunction = this.config.transitionTiming || "linear"
	};
	// 对外暴露Swiper
	window.Swiper = Swiper;
})();
