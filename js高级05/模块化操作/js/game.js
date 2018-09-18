// 对于要被依赖得模块，requirejs提供了一个define()
define(['food', 'snake'], function (Food, Snake) {
	// 游戏控制功能：
	//    用于对游戏进行整体控制
	function Game (map, score) {
		//		属性：食物，小蛇，地图
		this.food = new Food({map : map});
		this.snake = new Snake({map : map});
		this.map = map;
		this.score = score;
	}
	// 设置游戏开始功能
	Game.prototype.start = function () {
					// 1 绘制食物(在Food实例化的同时以及进行了初始绘制)
					// 2 绘制小蛇(在Snake实例化的同时以及进行了初始绘制)
					// 3 小蛇运动
					this.snakeRun();
					// 4 设置按键控制方式
					this.change();
					// 5 设置游戏规则：吃食物，游戏结束，计分
	};
	Game.prototype.snakeRun = function () {
					var snake = this.snake;
					var food = this.food;
					var map = this.map;
					var score = this.score;
					// 设置小蛇的持续运动效果
					var timer = null;
					var count = 0;

					timer = setInterval(function () {
						// --- 获取运动之前的蛇尾坐标
						var sheWeiX = snake.body[0].x;
						var sheWeiY = snake.body[0].y;
						var sheTou = snake.body[snake.body.length - 1];

						// 定时器的参数1是一个函数，使用this时会出现问题，可以通过变了保存的方式解决
						snake.move();

						// --- 吃食物检测，如果运动过程中，设置头坐标与食物坐标相同，说明吃到了
						if (sheTou.x === food.x && sheTou.y === food.y) {
							// 按照旧的蛇尾坐标，设置新的蛇尾坐标即可
							snake.body.unshift({x : sheWeiX, y : sheWeiY, bgColor : 'orange'});
							// 重新进行食物绘制
							food.init();

							// 设置吃到的食物数增加
							count++;
							score.innerText = '游戏分数为：' + count * 10;
						}

						// --- 游戏结束检测：蛇头超出地图范围，游戏结束
						if (sheTou.x < 0 || sheTou.y < 0 || sheTou.x > map.offsetWidth / snake.width - 1 ||  sheTou.y > map.offsetHeight / snake.height - 1) {
							alert('游戏结束,撞墙了!');
							clearInterval(timer);
							// 设置return阻止超出后的绘制(看起来好看一点)
							return;
						}

						// --- 游戏结束检测：蛇头撞到了自己蛇身时，游戏结束
						//   通过观察我们发现，蛇头只能碰到前4节以外的蛇身部分
						for (var i = 0; i < snake.body.length - 4; i++) {
							// 比较蛇身与蛇头坐标的关系即可
							if (sheTou.x === snake.body[i].x && sheTou.y === snake.body[i].y) {
								alert('游戏结束,咬到自己了!');
								clearInterval(timer);
								// return;
							}
						}

						// 小蛇的init操作原本书写在小蛇的move中，但是通过吃食物等操作，可以修改了小蛇的body属性
						// 可以将init书写到判断之后，等确定了所有信息再绘制
						snake.init();

					}, 50);
	};
	Game.prototype.change = function () {
					// 用于设置按键操作，修改小蛇的运动方向
					//  给小蛇设置了一个direction属性，通过按键修改这个属性即可,设置keydown事件进行操作
					var snake = this.snake;
					var flag = true;

					document.onkeydown = function (e) {
						if (flag === false) { 
							return; 
						}
						flag = false; 
						// 先在点击后设置标记flag为false，阻止下次事件触发，同时设置定时器，在100ms后允许再次触发
						setTimeout(function () {
							flag = true;
						}, 100);

						var code = e.keyCode; // 左37 上38 右39 下40
						/*
							switch (code) {
								case 37:
									snake.direction = 'left';
									break;
								case 38:
									snake.direction = 'up';
									break;
								case 39:
									snake.direction = 'right';
									break;
								case 40:
									snake.direction = 'down';
									break;
							}
						*/
						switch (true) {
							case code === 37 && snake.direction !== 'right':
								snake.direction = 'left';
								break;
							case code === 38 && snake.direction !== 'down':
								snake.direction = 'up';
								break;
							case code === 39 && snake.direction !== 'left':
								snake.direction = 'right';
								break;
							case code === 40 && snake.direction !== 'up':
								snake.direction = 'down';
								break;
						}
					};
	};

	// 使用return将当前模块主功能返回
	return Game;
});

