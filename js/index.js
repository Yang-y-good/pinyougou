window.addEventListener('load', function(e) {
	// 获得元素
	var focus = document.querySelector('.focus');
	var img = focus.querySelector('img');
	var ul = focus.querySelector('ul');
	var ol = focus.querySelector('ol');
	var focus_left = focus.querySelector('.focus_left');
	var focus_rigth = focus.querySelector('.focus_rigth');
	
	focus.addEventListener('mouseenter',function(){
		clearInterval(times);
		times = null; //清除定时器变量
	});
	focus.addEventListener('mouseleave',function(){
		times = setInterval(function(){
			// 手动调用点击事件
			focus_rigth.click();
		},2000)
	})
	// 遍历ul下的li节点数量,动态的给图片加上小圈圈
	for (let i = 0; i < ul.children.length; i++) {
		// 创建li节点
		var li = document.createElement('li');
		//将li节点插入ol中
		ol.appendChild(li);

		// 给每个小li设置一个自定义下标索引

		ol.children[i].setAttribute('index', i);
		//给第一个li设置类名为current
		ol.children[0].className = 'current';
		// 排他思想 
		li.addEventListener('click', function() {
			//循环清除所有小li的current类名
			for (var i = 0; i < ol.children.length; i++) {
				ol.children[i].className = '';
			}
			//点击哪个li就给哪个li设置current类名
			this.className = 'current';
			// 当我们点击了某个小li就拿到当前小li的索引号
			var index = this.getAttribute('index');
			// 当我们点击了某个li,就把这个li的索引号给num
			num = index;
			// 当我们点击了某个li,就把这个li的索引号给circle;
			circle = index;
			//点击小圆圈移动图片，当然移动的是ul
			//ul的移动距离=小圆圈的索引号乘以图片的宽度 往左移动是负值
			animate(ul, -index * focus.clientWidth);
		});
	}
	//克隆第一张图片放到ul的最后面
	var frist = ul.children[0].cloneNode(true);
	ul.appendChild(frist);

	// 控制图片播放
	var num = 0;
	//控制小圆圈的变化
	var circle = 0;

	//右侧按钮
	focus_rigth.addEventListener('click', function() {
		//如果num等于了小li的数量就把ul的left归0
		if (num == ul.children.length - 1) {
			ul.style.left = 0;
			num = 0;
		}
		num++;
		animate(ul, -num * focus.clientWidth);
		circle++
		if (circle == ol.children.length) {
			circle = 0;
		}
		circleChange()
	});
	var focuswidth = focus.offsetWidth;
	//左侧按钮
	focus_left.addEventListener('click', function() {
		console.log(focus.offsetWidth);
		console.log(focus.clientWidth);
		if (num == 0) {
			num = ul.children.length - 1;
			ul.style.left = - num * focuswidth + 'px';

		}
		num--;
		animate(ul, -num * focuswidth);
		circle--
		if (circle < 0) {
			circle = ol.children.length-1;
		}
		circleChange()
	});
	function circleChange(){
		//先清除其他小圈圈的current类名
		for (let i = 0; i < ol.children.length; i++) {
			ol.children[i].className = '';
		};
		// 留下当前小圆圈的类名
		ol.children[circle].className = 'current';
	}
	//自动播放轮播图
	var times = setInterval(function(){
		// 手动调用点击事件
		focus_rigth.click();
	},2000)
});
