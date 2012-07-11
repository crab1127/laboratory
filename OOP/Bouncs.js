var bounce = {
	x:0, y:0, w:200, h:200,   //窗口位置 和 大小
	dx:5, dy:5,               //窗口速度
	interval:100, 			  //间隔时间
	win:null, 				  //创建的窗口
	timer:null,               //setInterval()的返回值
    
    //动画开始
    start:function() {
        bounce.x = (screen.width - bounce.w)/2;
        bounce.y = (screen.width - bounce.h)/2;
        bounce.win = window.open('javascript:"<h1>bounce!</h1>"',"","left=" 
                                     + bounce.x + ",top=" + bounce.y + ", width="
                                     + bounce.w + ", height=" + bounce.h + ", status=yes");
        bounce.timer = setInterval(bounce.nextFrame, bounce.interval);
    },
    
    //动画结束
    stop:function() {
        clearInterval(bounce.timer);
        if(!bounce.win.closed){
            bounce.win.close();
        }
    },
    
    //显示下一帧的动画。setInterval()调用
    nextFrame:function(){
        //如果用户关闭窗口,停止播放动画
        if(bounce.win.closed){
            clearInterval(bounce.timer);
            return;
        }
        
        //如果已经达到了最右或最左边缘就反弹
        if((bounce.x + bounce.dx > (screen.availWidth - bounce.w )) || 
        (bounce.x + bounce.dx <0)){
            bounce.dx = - bounce.dx;
        }
        
        //如果已经达到了底部或顶部边缘反弹
        if ((bounce.y + bounce.dy > (screen.availHeight - bounce.h))||
        (bounce.y + bounce.dy < 0)){
            bounce.dy = - bounce.dy;
        }
        
        //更新当前窗口的位置        
        bounce.x += bounce.dx;
        bounce.y += bounce.dy;
        
        //最后,将窗口移到新的位置
        bounce.win.moveTo(bounce.x, bounce.y);
        
        //显示当前位置在窗口的状态行
        bounce.win.defaultStatus = "(" + bounce.x + bounce.y + ")";
    }
}