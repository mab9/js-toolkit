(() => {

    const testReportTitle = "This context";
    let ok = [];


    ////////////////////////////////////////////////////////////////////////////
    //
    // this bezieht sich auf: das was vor getName() steht.
    // good.getName -> this === good
    // getName als funktion in einer variable -> this === global
    //


    firstname = 'global'; //
    lastname = 'boy';

    const good = {
        firstname: "Good",
        lastname: "Boy",
        getName: function () {
            return this.firstname + " " + this.lastname
        }
    };

    ok.push(good.getName() === "Good Boy");

    let retrieveName = good.getName;
    ok.push(retrieveName() === "global boy");

    //////////////////////
    // remember: calling a function retains the scope

    function Person(first, last) {
        this.firstname = first;
        this.lastname = last;
        this.getName = function () {
            return this.firstname + " " + this.lastname
        };
        return this;
    }

    const good2 = Person("Good", "Boy");      // "accidentally" forgot the "new"
    ok.push(good2.getName() === "Good Boy");

    const other = Person("Other", "Boy");
    ok.push(other.getName() === "Other Boy");
    ok.push(good2.getName() === "Other Boy"); // OOPS! We have accidentally overwritten the good boy.

    report(testReportTitle, ok);
})();