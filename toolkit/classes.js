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
    ok.push(student instanceof PersonClass);
    ok.push(student.grade === 5.5);


    report(testReportTitle, ok);
})
();