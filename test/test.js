(() => {

    const testReportTitle = "Test Js - to use for temporary tests";

    let ok = []
    ok.push(true);
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
    report(testReportTitle, ok);
})();