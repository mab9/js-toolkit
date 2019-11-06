(() => {

    const testReportTitle = "Test Js - to use for temporary tests";

////////////////////////////////////////////////////////////////////////////
//
//
//


    let ok = [];
    let num1 = Number("25");
    let num2 = Number("26");
    let num3 = Number("27");

    let nums = [];
    nums.push(num1);
    nums.push(num2);
    nums.push(num3);

    nums.forEach((num, index) => {
        ok.push(num === (25 + index));
    });


    /*function Empty() {

    }
    const empty = new Empty();
    Empty.prototype.answer = 42;
    ok.push(empty.answer === 42);


    const Empty = (() => {
        function Empty() {        }
        return Empty;
    }) ();

    const empty = new Empty;
    ok.push(empty instanceof Empty);
    console.info(empty);



    const Empty = (() => {
        function Empty() {        }
        return Empty;
    }) ();

    const empty = new Empty;
    const also = new Empty;

    Empty.prototype.answer = 42;
    ok.push(empty.answer === 42 && also.answer === 42);
    console.info(empty);


    const Empty = (() => {
        function Empty() {        }
        return Empty;
    }) ();

    const empty = new Empty;

    Empty.prototype.answer = 42;
    ok.push(empty.answer === 42 && also.answer === 42);
    console.info(empty);
*/


    const Person = name => {
        let age = 0;
        return {
            getAge: () => age,
            setAge: newAge => age = newAge,
            getName: () => name,
            setName: newName => name = newName

        }
    };

    const me = Person("mab");
    //me.age = 27;
    //me.name = "****";
    me.setAge(50);
    //ok.push(me.getName() === "****");
    me.setName("Sherlok");
    ok.push(me.getAge() === 50);

    ok.push(me.getName() === "Sherlok");


    ok.push(true);
    // ok.push(false);
    /*
        const failSafe = x => y => z => {
            if (y(z)) {
                ;
            } else {
                return x;
            }
        };

        const doError = x => {
            throw new Error()
        };
        const errorCount = failSafe(1)(doError);

        ok.push(failSafe(false)(x => x)(true) && failSafe(true)(doError)(null) && errorCount(null) === 1); */


    //ok.push(false);


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

    // other way -> composes only 2 functions at a time
    const compose = (f, g) => x => f(g(x));
    ok.push(compose(f,g)(20) === 42);

    // way to compose as many functions as the memory is funny
    const compose2 = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
    ok.push(compose2(f,f,g,g)(20) === 88); // 1. g, 2. g, 3. f, 4. f

    Function.prototype.then = (fnc) => {
        console.info("then was invoked");
        console.info(this);
        return fnc;
    };

    let mabs = x => console.info("this is mabs: " + x);

    //const h = x => f(g(x));
    mabs.then(f)(20);


    // 17 object encoding without classes, this, or new
    // 18a failsafe callback
    report(testReportTitle, ok);
})();