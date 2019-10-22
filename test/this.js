(() => {

    const testReportTitle = "This context";

////////////////////////////////////////////////////////////////////////////
//
// this bezieht sich auf: das was vor getName() steht.
// good.getName -> this === good
// getName als funktion in einer variable -> this === global
//

    let ok = [];

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

    printTestReport(testReportTitle, ok);
})();