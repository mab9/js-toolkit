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
    // 17 object encoding without classes, this, or new
    // 18a failsafe callback
    report(testReportTitle, ok);
})();