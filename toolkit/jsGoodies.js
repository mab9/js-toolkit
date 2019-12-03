// requires /toolkit/utils/test.js

test("JS goodies - && and || evaluations", assert => {

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
});