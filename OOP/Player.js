/*
 *面向对象封装轮播器 
 *lists 轮播按钮 
 *scrollImg 要轮播的内容 
 *hoverClass  鼠标类 
 *outTime 轮播间隔 
 */  

function Player(lists,scrollImg,hoverClass,outTime,imageWidth){
    hoverClass = hoverClass || 'current';
    outTime = outTime || 3000;
    this.lists = lists;
    this.scrollImg = scrollImg;
    this.hoverClass = hoverClass;
    this.outTime = outTime;
    this.imageWidth = imageWidth; 
    this.curItem =lists[0];  //初始化当前帧 
    //this.curItem.index = 0;  //初始化当前帧的值 
    this.invoke(0); 
    var _this = this; 
    for(var i=0;i<this.lists.length;i++){ 
        this.lists[i].onmouseover = function(){ 
            _this.Stop(); 
            _this.invoke(this.index); 
        }; 
        this.lists[i].onmouseout = function(){ 
            _this.Start(); 
        }; 
        this.lists[i].index = i; 
    } 
} 
/* start是开始播放函数 stop是结束函数 invoke是切换到哪里的函数 */ 
Player.prototype = { 
    Start : function(){ 
        var _this = this; 
        this.Stop(); 
        this.interval = setInterval(function(){ 
            _this.next();    
        },this.outTime); 
    }, 
    invoke : function(n){ 
        //具体显示那一帧 
        this.curItem = this.lists[n]; 
        var left = parseInt(this.scrollImg.style.left) || 0; 
        this.animateInterval && this.animateInterval(); 
        this.animateInterval = animate(this.scrollImg,{left:left},{left:(-n*this.imageWidth)-left},500,Quad); 
        this.recovery(); 
        this.curItem.className = this.hoverClass; 
         
    }, 
    Stop : function(){ 
        clearInterval(this.interval); 
    }, 
    next : function(){ 
        //这个函数是说明是下一帧 那么我们应该求出当前针. 
        var nextIndex = this.curItem.index + 1; 
        if(nextIndex >= this.lists.length){ 
            nextIndex = 0;   
        }    
        this.invoke(nextIndex); 
    }, 
    recovery : function(){ 
        for(var i=0;i<this.lists.length;i++){ 
            this.lists[i].className = "";    
        }    
    }    
}