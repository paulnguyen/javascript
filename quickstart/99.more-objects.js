
// === OBJECTS ===

obj1 = new Object() ;
obj2 = {} ; // literal notation
obj3 = {p1 : "a", p2 : "b" } ; // dsl for object construction

json = { "p1" : "a", "p2" : "b" } ;   // property names also need to be quoted.
                                      // standard is double-quoted strings ""
                                      // but, some JS engines also support single

json["p1"] ; // "a"
json.p1 ; // "a"
json.length ; // undefined
Object.keys(json) ; // [ 'p1', 'p2' ]
Object.keys(json).length ; // 2

// === OBJECTS ON-THE-FLY CONSTRUCTION ===

car = {} ;
car.make="ford";
car.model="mustang" ;
car.year = 1969 ;

// === OBJECT PROPS & PROP ARRAY ===

car.make ;
car["make"] ;

function show( obj )
{ var output = "" ;
  for (var prop in obj)
    output += prop + " = " + obj[prop] + " | " ;
  return output ;
} ;

show(car) ;


// === OBJECT CONSTRUCTION SYNTAX ===
//
// * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics

var person = {
  name: ['Bob', 'Smith'],
  age: 32,
  gender: 'male',
  interests: ['music', 'skiing'],
  bio: function() {
    console.log(
    	this.name[0] + ' ' + 
    	this.name[1] + ' is ' + 
    	this.age + ' years old. He likes ' + 
    	this.interests[0] + ' and ' + 
    	this.interests[1] + '.');
  },
  greeting: function() {
    console.log('Hi! I\'m ' + this.name[0] + '.');
  }
};

person ;
String( person.bio )
JSON.stringify(person) 

person.name
person.name[0]
person.age
person.interests[1]
person.bio()
person.greeting()


// === OBJECT CONSTRUCTION WITH FUNCTION ===
//
// * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
// * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

function createNewPerson(name) {
  var obj = {};
  obj.name = name;
  obj.greeting = function() {
    console.log('Hi! I\'m ' + obj.name + '.');
  };
  return obj;
}

var salva = createNewPerson('Salva')
salva.name
salva.greeting()

// Alternatively, like a Class

function Person(name) {
  this.name = name;
  this.greeting = function() {
    console.log('Hi! I\'m ' + this.name + '.');
  };
}

var bob = new Person('Bob')
var sarah = new Person('Sarah')

// A more Complete example:

function Person(first, last, age, gender, interests) {
  this.name = {
     first : first,
     last : last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = function() {
    console.log(	this.name.first + ' ' + 
    		this.name.last + ' is ' + 
    		this.age + ' years old. He likes ' + 
    		this.interests[0] + ' and ' + 
    		this.interests[1] + '.');
  };
  this.greeting = function() {
    console.log('Hi! I\'m ' + this.name.first + '.');
  };
}

var bob = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);


// === OTHER WAYS TO CREATE OBJECTS ===

// Using Object() constructor

var person = new Object() ;
person.name = 'Chris';
person['age'] = 38;
person.greeting = function() {
  console.log('Hi! I\'m ' + this.name + '.');
};

var person = new Object( 
  {
  	name: 'Chris',
  	age: 38,
  	greeting: function() {
    	console.log('Hi! I\'m ' + this.name + '.');
  	}
  }
);


// Using the create() method

var clone = Object.create(person) ;
clone
show(clone)
clone.name
clone.greeting()


// === PROTOTYPE OBJECTS ===
//
// * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
//
// JavaScript is often described as a prototype-based language — to provide
// inheritance, objects can have a prototype object, which acts as a template
// object that it inherits methods and properties from. An object's prototype
// object may also have a prototype object, which it inherits methods and
// properties from, and so on. This is often referred to as a prototype chain,
// and explains why different objects have properties and methods defined on
// other objects available to them


function Person(first, last, age, gender, interests) {
  this.name = {
     first : first,
     last : last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = function() {
    console.log(	this.name.first + ' ' + 
    		this.name.last + ' is ' + 
    		this.age + ' years old. He likes ' + 
    		this.interests[0] + ' and ' + 
    		this.interests[1] + '.');
  };
  this.greeting = function() {
    console.log('Hi! I\'m ' + this.name.first + '.');
  };
}

var bob = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);

bob.valueOf() 		// method in Object prototype
Person.prototype 	// By default, a constructor's prototype always starts empty. 
console.dir(bob, { depth: 4 })

/**

	bob1.__proto__
	bob1.__proto__.__proto__
	bob.__proto__ 

**/

// Modifying prototypes

Person.prototype.farewell = function() {
  console.log (
  	this.name.first + ' has left the building. Bye for now!'
  );
};

bob.farewell()
bob1.farewell()


var bob1 = Object.create(bob) ;
var bob2 = Object.create(bob) ;

bob1.hello = function() { console.log( "Hello!") }
bob1.hello()
bob2.hello()
bob.hello()

bob.chao = function() { console.log( "Chao!") }
bob1.chao()
bob2.chao()

Person.prototype.ddr = function() { console.log( "Dance Dance! " + this.dance ) }
bob.dance = "The Floss!"
bob.ddr()
bob1.ddr()
bob2.ddr()

/*
	> Person.prototype
	Person { farewell: [Function] }

	> bob.__proto__
	Person { farewell: [Function] }

	> bob
	Person {
	  name: { first: 'Bob', last: 'Smith' },
	  age: 32,
	  gender: 'male',
	  interests: [ 'music', 'skiing' ],
	  bio: [Function],
	  greeting: [Function] }
	> 

	> bob1.__proto__
	Person {
	  name: { first: 'Bob', last: 'Smith' },
	  age: 32,
	  gender: 'male',
	  interests: [ 'music', 'skiing' ],
	  bio: [Function],
	  greeting: [Function] }

*/


// === INHERITANCE IN JAVASCRIPT ===
//
// * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
// * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
// * https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes
//
// Also See:
//
// * http://dmitrysoshnikov.com/ecmascript/javascript-the-core-2nd-edition
// * https://kenneth-kin-lum.blogspot.com/2012/10/javascripts-pseudo-classical.html

// Prototypal inheritance

// With most of the gory details of OOJS now explained, this article shows how
// to create "child" object classes (constructors) that inherit features from
// their "parent" classes. In addition, we present some advice on when and
// where you might use OOJS, and look at how classes are dealt with in modern
// ECMAScript syntax.

// So far we have seen some inheritance in action — we have seen how prototype
// chains work, and how members are inherited going up a chain. But mostly
// this has involved built-in browser functions. How do we create an object in
// JavaScript that inherits from another object?


// Only the properties inside the constructor:

function Person(first, last, age, gender, interests) {
  this.name = {
    first,
    last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
} ;

// The methods are all defined on the constructor's prototype. 

Person.prototype.greeting = function() {
  console.log('Hi! I\'m ' + this.name.first + '.');
} ;

Person.prototype.bio = function() {
    console.log(  this.name.first + ' ' + 
        this.name.last + ' is ' + 
        this.age + ' years old. He likes ' + 
        this.interests[0] + ' and ' + 
        this.interests[1] + '.');
} ;

Person.prototype.farewell = function() {
  console.log (
    this.name.first + ' has left the building. Bye for now!'
  );
} ;


// Teacher inherits from Person

function Teacher(first, last, age, gender, interests, subject) {

  // call a function defined somewhere else, but in the current context. The
  // first parameter specifies the value of this that you want to use when
  // running the function, and the other parameters are those that should be
  // passed to the function when it is invoked.
  Person.call(this, first, last, age, gender, interests);

  // defines the new subject property that teachers are going to have, which
  // generic people don't have.
  this.subject = subject;

}

Object.getOwnPropertyNames(Teacher.prototype)
Object.getOwnPropertyNames(Person.prototype)

var student = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
var teacher = new Teacher('Bob', 'Smith', 32, 'male', ['music', 'skiing'], 'Math');

student.greeting()
teacher.greeting()


// Setting Teacher()'s prototype and constructor reference

Teacher.prototype = Object.create(Person.prototype) ;

student.greeting()
teacher.greeting()

Teacher.prototype.constructor

Object.defineProperty(Teacher.prototype, 'constructor', { 
    value: Teacher, 
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });

Teacher.prototype.constructor


// Giving Teacher() a new greeting() function

Teacher.prototype.greeting = function() {
  var prefix;

  if (this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
    prefix = 'Mr.';
  } else if (this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
    prefix = 'Mrs.';
  } else {
    prefix = 'Mx.';
  }

  console.log('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};


var teacher1 = new Teacher('Dave', 'Griffiths', 31, 'male', ['football', 'cookery'], 'mathematics');

teacher1.name.first;
teacher1.interests[0];
teacher1.bio();
teacher1.subject;
teacher1.greeting();
teacher1.farewell();



// === ECMAScript 2015 Classes ===
//
// ECMAScript 2015 introduces class syntax to JavaScript as a way to write
// reusable classes using easier, cleaner syntax, which is more similar to
// classes in C++ or Java. In this section we'll convert the Person and
// Teacher examples from prototypal inheritance to classes, to show you how
// it's done.


class Person {
  constructor(first, last, age, gender, interests) {
    this.name = {
      first,
      last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }

  greeting() {
    console.log(`Hi! I'm ${this.name.first}`);
  };

  farewell() {
    console.log(`${this.name.first} has left the building. Bye for now!`);
  };
}

let han = new Person('Han', 'Solo', 25, 'male', ['Smuggling']);
han.greeting();

let leia = new Person('Leia', 'Organa', 19, 'female', ['Government']);
leia.farewell();


class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject, grade) {
    super(first, last, age, gender, interests);

    // subject and grade are specific to Teacher
    this.subject = subject;
    this.grade = grade;
  }

  greeting() {
    var prefix;
    if (this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
      prefix = 'Mr.';
    } else if (this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
      prefix = 'Mrs.';
    } else {
      prefix = 'Mx.';
    }    
    console.log('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
  };

}

let snape = new Teacher('Severus', 'Snape', 58, 'male', ['Potions'], 'Dark arts', 5);
snape.greeting(); // Hi! I'm Severus.
snape.farewell(); // Severus has left the building. Bye for now.
snape.age // 58
snape.subject; // Dark arts










