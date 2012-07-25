/**
 *  Ajax对象接受一个对象字面量为参数，这个对象字面量中包含method，url，success，params，fail参数
 *  method："GET"或者"POST"
 *  url：服务器端文件路径
 *  success：当请求没有错误的时候，调用的回调函数，该回调函数带一个XMLHttpRequest对象的参数
 *  fail：当请求错误的时候调用
 *  params：当使用POST方法发送请求是，params为参数字符串
 */


function Ajax(prop){
    this.action(prop); //在实例化的时候就调用action方法
}

Ajax.prototype = {
    creatXHR : function(){ //创建XMLHttpRequest对象
        var xhr = false;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }else if(widow.ActiveXObject){
            try{
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            }catch(e){
                xhr = new ActiveXObject('Microsoft.XHLHTTP');
            }
        }
        return xhr;
    },
    action : function(prop){
        var xhr = this.createXHR();
        if(xhr){
            var url = encodeURI(prop['url']); //对URL进行编码
            if(prop['method'] == 'GET' && url && prop['success']){ //get 方法
                xhr.onreadystatchange = function(){
                    (function(){ //自执行函数用于检查服务器的返回状态并执行回调函数
                        if(xhr.readyState == 4 && xhr.status == 200){
                            prop['success'](xhr); //执行回调函数
                        }
                    })();
                }
                //alert(prop['hander']instanceof Function);
                xhr.open('GET', url, true);
                xhr.send(null);
            }else if(prop["method"] == "POST" && url && prop["success"]) {   //POST方法
                 xhr.onreadystatechange = function(){
                    (function(){
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            prop["success"](xhr); //执行回调函数
                        }
                    })();
                };
                if(prop["params"]){
                    url = url.indexOf("?") > -1 ? url + "&" + prop["params"] : url +"?" + prop["params"];
                }
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(null);
            }
        }else if (!xhr && prop["fail"]) {
            prop["fail"]();
        }
    }

}

function getData(){
    var ajax = new Ajax({
        url: "test.php",
        method: "POST",
        success: onComplete,
        params: "name="+escape("沙锋")  //进行编码
    });
}
            
function onComplete(obj){
alert(unescape(obj.responseText));  //进行转码
}