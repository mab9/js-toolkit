(() => {

    const testReportTitle = "Solutions - homework stuff";


    let ok = [];
    // 14a array equivalence
    Array.prototype.eq = function (second) {
        const first = this;
        if (first.length !== second.length) {
            return false;
        }
        return !first.some((it, index) => second[index] !== it);
    };

    ok.push(![1, 15, 39].eq([1, 15, 39, 4]));
    ok.push([1, 15, 39, 4].eq([1, 15, 39, 4]));
    ok.push(![1, 15, 39, 4].eq([1, 15, 39, 5]));

    // 15 es 6 classes
    // 16 prototypes and inhertiance
    // 16a function composition

    const inc = x => x + 1;
    const double = x => x * 2;

    Function.prototype.then = function (fnc) {
        return (v) => fnc(this(v));
    };
    ok.push(inc.then(double)(2) === 6);



    // 17 object encoding without classes, this, or new
    // 18a failsafe callback
    const failSafe = defaultVal => callback => arg => {
        try {
            //        console.info("default val: " + defaultVal);
            return callback(arg);
        } catch (e) {
            return defaultVal;
        }
    };
    const doError = x => {
        throw new Error()
    };
    let errorCount = failSafe(1)(doError);

    ok.push(failSafe(false)(x => x)(true));
    ok.push(failSafe(true)(doError)(null));
    ok.push(errorCount(null) === 1);

    ok.push(failSafe(false)(x => x)(true) && failSafe(true)(doError)(null));
    report(testReportTitle, ok);
})();