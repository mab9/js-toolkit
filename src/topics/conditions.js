// requires /toolkit/utils/test.js

test("Conditions - && and ||", assert => {

    ////////////////////////////////////////////////////////////////////////////
    //
    // Write better code with && and ||
    //

    let a;
    assert.equals(a, undefined);

    let first = 3;
    let second = "asd";
    assert.equals(second && first, first);    // same as lambda kalkül
    assert.equals(second && first, first);

    let something = false; // function that evals to false
    let whatever = something || "default";
    assert.equals(whatever, "default");

    // pay attention -> does work for all values but
    // 6 that evaluates to false -> (false, 0, undefined, "", naN, )


    const salaryCheck = y => y > 100000
        ? "Wow not so bad salary"
        : "Salary is not so good";

    assert.equals(salaryCheck(105000), "Wow not so bad salary");
    assert.equals(salaryCheck(50000), "Salary is not so good");


    assert.equals(5 > 0 ? true : false, true);
});