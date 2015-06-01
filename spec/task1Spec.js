if(typeof require !== "undefined") {
	var task1 = require('../src/task1/task1');
	var Man = task1.Man;
	var Student1 = task1.Student1;
	var Student2 = task1.Student2;
	var duckType1 = task1.duckType1;
	var duckType2 = task1.duckType2;
}
describe("Task 1 - Javascript introduction", function() {
	it("Creates Man correctly", function() {
		var m = new Man("Adam", 25);

			expect(m.name).toEqual("Adam");
			expect(m.age).toEqual(25);
			expect(m.live()).toEqual("Nope, goodbye, cruel world.");
			expect(m.study).toEqual(undefined);
	});

	it("Creates Student correctly", function() {
		var s1 = new Student1("Mike", 18);

			expect(s1.name).toEqual("Mike");
			expect(s1.age).toEqual(18);
			expect(s1.live()).toEqual("Nope, goodbye, cruel world.");
			expect(s1.study()).toEqual("Nope.");

		var s2 = new Student2("Mike", 18);

			expect(s2.name).toEqual("Mike");
			expect(s2.age).toEqual(18);
			expect(s2.live()).toEqual("Nope, goodbye, cruel world.");
			expect(s2.study()).toEqual("Nope.");
	});

	it("Determines person type with duckType1 correctly", function() {
		var h  = new Man("John", 5);
		var s1 = new Student1("Mike", 18);
		var s2 = new Student2("Adam", 20);
		var e  = { name: "Sorry, I'm not a human" };
			expect(duckType1(h)).toEqual("Man");
			expect(duckType1(s1)).toEqual("Student");
			expect(duckType1(s2)).toEqual("Student");
			expect(duckType1(e)).toEqual("ERROR!");
	});

	it("Determines person type with duckType2 correctly", function() {
		var h  = new Man("John", 5);
		var s1 = new Student1("Mike", 18);
		var s2 = new Student2("Adam", 20);
		var e  = { name: "Sorry, I'm not a human" };
			expect(duckType2.call(h)).toEqual("Man");
			expect(duckType2.call(s1)).toEqual("Student");
			expect(duckType2.call(s2)).toEqual("Student");
			expect(duckType2.call(e)).toEqual("ERROR!");
	});
});
