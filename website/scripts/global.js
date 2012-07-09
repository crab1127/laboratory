//返回id
function id(id){
	return !id ? null : document.getElementById(id);
}

//判断变量是否存在
function isUndefined(variable){
	return typeof variable = 'undefined' ? true : false;
}

//支持window.onload同时添加几个函数，且不会覆盖
function addLoadEvent(func){
	var oldOnload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldOnload();
			func();
		}
	}
}

//在指定的前面插入内容
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//添加样式
function addClass(element,value){
	if(!element.className){
		element.className = value;
	}else{
		var newClassName = element.className;
		newClassName += '';
		newClassName += value;
		element.className = newClassName;
	}
}

//导航高亮
function highlightPage(){
	if(!id('navigation')) return false;
	var nav = id('navigation');
	var links = nav.getElementsByTagName('a');
	for(var i=0; i<links.length; i++){
		var linkUrl = links[i].getAttribute('href');
		var currentUrl = location.href;
		if(currentUrl.indexOf(linkUrl) != -1){
			links[i].className = 'here';
			var linkText = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute('id',linkText);
		}
	}
}

//切换显示的
function showSection(id){
	var divs = document.getElementsByTagName('div');
	//alert('ss');
	for(var i=0; i<divs.length; i++){
		if(divs[i].className.indexOf('section') == -1) continue;
			
		if(divs[i].getAttribute('id') != id){
			divs[i].style.display = 'block';
		}else{
			
			divs[i].style.display = 'none';
		}
	}
}

//tab
function tab(){
	if(!id('internalnav')) return false;
	var nav = id('internalnav');
	var links = nav.getElementsByTagName('a');
	for(var i=0; i<links.length; i++){
		var sectionId = links[i].getAttribute('href').split('#')[1];
		id(sectionId).style.display = 'none';
		links[i].displayId = sectionId
		links[i].onclick = function() {
		showSection(this.displayId);
		return false;
    }		
	}
}

//创建图片库
function preparePlaceholder(){
	if(!id('imagegallery')) return false;
	var description = document.createElement('p');
	description.setAttribute('id','description');
	var descText = document.createTextNode('选择一个图像');
	description.appendChild(descText);
	var placeholder = document.createElement('img');
	placeholder.setAttribute('id','placeholder');
	placeholder.setAttribute('src','images/placeholder.gif');
	placeholder.setAttribute('alt','我是图片画廊');
	id('content').appendChild(placeholder);	
	id('content').appendChild(description);	
}

//传值
function showPic(whichPic){
	var source = whichPic.getAttribute('href');   
    var placeholder = id('placeholder');
    placeholder.setAttribute('src',source);    
    if(!id('description')) return false;
    if(whichPic.getAttribute('title')){
        var text = whichPic.getAttribute('title');
    }else{
        var text = '';
    }
    var description = id('description');
    if(description.firstChild.nodeType == 3){
        description.firstChild.nodeValue = text;
    }
    return false;
}

//给a 绑定事件
function prepareGallery(){
	if(!id('imagegallery')) return false;
    var gallery = id('imagegallery');
    var links = gallery.getElementsByTagName('a');    
    for(var i=0; i<links.length; i++){ 
        //var whichPic = links[i].getAttribute('href');        
        links[i].onclick = function(){            
            return showPic(this);
        }
    }
}



addLoadEvent(highlightPage);
addLoadEvent(tab);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);