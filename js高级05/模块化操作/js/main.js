// 此段代码是针对本页面功能进行设置得代码
//   我们发现，主模块得功能需要依赖于Game，就需要对这个依赖关系进行声明
//   requirejs提供了一个函数require()
//		- 参数1：数组形式，内部可以书写多个字符串，表示依赖得模块得文件路径
//				- 声明依赖关系后，还需要对被依赖得模块进行处理操作
//						- (设置为规范得模块形式，声明依赖关系)
require(['game'], function (Game) {
	var map = document.getElementById('map');
	var score = document.getElementById('score');
	var g1 = new Game(map, score);
	g1.start();
});