var can1;
var ctx1;

var can2;
var ctx2;

var lastTime; //上一帧的时间
var deltaTime; //两帧的时间差

var canWidth; //画布宽度
var canHeight; //画布高度

var ane; //海葵
var fruit; //果实

var mom; //大鱼妈妈
var baby; //小鱼宝宝

var babyTail = []; //小鱼尾巴数组
var babyEye = []; //小鱼眨眼数组
var babyBody = []; //小鱼身体数组

var momTail = []; //大鱼尾巴数组
var momEye = []; //大鱼眨眼数组
var momBodyOra = []; //大鱼橙色身体
var momBodyBlue = []; //大鱼蓝色身体

//鼠标移动的位置
var mx;
var my;

//分值数据
var data;

//特效圈
var wave;
var helo;

//漂浮物
var dust;
var dustPic = [];

//背景图片
var bgPic = new Image();

// 游戏主函数
function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

// 初始化函数
function init() {
    can1 = document.getElementById("canvas1"); //fish, dust, UI, circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2"); //background, fruit, haikui
    ctx2 = can2.getContext("2d");
    //检测鼠标的移动
    can1.addEventListener('mousemove', onMouseMove, false);
    //加载背景图片
    bgPic.src = "./img/background.jpg";
    //画布宽高
    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();
    //初始化鼠标开始的位置
    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    //初始化小鱼尾巴数组
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "img/babyTail" + i + ".png";
    }
    //初始化小鱼眨眼数组
    for (var j = 0; j < 2; j++) {
        babyEye[j] = new Image();
        babyEye[j].src = "img/babyEye" + j + ".png";
    }
    // 初始化身体变白数组
    for (var k = 0; k < 20; k++) {
        babyBody[k] = new Image();
        babyBody[k].src = "img/babyFade" + k + ".png";
    }
    //初始化大鱼尾巴数组
    for (var mi = 0; mi < 8; mi++) {
        momTail[mi] = new Image();
        momTail[mi].src = "img/bigTail" + mi + ".png";
    }
    for (var mj = 0; mj < 2; mj++) {
        momEye[mj] = new Image();
        momEye[mj].src = "img/bigEye" + mj + ".png";
    }
    data = new dataObj(); //分值的类

    for (var mbody = 0; mbody < 8; mbody++) { //大鱼身体变化
        momBodyOra[mbody] = new Image();
        momBodyBlue[mbody] = new Image();
        momBodyOra[mbody].src = "img/bigSwim" + mbody + ".png";
        momBodyBlue[mbody].src = "img/bigSwimBlue" + mbody + ".png";
    }

    //分值显示样式
    ctx1.font = "40px";
    ctx1.textAlign = "center";

    //特效
    wave = new waveObj();
    wave.init();
    helo = new heloObj();
    helo.init();

    //漂浮物
    dust = new dustObj();
    for (var di = 0; di < 7; di++) {
        dustPic[di] = new Image();
        dustPic[di].src = "img/dust" + di + ".png";
    }
    dust.init();

}

// 帧函数
function gameloop() {

    window.requestAnimFrame(gameloop);
    //获取两帧时间差
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    //防止切换时deltaTime太大而使得食物也太大
    if (deltaTime > 50) {
        deltaTime = 50;
    }
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();

    ctx1.clearRect(0, 0, canWidth, canHeight); //把前面一帧的内容清空掉
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();

    data.draw(); //分值
    wave.draw(); //特效
    helo.draw();
    dust.draw(); // 漂浮物

}

// 鼠标移动函数
function onMouseMove(e) {
    if (!data.gameOver) {
        if (e.offSetX || e.layerX) {
            // 获取鼠标坐标
            mx = e.offSetX === undefined ? e.layerX : e.offSetX;
            my = e.offSetY === undefined ? e.layerY : e.offSetY;
        }
    }

}

// 加载游戏
document.body.onload = game;
