(() => {

    const testReportTitle = "Test Js - to use for temporary tests";

    let ok = [];
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



    // 15 es 6 classes
    // 16 prototypes and inhertiance
    // 16a function composition


    // 1. add protoype then
    // 2. execute function
    // 3. return passed function
    /*

       A key to function composition is having functions that are composable.
       A composable function should have 1 input argument and 1 output value.

       https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
    */

    const g = n => n + 1;
    const f = n => n * 2;
    const h = x => f(g(x));
    ok.push(h(20) === 42);

    // composes only 2 functions at a time
    const composeTwo = (f, g) => x => f(g(x));
    ok.push(composeTwo(f, g)(20) === 42);


    // way to compose as many functions as the memory is funny
    const composeAll = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

    const inc = x => x + 1;
    const double = x => x * 2;
/*
    https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
*/
    Function.prototype.then = function(fnc) {
        return (v) => fnc(this(v));
        // return composeAll(this, fnc)
        // return fnc.reduceRight((y, f) => f(y), x);
        //return composeAll.bind(this)(this, fnc);
    };

    console.info("compose");
    ok.push(composeAll(double, double)(2) === 8);
    ok.push(composeAll(inc, double, double)(2) === 9);
    ok.push(inc.then(double)(2) === 6);
//    ok.push(inc.then(double).then(double)(2) === 36);

    // 17 object encoding without classes, this, or new
    report(testReportTitle, ok);
})();