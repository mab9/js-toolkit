// requires /toolkit/utils/test.js

test("Enforced error handling with lambda kalkül ", assert => {

    ////////////////////////////////////////////////////////////////////////////
    //
    // Enforce error handling mit Lambda Kalkül
    // Used so that the error handling will never be forgotten again!

    // Either
    const Left = x => f => g => f(x);
    const Right = x => f => g => g(x);
    const either = e => f => g => e(f)(g);   // enforces 3 arguments to behave correct


    // Example function
    const safeDiv = num => divisor =>
        divisor === 0                         // hier die Funktion / Check
            ? Left("schlecht!")            // flow left and right
            : Right(num / divisor);

    /*
        either(safeDiv(1)(1))
        (console.error)
        (x => console.log(x));

        either(safeDiv(1)(0))
        (console.error)
        (x => console.log(x));

     */

    let result;  // only used to avoid unnecessary logs on the console

    either(safeDiv(1)(1))
    (console.error)
    (x => result = x);
    assert.equals(result, 1);

    either(safeDiv(1)(0))
    (error => result = error)
    (x => console.log(x));
    assert.equals(result, "schlecht!");



    const eShow = e => e(x => console.error("Cannot divide by 0"))(x => console.log("Result is: " + x));
    eShow(safeDiv(1)(1));
    eShow(safeDiv(1)(0));
});


