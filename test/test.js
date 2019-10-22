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

    report(testReportTitle, ok);
})();