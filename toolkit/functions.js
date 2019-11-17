(() => {

    const testReportTitle = "Functions";
    let ok = [];

    ////////////////////////////////////////////////////////////////////////////
    // Beispiel warum funktoinale Progammierung einfacher
    // gegenüber objektoriertierter Programmierung


    //  a = 1
    //  b = 2      objektorientierter Ansatz ist schwierig im Kopf
    //  c = b      zu behalten.
    //  b = a
    //  a = c


    // Funktonaler Ansatz
    // Expressions Ausdrücke ändern nicht den Wert -> Immutable Values
    //


    ////////////////////////////////////////////////////////////////////////////
    //
    // For each function examples - have a look at array.js
    //

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


    ////////////////////////////////////////////////////////////////////////////
    // Some Function facts
    //
    // - JS wird interpretiert und besitzt keinen Compiler
    // - Funktionen können überschrieben werden ohne Warnung
    // - Closure Funktion Funktionale Programmierung um den
    //   Namensraum eines Scopes nicht zu verschmutzen

    function fun1() {
        return 1;
    }

    ok.push(fun1() === 1);
    ok.push(fun1(42) === 1);

    // kein Kompilierungsfehler da JS kein Compiler verwendet
    ok.push(fun1(42) === 0 === false);

    function fun2() {
        return 1;
    }

    function fun2(arg) {
        return arg;
    }

    ok.push(fun2() !== 1);
    ok.push(fun2() === undefined);
    ok.push(fun2(42) === 42);

    // Erkenntnis die Funktionen von JS können überschrieben werden, es erfolgt keine Fehlermeldung

    function noReturn() {
        1;
    }

    const noReturn2 = () => {
        1;
    };
    const noReturn3 = () => 1;

    ok.push(noReturn() !== 1);
    ok.push(noReturn() === undefined);
    ok.push(noReturn2() !== 1);
    ok.push(noReturn3() === 1);
    // Erkenntnis JS, das ohne geschweifte Klammer bezieht sich es auf einen Wert und mit auf einen Funktionsblock.

    // => zeigt auf die Funktion
    // { } einen Funktionsblock besteht aus Anweisungen, der Funktionsblock hat selbst keinen Wert und ist undefined
    // somit 1 !== { 1; } und 1 === 1


    // der Name einer Funktion referenziert die Funktion
    const myfun = fun1;
    const funs = [null, undefined, fun1, fun2];

    ok.push(myfun() === 1);
    ok.push(funs[2]() === 1);

    // Funktionale Programmierung

    // Closure gekapselte Funktion bla, die Idee ist den Namensraum (Scope) von JS nicht zu verschmutzen
    // die inner funktion kann auf den scope der äusseren funktion zugreifen (waszutunist(arg)). Von aussen ist die
    // innere Funktion nicht zu sehen.
    function doit(waszutunist) {
        return function bla(arg) {
            return waszutunist(arg)
        }
    }

    ok.push(doit(fun1)(10) === 1);
    ok.push(doit(fun2)(10) === 10);

    const doit2 = callme => (arg => callme(arg));
    // oder const doit2 = callme => (arg => callme(arg)) ;

    ok.push(doit2(fun1)(10) === 1);

    const doFun2 = doit2(fun1);
    ok.push(doFun2(10) === 1);
    ok.push(doFun2() === 1);


    // Zweites Closure Function Beispiel
    const plus = x => y => x + y;

    // plus(10)(6)
    /*
        const plus = x => y => x+y;

        function plus(x) {

            // closure function
            return function bla(y) {
                return x + y;
            }
        }

     */
    ok.push(plus(10)(6) === 16);



    function Todo(text) {
        let done = false;
        const check = () => this.done = true;
        const uncheck = () => done = false;
        return {
            getText: () => text,
            isDone:  () => done,
            check:   () => check,
            check2:  () => done = true,
            uncheck:  uncheck
        }
    }

    let todo = Todo("buy mil");
    todo.check();
    ok.push(todo.isDone() === false);

    todo.check2();
    ok.push(todo.isDone());

    todo.check2();
    ok.push(todo.isDone());

    todo.uncheck();
    ok.push(todo.isDone() === false);

    report(testReportTitle, ok);
})();