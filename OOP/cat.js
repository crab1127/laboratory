/*
 * 一。生成对象的原始模式 （最简便的封装）
 * 缺点：1.如果多生成几个实例，写起来就比较麻烦
 *       2.实例与原型之间，没有任何办法，可以看出有什么联系
 */
 
var cat = {
    name:'';
    color:'';
}

var cat1 = {};
    cat1.name = '大毛';
    cat1.color = '黄色';    
var cat2 = {};
    cat2.name = '小毛';
    cat2.color = '黑色';
    

/*
 * 二。原始模式的改进
 * 缺点：一。2个实例之间没有内在的联系，也看不出它们源于同一个原型；
 */
 
function Cat(name,color){
    return{
        name:name;
        color:color;
    }
}

var cat1 = Cat('大毛','黄色');
var cat2 = Cat('小毛','黑色');

 
/*
 * 三。构造函数模式
 * 构造函数:就是一个普通的函数，在其内部使用 this 变量；
 *          对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上
 * constructor:实例会自动生成这个熟悉，指向它们的构造函数。
 * instanceof：js提供的运算符，验证原型对象与实例对象之间的关系
 */
 
 function Cat(name,color){
    this.name = name;
    this.color = color;
 }
 
 var cat1 = new Cat('大毛','黄色');
 var cat2 = new Cat('小毛','黑色');
 
 alert(cat1.constructor == Cat); // true
 alert(cat2.constructor == Cat); // true
 
 alert(cat1 instanceof Cat); //true
 alert(cat2 instanceof Cat); //true
 
 
/*
 * 构造函数模式的问题
 * 缺点：浪费内存 
 * 对于那些不变的属性和方法，每生成一个实例，就复制一份不变的东西,就多占用一些内存。这样既不环保，也缺乏效率。 
 */
 
 function Cat(name,color){
    this.name = name;
    this.color = color;
    this.type = '猫科动物';
    this.eat = function(){alert('吃老鼠');};
 }
 
 var cat1 = new Cat('大毛','黄色');
 var cat2 = new Cat('小毛','黑色');
 alert(cat1.type); //猫科动物
 cat1.eat(); // 吃老鼠
 alert(cat1.eat == cat2.eat); // false
 

//思考：能不能让type属性和eat()方法在内存中只生成一次，然后所有实例都指向那个内存地址. 
/*
 * Prototype 模式
 * Prototype：javascript规定，每一个构造函数都有一个prototype属性，指向另一个对象，
 *            这个对象的所以属性和方法都会被构造函数的实例继承
 *            意味着，我们可以把那些不变的属性和方法，直接定义在prototype对象上。
 * isPrototypeOf: 这个方法用来判断，某个prototype对象和某个实例之间的关系
 * hasOwmProperty：每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性
 * in:in运算符用来判断，1，某个实例是否含有某个属性，不管是不是本地属性。2.遍历某个对象的所有属性
 */
function Cat(name,color){
    this.name = name;
    this.color = color;
}
Cat.prototype.type = '猫科动物';
Cat.prototype.eat = function(){alert('吃老鼠')}

var cat1 = new Cat('大毛','黄色');
var cat2 = new Cat('小毛','黑色');
alert(cat1.type); // 猫科动物
cat1.eat; // 吃老鼠
alert(cat1.eat == cat2.eat); //true

alert(Cat.prototype.isPrototypeOf(cat1)); //true
alert(Cat.prototype.isPrototypeOf(cat2)); //true

alert(cat1.hasOwnPorperty('name')); // true
alert(cat1.hasOwnPorperty('type')); // false

alert('name' in cat1); //true
alert('type' in cat1); //true
for(var prop in cat1){alert('cat1['+ prop +']='+cat1[prop]);}



 
/*
 * 构造函数的继承
 *
 *
 */
 
/*
 * 思考：如何让猫 继承 动物呢?
 *
 *
 */
function Animal(){
    this.species = '动物';
}

function Cat(name, color){
    this.name = name;
    this.color = color;
}