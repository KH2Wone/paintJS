const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');

canvas.width = document.getElementsByClassName('canvas')[0].offsetWidth;
canvas.height = document.getElementsByClassName('canvas')[0].offsetHeight;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

// 마우스는 계속 움직이고 있다
function onMouseMove(event) {
    // canvas 내의 좌표만 찾고자 할때 : offset
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        // 그리고 있지 않을때
        ctx.beginPath(); // 계속해서 path, 즉 선을 그린다. (경로)
        ctx.moveTo(x, y); // 해당 좌표를 따라다닌다 (선의 시작)
    } else {
        // 그릴때 (마우스를 움직이는 내내 발생한다)
        ctx.lineTo(x, y); // 선의 끝 (현재의 sub-path에서 마지막 지점을 특정 좌표로 연결 === 즉, 마우스를 떼지않고 계속 그릴때 연결되어보이는 것을 뜻함, 이전 위치와 연결)
        ctx.stroke(); // 선을 그린다
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint'
    }
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}


function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick))

// 페인트 붓 사이즈
if (range) {
    range.addEventListener('input', handleRangeChange);
}

// fill or paint btn
if (mode) {
    mode.addEventListener('click', handleModeClick);
}