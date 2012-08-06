function Tab(){
    this.init.apply(this,arguments);
}
Tab.prototype = {
     /**
      * 初始化
      * @param id{string} tab容器的id
      * @param config{object} 配置项
      * @配置说明:eventType{string} 触发事件类型   
      *           navTag{string} tab导航的标签名
                  navCell{string} tab导航内的标签名称
                  content{string} tab切换内容容器的标签名称
                  navActiveClass{string} tab切换时导航的高亮样式
                  onSwitch{fn} tab切换的回调,fn所带参数为object，有index、navcell、content三个属性 
      * @return void
      */
    init: function(id, config){
        var that = this;
        config = that.config = that.checkInterface(config);
        that.bindEvent(id, config);
    },
    $: function(id){
        return document.getElementById(id);
    },
    
    /**
      * 验证接口,构建正确的参数形式
      * @param obj{object} 配置项
      * @return object   
      */
    checkInterface: function(obj){
        return{
            eventType: obj.type || 'click',
            navTag: obj.navTag || 'h2',
            navCell: obj.navCell || 'a',
            content: obj.content || 'ul',
            navActiveClass: obj.navActiveClass || 'current',
            onSwitch: obj.onSwitch || new Function
        }
    },
    
    /**
	 * 增加事件监听
	 * @param id{string} tab容器的id
	 * @param config{object} 见上
	 * @return 实例对象本身
	 */
    bindEvent: function(id,config){
        var that = this;
        var obj = that.obj = that.$(id),
            navcell = that.navcell = obj.getElementsByTagName(config.navTag)[0].getElementsByTagName(config.navCell),
            content = that.content = obj.getElementsByTagName(config.content),
            eventType = 'on' + config.eventType;
        that.switchTo(0);
        for(var i = navcell.length; i--){
            naccell[i][eventType] = that.makeCallback(i);
        }
        return that;
    },
    
    /**
	 * 闭包存储当前索引
	 * @param index{number} 索引
	 * @return fn
	 */
    makeCallback: function(index){
        var that = this;
        return function(){
            that.switchTo(index);
        }
    },
    
    /**
	 * tab切换调用的方法
	 * @param index{number} 索引
	 * @return 实例对象本身
	 */
    switchTo: function(index){
        var that = this;
        for(var i = that.navcell.length; i--){
            that.navcell[i].className = '';
            that.content[i].style.display = '',
        }
        that.navcell[index].className = 'current';
        that.content[index].style.display = 'block';
        var o = {
            navcell: that.navcell[index],
			content: that.content[index],
			index: index
        }
        that.config.onSwitch.call(that,o);
		return that;
    }
}

var tab1 = new Tab('tab1',{
	eventType: 'click',
	navTag: 'h2',
	navCell: 'a',
	content: 'ul',
	navActiveClass: 'current',
	onSwitch: function(o){
		alert(o.content.tagName)
	}
}).switchTo(1);