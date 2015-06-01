function Man (name, age) {
	this.live = function () {
		return "Nope, goodbye, cruel world.";
	};
	this.name = name;
	this.age = age;
}

function Student1 (name, age) {
	Man.call(this, name, age);
	this.study = function () {
		return "Nope.";
	};
}

Student1.prototype.__proto__ = Man.prototype;

function Student2 (name, age) {
	Man.call(this, name, age);
	this.study = function () {
		return "Nope.";
	};
}

Student2.prototype = Object.create(Man.prototype);

function duckType1 (person) {
	if (person.name==undefined) return "ERROR!";
	if (person.age==undefined) return "ERROR!";
	if (person.live==undefined) return "ERROR!";
	if (person.study==undefined) return "Man"; else return "Student";
}

function duckType2 () {
	if (this.name==undefined) return "ERROR!";
	if (this.age==undefined) return "ERROR!";
	if (this.live==undefined) return "ERROR!";
	if (this.study==undefined) return "Man"; else return "Student";
}

module.exports.Man = Man;
module.exports.Student1 = Student1;
module.exports.Student2 = Student2;
module.exports.duckType1 = duckType1;
module.exports.duckType2 = duckType2;