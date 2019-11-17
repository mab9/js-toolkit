// requires /toolkit/utils/test.js

test("Classes", assert => {

    ////////////////////////////////////////////////////////////////////////////
    //
    // Schlüsselworte class, extends
    // "Schein-Vererbung" über Prototypen


    // Objects 3 verschiedene Arten
    //
    // - JS objects      -> veränderbar, keine instanceof
    // - Closure Scope   -> unveränderbar, keine instanceof
    // - New             -> veränderbar, mit instanceo


    // class
    //
    // - Syntactic sugar für die Variante 3 - (mixed, typ-behaftet) (New)
    // - Seit ES6

    class PersonClass {
        constructor(first, last) {
            this.firstname = first;
            this.lastname = last
        }

        getName() {
            return this.firstname + " " + this.lastname
        }

        isCool() {
            return this.firstname;
        }
    }

    const PersonObject = (() => { // lexical scope
        function Person2(first, last) { // ctor, binding
            this.firstname = first;
            this.lastname = last;
        }

        Person2.prototype.getName = function () {
            return this.firstname + " " + this.lastname;
        };
        return Person2;
    })(); // IIFE

    let personClass = new PersonClass("Class", "Object");
    let personObject = new PersonObject("Object", "Object");

    assert.equals(true, personClass instanceof PersonClass);
    assert.equals(true, personObject instanceof PersonObject);

    assert.equals("Class", personClass.isCool());
    // let isCool = personClass.isCool;
    // ok.push(isCool() === "Class");       // "this" is undefined

    let worker = new PersonClass("Best", "Worker");
    worker.lastname = "All Time Worker";
    assert.equals("Best All Time Worker", worker.getName());

    PersonClass.prototype.isCool = () => true;
    // worker.prototype.isCool = () => false;    // prototype is undefined!
    assert.equals(true, worker.isCool());
    assert.equals(true, personClass.isCool());




    // extend
    //
    // - Syntactic sugar für den Aufbau der prototype chain
    // - Seit ES6

    class Student extends PersonClass {
        constructor(first, last, grade) {
            super(first, last);               // <---- pass args to super class
            this.grade = grade;
        }
    }

    const student = new Student("Top", "Student", 5.5);
    assert.equals(true, student instanceof Student);
    assert.equals(true, student instanceof PersonClass);
    assert.equals(5.5, student.grade);


    const prof = { };
    Object.setPrototypeOf(prof, PersonClass.prototype);
    assert.equals(true, prof instanceof PersonClass);

    Object.setPrototypeOf(prof, PersonClass);
    assert.equals(false, prof instanceof PersonClass);

    Object.setPrototypeOf(Student.prototype, PersonClass.prototype);
    assert.equals(true, student instanceof Student);
    assert.equals(true, student instanceof PersonClass);

});