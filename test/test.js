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


    /*
       // 15 es 6 classes
    // 16 prototypes and inhertiance
    // 16a function composition

    /*
        // 1. add protoype then
    // 2. execute function
    // 3. return passed function


       A key to function composition is having functions that are composable.
       A composable function should have 1 input argument and 1 output value.

       https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983


    const g = n => n + 1;
    const f = n => n * 2;
    const h = x => f(g(x));
    ok.push(h(20) === 42);

    // other way -> composes only 2 functions at a time
    const compose = (f, g) => x => f(g(x));
    ok.push(compose(f, g)(20) === 42);

    // way to compose as many functions as the memory is funny
    const compose2 = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
    ok.push(compose2(f, f, g, g)(20) === 88); // 1. g, 2. g, 3. f, 4. f
    //const compose3 = (...fns) => x => fns.reduce((v, f) => f(v), x);


    const inc = x => x + 1;
    const double = x => x * 2;

    Function.prototype.then = (fnc) => {
        return compose2(this, fnc);
    };

    //const h = x => f(g(x));
    //
    // inc.then(double)(1);
    console.info("compose");
    console.info(inc.then(double)(2));
    //console.info(inc.then(double)(2));

    // inc.then(double).then(double)(1) === 8
    // double(double(inc(1)))
     */

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
    const doError = x => { throw new Error() };
    let errorCount = failSafe(2)(null);
    //let errorCount = failSafe(2)(x => 3*x);

    ok.push(failSafe(false)(x => x)(true));
    ok.push(failSafe(true)(doError)(null));
    ok.push(1 === failSafe(1)(doError)(null));
    ok.push(2 === errorCount(2));

    report(testReportTitle, ok);
})();