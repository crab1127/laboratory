/*
 * 小贤是一条可爱的小狗(Dog)，它的叫声很好听(wow)，每次看到主人的时候就会
 * 乖乖叫一声(yelp)。从这段描述可以得到以下对对象
*/
function Dog(){
	this.wow = function(){
		alert('Wow');
	}
	this.yelp = funcrion(){
		this.wow();
	}
}

/*
 * 小芒和小贤一样，原来也是一条可爱的小狗，可是突然有一天疯了(MadDog)，一看
 * 到人就会每隔半秒叫一声(wow)地不停叫唤(yelp)。请根据描述，按示例的形式用代码来实现。
*/

function MadDog(){
}

ModDog.prototype = new Dog();

ModDog.prototype.yelp = function(){
	var self = this;
	setInterval(function(){
		self.wow();
	},500);
}