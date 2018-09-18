define(function () {
	// 食物功能制作:
	//   基本属性：宽 高 背景色 地图
	function Food (options) {
				// 当一个函数的参数很多时，可以设置为对象属性的传入方式，好处是不用记住参数列表的顺序
				this.width = options.width || 20;
				this.height = options.height || 20;
				this.bgColor = options.bgColor || 'green';
				this.map = options.map;

				// 后续功能设置中使用了element x y这些属性,可以在构造函数体中进行标识
				this.x = 0; // 用于保存食物盒子的横坐标
				this.y = 0; // 用于保存食物盒子的横坐标
				this.element = null; // 用于保存本次创建的食物盒子

				// 我们发现，只要进行了Food构造函数的调用，一定会进行初始化操作
				this.init();
	}
	//   功能设置：
	//				绘制食物盒子， 设置盒子的随机坐标位置
	// init - 初始化,绘制食物盒子
	Food.prototype.init = function () {
				// 我们发现，食物不仅会绘制一次，如果绘制多次时，需要将旧的食物盒子移除
				if (this.element) {
					this.map.removeChild(this.element);
				}

				var div = document.createElement('div');
				this.element = div;
				div.style.width = this.width + 'px';
				div.style.height = this.height + 'px';
				div.style.backgroundColor = this.bgColor;
				this.map.appendChild(div);


				// 我们发现，每次只要进行绘制操作，一定会进行随机位置的设置
				// 可以将让randompos的调用设置到init最后
				this.randomPos();
	};
	// 设置随机位置
	Food.prototype.randomPos = function () {
				// 需要先计算出可以显示的随机坐标值，再根据坐标值计算显示的left和top
				this.x = parseInt(Math.random() * this.map.offsetWidth / this.width);
				this.y = parseInt(Math.random() * this.map.offsetHeight / this.height);

				// 需要将坐标设置给食物盒子
				this.element.style.left = this.x * this.width + 'px';
				this.element.style.top = this.y * this.height + 'px';
	};

	return Food;
});
	
