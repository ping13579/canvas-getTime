var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 708;
var RADIUS = 8;

var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

//倒计时
//var endTime = new Date();
//    endTime.setTime(endTime.getTime() + 2*3600*1000)
var curShowTimeSeconds = 0;

var balls = [];

var colors =['#33b5e5','#0099cc','#aa66cc','#9933cc','#99cc00','#669900','#ffbb33','#ff8800','#ff4444','#cc0000'];



window.onload = function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentTime();

    setInterval(function(){
        render(context);
        update();
    },50);


};

function getCurrentTime(){
    var curTime = new Date();

    //倒计时
    //var ret = endTime.getTime()-curTime.getTime();
    //ret = Math.round(ret/1000);
    //return ret >=0 ? ret : 0;

    //显示时钟
    var ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();
    return ret;
}

function update(){
    var nextShowTime = getCurrentTime();

    var nexthours = parseInt(nextShowTime/3600),
        nextminutes = parseInt((nextShowTime-nexthours*3600)/60),
        nextseconds = parseInt(nextShowTime % 60);

    var curhours = parseInt(curShowTimeSeconds/3600),
        curminutes = parseInt((curShowTimeSeconds-curhours*3600)/60),
        curseconds = parseInt(curShowTimeSeconds % 60);

    if(nextseconds != curseconds){
        if(parseInt(curhours/10)!= parseInt(nexthours/10)){
            addBalls( MARGIN_LEFT,MARGIN_TOP,parseInt(curhours/10));
        }
        if(parseInt(curhours%10)!= parseInt(nexthours%10)){
            addBalls( MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curhours%10));
        }
        if(parseInt(curminutes/10)!= parseInt(nextminutes/10)){
            addBalls( MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curminutes/10));
        }
        if(parseInt(curminutes%10)!= parseInt(nextminutes%10)){
            addBalls( MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curminutes%10));
        }
        if(parseInt(curseconds/10)!= parseInt(nextseconds/10)){
            addBalls( MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curseconds/10));
        }
        if(parseInt(curseconds%10)!= parseInt(nextseconds%10)){
            addBalls( MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curseconds%10));
        }
        curShowTimeSeconds = nextShowTime;

    }

    updataBalls();
    console.log(balls.length);

}
function updataBalls(){
    for(var i=0;i<balls.length;i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.75;
        }
    }
    var cnt = 0;
    for(var i=0;i<balls.length;i++){
       if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH){
           balls[cnt++] = balls[i];
       }
    }

    while (balls.length>Math.min(300,cnt)){
        balls.pop();
    }

}
function addBalls(x,y,num){
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                var aBall ={
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aBall);
            }
        }
    }
}

function render(ctx){
    ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    var hours = parseInt(curShowTimeSeconds/3600),
        minutes = parseInt((curShowTimeSeconds-hours*3600)/60),
        seconds = parseInt(curShowTimeSeconds % 60);
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx,'#33b5e5');
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx,'#0099cc');
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx,'#aa66cc');
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx,'#9933cc');
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx,'#99cc00');
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx,'#669900');
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx,'#ffbb33');
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx,'#9933cc');

    for(var i =0;i<balls.length;i++){
        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
    }
}

function renderDigit(x,y,num,ctx,cor){

    ctx.fillStyle = cor;
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                ctx.beginPath();
                ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}