(() => {

    const testReportTitle = "Test Js - to use for temporary tests";

    let ok = [];
    ok.push(true);
    //ok.push(false);


    // Async Await

    ///////////////////////////////////////////////////
    // shows '1' ? yes

    const idPromise1 = x => new Promise(res => res(x));
    const failPromise1 = err => new Promise((res, rej) => rej(err));

    const foo1 = async i => {
        let x = await idPromise1(i);
        console.info("await 1: " + x);
    };
    foo1(1);



    ///////////////////////////////////////////////////
    // shows '1 2 3' ? true

    const idPromise2 = x => new Promise(res => res(x));
    const failPromise2 = err => new Promise((res, rej) => rej(err));

    const writer2 = x => {
        console.info("writer 2 " + x);
        return idPromise2(x);
    };

    const inc2 = n => idPromise2(n + 1);

    const foo2 = async i => {
        let x = await idPromise2(i);
        while (x < 4) {
            x = await writer2(x);
            x = await inc2(x);
        }
    };

    foo2(1);



    ///////////////////////////////////////////////////
    // shows '2' ? false

    const idPromise3 = x => new Promise(res => res(x));
    const failPromise3 = err => new Promise((res, rej) => rej(err));

    const writer3 = x => {
        console.info("writer 3 " + x);
        return idPromise3(x);
    };

    const inc3 = n => idPromise3(n + 1);
    const filterEven3  = n => n % 2 === 0 ? idPromise3(n) : failPromise3("not even");

    const foo3 = async i => {
        let x = await idPromise3(i);
        while (x < 4) {
            x = await filterEven3(x);
            x = await writer3(x);
            x = await inc3(x);
        }
    };

    foo3(1);





    ///////////////////////////////////////////////////
    // shows '1' ? yes

    const idPromise4 = x => new Promise(res => res(x));
    const failPromise4 = err => new Promise((res, rej) => rej(err));

    const writer4 = x => {
        console.info("writer 4 " + x);
        return idPromise4(x);
    };

    const foo4 = async i => {
        let x = await idPromise4(i);
        x = await writer4(x);
    };

    foo4(1);

    
    
    
    
    ///////////////////////////////////////////////////
    // shows '1' ? no error, then is not a function

    const idPromise5 = x => new Promise(res => res(x));
    const failPromise5 = err => new Promise((res, rej) => rej(err));

    const writer5 = x => {
        console.info("writer 5 " + x);
        return idPromise5(x);
    };

    const foo5 = async i => {
        let x = await idPromise5(i);
        x.then(writer5);
    };

    foo5(1);
    
    
    
    
    
    
    ///////////////////////////////////////////////////
    // shows '2' ? false

    const idPromise6 = x => new Promise(res => res(x));
    const failPromise6 = err => new Promise((res, rej) => rej(err));

    const writer6 = x => {
        console.info("writer 6 " + x);
        return idPromise6(x);
    };

    const inc6 = n => idPromise6(n + 1);
    const filterEven6  = n => n % 2 === 0 ? idPromise6(n) : failPromise6("not even");

    const foo6 = async i => {
        let x = await idPromise6(i);
        while (x < 4) {
            x = await filterEven6(x).catch(err => {});
            x = await writer6(x);
            x = await inc6(x);
        }
    };

    foo3(1);


    report(testReportTitle, ok);
})();