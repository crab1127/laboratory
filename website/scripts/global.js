//����id
function id(id){
	return !id ? null : document.getElementById(id);
}

//�жϱ����Ƿ����
function isUndefined(variable){
	return typeof variable = 'undefined' ? true : false;
}

//֧��window.onloadͬʱ��Ӽ����������Ҳ��Ḳ��
function addLoadEvent(func){
	var oldOnload = window.onload;
	if(typeof window.onload = 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldOnload();
			func();
		}
	}
}

//��ָ����ǰ���������
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//�����ʽ
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

//��������
function highlightPage(){
	if(!id('navigation')) return false;
	var nav = id('navigation');
	var links = nav.getElementsByTagName('a');
	for(var i=0; i<links.length; i++){
		var linkUrl = links[i].getArrribute('href');
		var currentUrl = location.href;
		if(currentUrl.indexOf(linkUrl) != -1){
			links[i].className = 'here';
			var linkText = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribut('id',linkText);
		}
	}
}

addLoadEvent(highlightPage);