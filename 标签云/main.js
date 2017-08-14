var tags = document.getElementById('tags'),
    tagsCont = [],
    tagsPosi = [],
    r = 300;
var angleX = Math.PI / 180,
	angleY = Math.PI / 180; //初始角度
//原点
var pointX = tags.getBoundingClientRect().left + 300,
    pointY = tags.getBoundingClientRect().top + 300;

var speed = Math.PI / 10800; //旋转角度单位
function init() {
	tagsCont = ['Batman', 'Superman', 'WonderWoman', 'Flash', 'GreenLantern', 'Aquaman', 'Cyborg', 'Firestorm', 'Vibe', 'BlackCanary', 'CaptainAmerica', 'Ironman', 'Thor', 'Hulk', 'Antman', 'Quicksilver', 'ScarletWitch', 'Vision', 'BlackWidow', 'Quake'];
	createDom(tagsCont);
	setInterval(tagsRotate, 100);
}

window.onload = init;
//初始化
function createDom(tc) {
	var len = tc.length;
	for (var i = 0; i < len; i++) {

		var text = document.createTextNode(tc[i]);
		var ele = document.createElement('div');
		ele.appendChild(text);
		ele.setAttribute('class', 'tag');
		tags.appendChild(ele);
		ele.style.color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);

		var a = Math.acos((2 * (i + 1) - 1) / len - 1);
		var b = a * Math.sqrt(len * Math.PI);
		var x = r * Math.sin(a) * Math.cos(b);
		var y = r * Math.sin(a) * Math.sin(b);
		var z = r * Math.cos(a);
		tagsPosi.push([ele, x, y, z]);

		tagsMove(ele, x, y, z);
	}
}
//刷新位置
function tagsMove(ele, x, y, z) {
	var scale = 500 / (500 - z);
	var alpha = (z + r) / (2 * r);
	ele.style.fontSize = 15 * scale + "px";
	ele.style.opacity = alpha + 0.5;
	ele.style.zIndex = parseInt(scale * 100);
	ele.style.left = x + (tags.offsetWidth - ele.offsetWidth) / 2 + 'px';
	ele.style.top = y + (tags.offsetHeight - ele.offsetHeight) / 2 + 'px';
	//ele.style.transform="translateZ("+z+"px) translateX("+x+"px) translateY("+y+"px)";
}
//绕X轴旋转
function rotateX() {
	var sin = Math.sin(angleX);
	var cos = Math.cos(angleX);
	for (var i = 0; i < tagsPosi.length; i++) {
		var y = tagsPosi[i][2];
		var z = tagsPosi[i][3];
		tagsPosi[i][2] = y * cos - z * sin;
		tagsPosi[i][3] = z * cos + y * sin;
	}
}
//绕Y轴旋转
function rotateY() {
	var sin = Math.sin(angleY);
	var cos = Math.cos(angleY);
	for (var i = 0; i < tagsPosi.length; i++) {
		var x = tagsPosi[i][1];
		var z = tagsPosi[i][3];
		tagsPosi[i][1] = x * cos - z * sin;
		tagsPosi[i][3] = z * cos + x * sin;
	}
}

function tagsRotate() {
	rotateX();
	rotateY();
	for (var i = 0; i < tagsPosi.length; i++) {
		tagsMove(tagsPosi[i][0], tagsPosi[i][1], tagsPosi[i][2], tagsPosi[i][3]);
	}
}


document.onmousemove = function(e) {
	angleX = (e.clientX - pointX) * speed;
	angleY = (e.clientY - pointY) * speed;
}