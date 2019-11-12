(() => {

    const testReportTitle = "Execute Around Method";
    let ok = [];

    // Design pattern also called template method in other languages

    function test(name, callback) {
        const assert = Assert();            // prework
        callback(assert);                   // callback
        report(name, assert.getOk());       // postwork
    }

    report(testReportTitle, ok);
})();