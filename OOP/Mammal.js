//定义一个动物的对象
function Mammal(name){
    this.name = name;
    this.sex = 'a';
    this.offspring = [];
}

Mammal.prototype.haveABaby = function(){
    var newBaby = new Mammal('Baby'+this.name);
    this.offspring.push(newBaby);
    return newBaby;
}
//静态属性 调用时不能通过它的实例来调用 只能 是 Mammal.age
Mammal.age = 1;
//原型方法 所有实例都继承此方法
Mammal.prototype.toString = function(){
    return '[Mammal"'+this.name+'"]';
}

//Cat继承Mammal
Cat.prototype = new Mammal();
//指定Cat的构造函数，如果不制定则由Mammal来构造
Cat.prototype.constructor = Cat;
function Cat(name){
    this.name = name;
    this.sex = 'b';
}

// 定义Cat的原型方法 否则会继承Mammal的原型方法
Cat.prototype.toString = function(){
    return '[Cat"'+this.name+'"]';
}

// 实例化 Mammal
var someAnimal = new Mammal('Mr.Bigles');
var myPet = new Cat('Felix');
alert('someAnimal is' + someAnimal);