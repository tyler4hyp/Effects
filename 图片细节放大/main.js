var img = document.images[0],
    show = document.getElementById('show'),
    cont = show.getContext('2d'),
    box = document.getElementById('box');

var iw, ih, bw, bh;
var picpo = [];

window.onload = function() {
	cont.drawImage(img, 0, 0, 1024, 768, 0, 0, 1024, 768);
	picpo.push([0, 0]);
	iw = img.naturalWidth;
	ih = img.naturalHeight;
	bw = Math.round((1024 * 400 / iw));
	bh = Math.round((768 * 300 / ih));
	box.style.width = bw + 'px';
	box.style.height = bh + 'px';
	box.style.left = 0;
	box.style.top = 0;
}

show.onmousedown = function(e) {
	var oldX = e.pageX;
	var oldY = e.pageY;
	show.onmouseup = function(e) {
		var newX = oldX - e.pageX + picpo[0][0];
		var newY = oldY - e.pageY + picpo[0][1];
		cont.clearRect(0, 0, 1024, 768);
		drawing(newX, newY);
		drawbox(picpo[0][0], picpo[0][1]);
		show.onmouseup = null;
	}
}

function drawing(x, y) {
	var px = x;
	var py = y;
	var maxX = iw - 1024;
	var maxY = ih - 769;
	if (px < 0) px = 0;
	if (px > maxX) px = maxX;
	if (py < 0) py = 0;
	if (py > maxY) py = maxY;
	cont.drawImage(img, px, py, 1024, 768, 0, 0, 1024, 768);
	picpo[0] = [px, py];
}

function drawbox(x, y) {
	var bl = Math.round((x * 400 / iw));
	var bt = Math.round((y * 300 / ih));
	var maxl = 400 - bw;
	var maxt = 300 - bh;
	if (bl > maxl) bl = maxl;
	if (bt > maxt) bt = maxt;
	box.style.left = bl + 'px';
	box.style.top = bt + 'px';
}

img.addEventListener('click', function(e){
	var x = e.clientX;
	var y = e.clientY;
	var il = img.getBoundingClientRect().left;
	var it = img.getBoundingClientRect().top;
	var bl = x - bw / 2 - il;
	var bt = y - bh / 2 - it;
	box.style.left = bl + 'px';
	box.style.top = bt + 'px';
	var px = Math.round((bl * iw / 400));
	var py = Math.round((bt * ih / 300));
	drawing(px, py);
});