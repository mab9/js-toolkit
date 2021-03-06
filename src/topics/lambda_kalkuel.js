(() => {

    const testReportTitle = "Lambda Kalkuel";
    let ok = [];

    /////////////////////////////////////////////////////////////////////////   ///
    // Lambda Kalkuel mit Tests
    // - Alpha = Parameter umbenennen
    // - Beta = Argumente einsetzen
    // - Eta = Parameter kürzen



    // Alpha Translation
    const id1 = x => x;   // function id3(x) {return x;}
    const id2 = y => y;
    ok.push(id1(5) === id2(5));




    // Beta Reduktion TODO add example
    const red1 = f => x => f(x); // red(id1)(1);
    const red2 = x => id1(x);    // 1. Beta Reduktion
    const red3 = id1;            // 2. Beta Reduktion
    const red4 = x => x;         // 3. Beta Reduktion
    const red5 = 1;              // 4. Beta Reduktion

    ok.push(red1(id1)(1) === 1);
    ok.push(red2(1) === 1);
    ok.push(red3(1) === 1);
    ok.push(red4(1) === 1);
    ok.push(red5 === 1);




    // Eta Reduktion
    const plus = x => y => x + y;
    //const foo = x => y => plus(x)(y); // 1. Eta reduktion
    //const foo = x =>      plus(x)   ; // 2. Eta reduktion
    const foo = plus; // 3. Eta reduktion

    ok.push(plus(2)(3) === 5);
    ok.push(foo(2)(3) === 5);
    ok.push(plus(2)(3) === foo(2)(3));


    // Es folgen die atomaren Funktionen
    const id = x => x;        // function id3(x) {return x;}
    const fst = x => y => x;  // gebe das erste Argument retour

    const snd = fst(id);      //
    ok.push(fst(3)(4) === 3);
    ok.push(fst(id)(3)(4) === 4);  // gibt er den ersten Param aus oder den zweiten?
    ok.push(snd(3)(4) === 4);      // kleiner Trick -> damit er den zweiten ausgeben kann.

    report(testReportTitle, ok);
})();