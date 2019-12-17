(() => {

    const testReportTitle = "Scripting";
    let ok = [];


    ////////////////////////////////////////////////////////////////////////////
    // SCRIPTING

    let id = x => x;
    ok.push(id(1) === 1);

    let formula = 'employee.revenue * 0.2';
    const form = Function('employee', 'return ' + formula);
    const bonusCalculation = empl => empl.bonus = form(empl);

    const e = {revenue: 10000, bonus: null};
    bonusCalculation(e);

    ok.push(Function('x', 'return x*x')(4) === 16);
    ok.push(e.bonus === e.revenue * 0.2);
    ok.push(e.revenue === 10000);
    ok.push(e.bonus === 2000);

    report(testReportTitle, ok);
})();