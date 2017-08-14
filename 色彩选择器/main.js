var box = document.getElementById('box'),
    boxcon = box.getContext('2d'),
    bar = document.getElementById('bar'),
    barcon = bar.getContext('2d'),
    indi = document.getElementById('indicator'),
    inputs = document.getElementsByTagName('input'),
    circle = document.getElementById('circle'),
    circlepos = []; //box内圆圈相对于box的坐标
//初始化bar
function initbar() {
	var gradient = barcon.createLinearGradient(0, 5, 0, 295);
	gradient.addColorStop(0, 'red');
	gradient.addColorStop(1 / 6, 'purple');
	gradient.addColorStop(2 / 6, 'blue');
	gradient.addColorStop(3 / 6, 'cyan');
	gradient.addColorStop(4 / 6, 'green');
	gradient.addColorStop(5 / 6, 'yellow');
	gradient.addColorStop(1, 'red');
	barcon.fillStyle = gradient;
	barcon.fillRect(0, 5, 30, 290);
}
//box渲染
function boxRender(data) {
	var gradient = boxcon.createLinearGradient(0, 0, 300, 0);
	var color = "rgba(" + data[0] + "," + data[1] + "," + data[2] + "," + 1 + ")";
	gradient.addColorStop(0, 'white');
	gradient.addColorStop(1, color);
	boxcon.fillStyle = gradient;
	boxcon.fillRect(0, 0, 300, 300);
	gradient = boxcon.createLinearGradient(0, 0, 0, 300);
	gradient.addColorStop(0, 'rgba(0,0,0,0)');
	gradient.addColorStop(1, 'black');
	boxcon.fillStyle = gradient;
	boxcon.fillRect(0, 0, 300, 300);
}
//显示文字信息
function textbox(r, g, b) {
	inputs[0].value = r;
	inputs[1].value = g;
	inputs[2].value = b;
	var hsl = rgbToHsl(r, g, b);
	inputs[3].value = hsl[0];
	inputs[4].value = hsl[1];
	inputs[5].value = hsl[2];
	var str = rgb2csscol(r, g, b);
	inputs[6].value = str;
}
//初始化
function init() {
	initbar();
	var initdata = [255, 0, 0];
	boxRender(initdata);
	textbox(255, 255, 255);
}
window.onload = init;

//indicator滑动
indi.onmousedown = function(e) {
		var oldY = e.pageY;
		var oldTop = oldY - 30;
		document.onmousemove = function(e) {
			var newY = e.pageY;
			if (newY >= 30 && newY <= 320) {
				var d = newY - oldY;
				indi.style.marginTop = oldTop + d + 'px';
				var colpo = newY - 30;
				boxRender(getColor(0, colpo));
				var data = getBoxColor(circlepos[0], circlepos[1]);
				textbox(data[0], data[1], data[2]);
			}
		}
		document.onmouseup = function() {　　　　　
			document.onmousemove = null;　　　　　
			document.onmouseup = null;　　
		};
	}
	//获取bar内部选点的颜色
function getColor(x, y) {
	var imageData = barcon.getImageData(x, y, 1, 1);
	return imageData.data;
}
//获取box内部选点的颜色
function getBoxColor(x, y) {
	var imageData = boxcon.getImageData(x, y, 1, 1);
	return imageData.data;
}

bar.onclick = function(e) {
	var y = e.pageY;
	if (y >= 35 && y <= 325) {
		var inditop = y - 30;
		indi.style.marginTop = inditop + 'px';
		boxRender(getColor(0, inditop));
		var data = getBoxColor(circlepos[0], circlepos[1]);
		textbox(data[0], data[1], data[2]);
	}
}

box.onclick = function(e) {
	var x = e.clientX;
	var y = e.clientY;
	circle.style.top = y + 'px';
	circle.style.left = x + 'px';
	circlepos[0] = x - box.getBoundingClientRect().left;
	circlepos[1] = y - box.getBoundingClientRect().top;
	var data = getBoxColor(circlepos[0], circlepos[1]);
	textbox(data[0], data[1], data[2]);
}

function rgbToHsl(r, g, b) {
	r = r / 255, g = g / 255, b = b / 255;
	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;
	if (max == min) {
		h = s = 0;
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = 60 * (g - b) / d + (g < b ? 360 : 0);
				break;
			case g:
				h = (b - r) / d + 120;
				break;
			case b:
				h = (r - g) / d + 240;
				break;
		}
	}
	return [Math.round(h), Math.round(s * 100) / 100, Math.round(l * 100) / 100];
}

function hsl2rgb(h, s, l) {
	var r, g, b;
	if (s == 0) {
		r = g = b = l;
	} else {
		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		var k = h / 360;

		function changeMethod(t) {
			var c;
			if (t < 0) {
				t = t + 1;
			}
			if (t > 1) {
				t = t - 1;
			}
			if (t < 1 / 6) {
				c = p + ((q - p) * 6 * t);
			} else if (t < 1 / 2) {
				c = q;
			} else if (t < 2 / 3) {
				c = p + ((q - p) * 6 * (2 / 3 - t));
			} else {
				c = p;
			}
			return c;
		}
		r = changeMethod(k + 1 / 3);
		g = changeMethod(k);
		b = changeMethod(k - 1 / 3);
	}
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgb2csscol(r, g, b) {
	var str = "#" + r.toString(16) + g.toString(16) + b.toString(16);
	return str;
}

function csscol2rgb(str) {
	var r = parseInt(str.substring(1, 3), 10);
	var g = parseInt(str.substring(3, 5), 10);
	var b = parseInt(str.substring(5), 10);
	return [r, g, b];
}