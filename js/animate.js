function animate(obj,target){
		//清除以前的定时器，只保留当前的一个定时器执行
		clearTimeout(obj.clear);
		obj.clear = setInterval(function(){			
			var step = (target-obj.offsetLeft)/10;
			// Math.ceil() 取整数,往大的取 Math.floor() 取整数，往小的取
			step = step>0?Math.ceil(step):Math.floor(step);
			console.log(obj.offsetLeft);
			if(obj.offsetLeft==target){
				//盒子到左边的距离大于100就清楚定时器，停止走动
				clearTimeout(obj.clear);
			}
			// 将我们移动的目标值赋值给元素盒子
			obj.style.left = obj.offsetLeft+step+'px';
		},15);
};
