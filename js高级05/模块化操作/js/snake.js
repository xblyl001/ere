define(function () {
	// 小蛇功能制作：
	//   基本属性：
	//			相同的属性：宽 高 地图
	//			不相同的属性：x y 颜色
	function Snake (options) {
					this.width = options.width || 20;
					this.height = options.height || 20;
					this.map = options.map;

					this.body = [
						{x : 1, y : 1, bgColor : 'orange'},
						{x : 2, y : 1, bgColor : 'orange'},
						{x : 3, y : 1, bgColor : 'red'}
					];

					// 在设置基本属性时，将elements属性设置为空数组
					this.elements = [];

					// 给小蛇设置一个运动方向标识属性
					this.direction = 'right';


					// 只要进行实例化操作，一定会进行第一次初始化，可以在内部调用init
					this.init();
	}
	// 设置小蛇的init方法
	Snake.prototype.init = function () {
					// 需要在每一次init结构创建之前将旧结构删除
					for (var i = 0; i < this.elements.length; i++) {
						this.map.removeChild(this.elements[i]);
					}
					// 结构移除后，再将数组清空
					this.elements = [];


					var body = this.body;
					// 根据this.body中对象的个数进行div创建，并设置对应的样式
					for (var i = 0; i < body.length; i++) {
						var div = document.createElement('div');
						this.elements.push(div);
						div.style.width = this.width + 'px';
						div.style.height = this.height + 'px';
						div.style.left = body[i].x * this.width + 'px';
						div.style.top = body[i].y * this.height + 'px';
						div.style.backgroundColor = body[i].bgColor;
						this.map.appendChild(div);
					}
	};
	// 设置小蛇的move方法：move方法只会让小蛇移动一步，跑起来是游戏控制的功能
	Snake.prototype.move = function () {
					var body = this.body;
					// 通过观察我们发现，运动时只有蛇头是新坐标，其余的元素均向前进行坐标值获取
					for (var i = 0; i < body.length - 1; i++) {
						body[i].x = body[i + 1].x;
						body[i].y = body[i + 1].y;
					}
					
					// 需要根据this.direction属性，设置蛇头的运动方式
					switch (this.direction) {
						case 'left':
							body[body.length - 1].x--;
							break;
						case 'up':
							body[body.length - 1].y--;
							break;
						case 'right':
							body[body.length - 1].x++;
							break;
						case 'down':
							body[body.length - 1].y++;
							break;
					}
					
					
					// move后，需要进行新的小蛇绘制操作
					//  --- 通过后期的修改，讲init设置到game的snakeRun方法中了。
					// this.init();
	};
	return Snake;
});
