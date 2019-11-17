const Assert = () => {
    /** @type {Array<boolean>} */
    const ok = [];
    /**
     * A function that takes two arguments of the same type, checks them for equality and pushes the
     * result onto {@link ok}. Side effect only, no return value.
     * @param {a} actual
     * @param {a} expected
     */
    const equals = (actual, expected) => {
        const result = (actual === expected);
        if (! result) {
           console.error(`not equal! actual was '${actual}' but expected '${expected}'`);
        }
        ok.push(result);
    };
    return {
        getOk: () => ok,
        equals: equals,
    }
};

////////////////////////////////////////////////////
// Execute around method -> Java template method...
//
// - Besonderheit -> bestehende Tests müssen nicht angepasst werden...

/**
 * providing a scope and name for a test callback that takes a value of type {@link Assert}
 * and side-effects the assert to capture the test results.
 * Then it creates the report for this assert.
 * @param {string} origin, the name to be reported as the origin of the reported tests
 * @param {function(Assert): *} callback
 */
const test = (origin, callback) => {
    const assert = Assert();          //    das ok anlegen
    callback(assert);                 //    das ok befüllen
    report(origin, assert.getOk());   //    report mit name und ok aufrufen
};

function report(module, ok) {
    let passed = ok.filter(x => x === true).length;
    let marked = "";
    let button = "";
    if (passed < ok.length) {
        marked = "w3-flat-sun-flower";
        button = `<a href="" class="w3-button w3-right w3-flat-midnight-blue">Show</a>`;
    }

    //ok.filter(x => x === false).every(console.error);

    document.writeln(`
       <div class="w3-panel w3-card ${marked}">
          <p> ${passed} / ${ok.length} passed - ${module} ${button}</p>
       </div>
    `);

}
