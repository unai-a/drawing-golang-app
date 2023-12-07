const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const color = document.getElementById('color');
const thickness = document.getElementById('thickness');
const clear = document.getElementById('clear');
const socket = io.connect('http://localhost:8001');




let drawing = false;
let current = {
	color: 'black',
	thickness: 1
};

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mouseout', onMouseUp, false);
canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

color.addEventListener('change', onColorChange, false);
thickness.addEventListener('change', onThicknessChange, false);
clear.addEventListener('click', onClear, false);

socket.on('drawing', function(data) {

	var w = canvas.width;
	var h = canvas.height;
	drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.thickness);
});

window.addEventListener('resize', onResize, false);
onResize(); // Call initially

function getMousePos(e) {
	const rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

function drawLine(x0, y0, x1, y1, color, thickness, emit) {
	ctx.beginPath();
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
	ctx.strokeStyle = color;
	ctx.lineWidth = thickness;
	ctx.stroke();
	ctx.closePath();

	if (!emit) {
		return;
	}

	const w = canvas.width;
	const h = canvas.height;

	socket.emit('drawing', {
		x0: x0 / w,
		y0: y0 / h,
		x1: x1 / w,
		y1: y1 / h,
		color,
		thickness
	});

}

function onMouseDown(e) {
	drawing = true;
	const pos = getMousePos(e);
	current.x = pos.x;
	current.y = pos.y;
}

function onMouseUp(e) {
	if (!drawing) {
		return;
	}

	drawing = false;
	const pos = getMousePos(e);
	drawLine(current.x, current.y, pos.x, pos.y, current.color, current.thickness, true);
}

function onMouseMove(e) {
	if (!drawing) {
		return;
	}

	const pos = getMousePos(e);
	drawLine(current.x, current.y, pos.x, pos.y, current.color, current.thickness, true);
	current.x = pos.x;
	current.y = pos.y;
}

function onColorChange(e) {
	current.color = e.target.value;
}

function onThicknessChange(e) {
	current.thickness = e.target.value;
}

function onClear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function onDrawingEvent(data) {
	console.log('Drawing event received:', data);

	if (data.action === 'loadCanvas') {
		// New: Handle loading canvas data
		const image = new Image();
		image.onload = function () {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(image, 0, 0);
		};
		image.src = data.imageData;
	} else {
		// Original: Handle drawing data
		const w = canvas.width;
		const h = canvas.height;
		drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.thickness, false);
	}
}

// limit the number of events per second
function throttle(callback, delay) {
	let previousCall = new Date().getTime();
	return function () {
		const time = new Date().getTime();
		if ((time - previousCall) >= delay) {
			previousCall = time;
			callback.apply(null, arguments);
		}
	};
}

function onResize() {
	const parentWidth = canvas.parentElement.clientWidth; // Get the width of the parent container
	const targetWidth = 580;  // Set your desired width

	// Store the existing drawing data
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	// Set the canvas dimensions to maintain the aspect ratio
	canvas.width = parentWidth;
	canvas.height = (parentWidth / targetWidth) * targetWidth;

	// Restore the drawing data to the new canvas size
	ctx.putImageData(imageData, 0, 0);

	// Set the canvas style to 100% width and height
	canvas.style.width = '100%';
	canvas.style.height = '100%';
}