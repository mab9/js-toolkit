(() => {

    const testReportTitle = "Objects ";
    let ok = [];
    ////////////////////////////////////////////////////////////////////////////
    //
    // 3 verschiedene Arten
    // - JS objects      -> veränderbar, keine instanceof
    // - Closure Scope   -> unveränderbar, keine instanceof
    // - New             -> veränderbar, mit instanceof
    //
    // - Prototype
    //   - Klassifiziert Objekte ähnlich wie ein Typ
    //   - Verwaltet gemeinsame Eigenschaften
    //   - Ist selbst ein Objekt
    //   - Ermittelbar, z.B. mit instanceof
    // - New
    //   - Erzeugt neuen Runtime-Scope
    //   - Ruft die Konstruktor-Funktion auf
    //   - (kein lambda)
    //   - Setzt den Prototyp


    // JS objects - Offen, dynamisch
    //
    // - no safety but super dynamic
    // - unobvious how to share structure
    // - beware of "this"!

    const good = {
        firstname: "Good",
        lastname: "Boy",
        getName: function () {
            return this.firstname + " " + this.lastname
        }
    };

    ok.push(good.getName() === good.firstname + " " + good.lastname);
    good.firstname = "Bad";
    ok.push(good.getName() === good.firstname + " " + good.lastname);
    ok.push(good.getName() === "Bad" + " " + good.lastname);

    // global scope
    let gFirstname = firstname;
    let gLastname = lastname;

    let name = good.getName;
    ok.push(name() === gFirstname + " " + gLastname);

    name = good.getName();
    ok.push(name === "Bad" + " " + good.lastname);

    // good is an jS Object..
    ok.push(good instanceof Object);





    // closure scope - Geschlossen, explizit, no "this"
    //
    // - best safety, easy to share structure
    // - but no "type"

    function Person(first, last) {
        let firstname = first; // optional
        let lastname = last;
        return {
            getName: function () {
                return firstname + " " + lastname
            }
        }
    }

    let lad = Person("lad", "sut");
    ok.push(lad.getName() === "lad sut");

    // no instance of!
    ok.push(lad instanceof Person === false);
    ok.push(lad.prototype === undefined);

    // no direct access
    //  lad.firstname = "..";   does not exists!





    // New - Mixed, typ-behaftet - enforces "new"
    //
    // - new Person2("Good", "Boy") instanceof Person
    // - alle Instanzen können über den Prototyp
    //   gleichzeitig geändert werden!

    const Person2 = (() => { // lexical scope
        function Person2(first, last) { // ctor, binding
            this.firstname = first;
            this.lastname = last;
        }

        Person2.prototype.getName = function () {
            return this.firstname + " " + this.lastname;
        };
        return Person2;
    })(); // IIFE

    let mab = Person2("mab", "bru");
    ok.push(mab === undefined);

    mab = new Person2("mab", "bru");
    ok.push(mab.getName() === "mab bru");
    ok.push(mab instanceof Person2);

    lad = new Person2("lad", "sut");
    ok.push(lad.getName() === "lad sut");
    ok.push(lad instanceof Person2);

    // direct access on attributes
    ok.push(mab.firstname === "mab");
    mab.firstname = "mab2";         // <--- direct access
    ok.push(mab.getName() === "mab2 bru");
    mab.firstname = "mab"; // rollback

    // update function for all instances
    Person2.prototype.getName = function() {
        return this.firstname + " gniesser";
    };

    ok.push(mab.getName() === "mab gniesser");
    ok.push(lad.getName() === "lad gniesser");

    report(testReportTitle, ok);
})
();