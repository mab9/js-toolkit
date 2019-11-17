(() => {

    const testReportTitle = "Classes ";
    let ok = [];
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

    ok.push(personClass instanceof PersonClass);
    ok.push(personObject instanceof PersonObject);


    ok.push(personClass.isCool() === "Class");
    // let isCool = personClass.isCool;
    // ok.push(isCool() === "Class");       // "this" is undefined

    let worker = new PersonClass("Best", "Worker");
    worker.lastname = "All Time Worker";
    ok.push(worker.getName() === "Best All Time Worker");

    PersonClass.prototype.isCool = () => true;
    // worker.prototype.isCool = () => false;    // prototype is undefined!
    ok.push(worker.isCool());
    ok.push(personClass.isCool());




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
    ok.push(student instanceof Student);
    ok.push(student instanceof PersonClass);
    ok.push(student.grade === 5.5);


    const prof = { };
    Object.setPrototypeOf(prof, PersonClass.prototype);
    ok.push(prof instanceof PersonClass);

    Object.setPrototypeOf(prof, PersonClass);
    ok.push(prof instanceof PersonClass === false);

    Object.setPrototypeOf(Student.prototype, PersonClass.prototype);
    ok.push(student instanceof Student);
    ok.push(student instanceof PersonClass);



    report(testReportTitle, ok);
})();