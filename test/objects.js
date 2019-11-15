(() => {

    const testReportTitle = "Objects ";

    ////////////////////////////////////////////////////////////////////////////
    //
    // 3 verschiedene Arten
    // - Offen, dynamisch
    // - Geschlossen, explizit
    // - Mixed, typ-behaftet


    // Offen, dynamisch
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

    // Geschlossen, explizit
    // - closure scope, no "this"
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


    // Mixed, typ-behaftet
    // - enforces "new"
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



    report(testReportTitle, ok);
})
();