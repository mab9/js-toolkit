// requires /toolkit/utils/test.js

test("promise", assert => {

    ////////////////////////////////////////////////////////////////////////////
    //
    // - JS hat keine Möglichkeit Threads zu erstellen etc,
    //   ist aber nebenläufig. Der Browser kümmert sich um die Threads.
    //   JS ist nicht single Threaded!
    //
    // - häufig mit fetch api benutzt   .then(() =>).then(...
    // - in dieser Zeit wenn die Resource geladen wird, will man
    //   das GUI nicht blockieren
    // - wenn ein Fehler auftritt, soll kein Fehler im blockierten UI
    //   geworfen werden.


    // Gänse Pattern - Dreieck mit callbacks

    // Promise
    //
    // - hat ein then
    // - hat ein catch  (wenn es davor eine exception gab, wird catch aufgerufen)

    // Thenable
    //
    // - then bekommt eine Funktione, die wenn sie aufgerufen wird
    //   wieder ein promis zurück gibt
    // - muss prüfen ob ein error passiert wurde und rejecton oder nicht


    // process even gibt ein promise zurück
    const processEven = i => new Promise((resolve, reject) => {    // Parameter die Funktionen sind
            if (i % 2 === 0) {
                resolve(i);               // success/failure callbacks
            } else {
                reject(i);
            }
        }
    );

    /*
    processEven(4)
        .then(it => {
            console.log(it);
            return it
        })  // auto promotion, macht automatisch ein promise
        .then(it => processEven(it + 1))
        .catch(err => console.log("Error: " + err));


    const processTrue = i => new Promise((resolve, reject) => {
        if (i != undefined || i != null) {
            resolve(i);               // success/failure callbacks
        } else {
            reject(i);
        }
    });

    processTrue(true).then(it => {
        console.log(it);
        return false;
    }).then(it => {
        console.log(it);
        return processTrue(null);
    }).catch(err => console.log("Error: " + err));

    */

    const idPromise = x => new Promise(resolve => resolve(x));
    // idPromise(1).then(it => console.info("promise: " + it));
    assert.equals(idPromise(1) !== 1, true);

    const writer = x => {
        // console.info("insiede writer: " + x);
        return idPromise(x);
    };

//    const filterEven = n => n % 2 === 0 ? n : undefined;
    const filterEven = n => {
        if (n % 2 === 0) return n; else throw Error("not even")
    };

    idPromise(1)
        .then(writer)
        .then(filterEven)
        .then(writer)
        .catch(err => {
        });


    /*
    idPromise(1)
        .then(it => {console.info("yes " + it); return idPromise(it); })
        .then(it => console.info("test : " + it))

        idPromise(1)
        .then(writer)
        .then(filterEven)
        .then(writer)
     */


    // NullSafe a.k.a Promise
    //
    // - Beispiel wie ein Promise von innen aussieht
    // - NullSafe objects can be chained with their "then" function
    //   just like Promises do, incl. auto-promotion of result values to NullSafe objects.

    const NullSafe = x => {
        const getx = () => x; // zu Testzwecke
        const isNullSafe = y => y && y.then;
        const maywrap = y => isNullSafe(y)
            ? y
            : NullSafe(y);
        return {
            then: fn => {

                // 1. Fall fn ist null oder ein Fehler und es wird nicht weitergefahren, nichts geloggt
                // 2. Fall fn ist ein NullSafe Objekt (kommt z.B von einem async service zurückgesendet)
                // 3. Fall fn ist ein Wert bei dem eine auto promotion zu einem NullSafe gemacht werden muss

                // Achtung "" oder 0 soll erlaubt sein, deshalb nicht !x
                if (x === null || x === undefined) {
                    return NullSafe(x)
                }

                let result = fn(x);
                return maywrap(result);
            },
            getx,
        }
    };


    const NullSafeShorten = x => {
        const getx = () => x; // zu Testzwecke
        const isNullSafe = y => y && y.then;
        const maywrap = y => isNullSafe(y)
            ? y
            : NullSafe(y);
        return {
            then: fn => {
                return (x === null || x === undefined)
                    ? NullSafe(x)
                    : maywrap(fn(x));
            },
            getx,
        }
    };

    const testAbort = NullSafe(null).then(x => x * 2);
    const testAbort2 = NullSafeShorten(null).then(x => x * 2);
    assert.equals(testAbort.getx(), null);
    assert.equals(testAbort2.getx(), null);

    const testNullsafe = NullSafe(20).then(x => NullSafe(x));
    const testNullsafe2 = NullSafeShorten(20).then(x => NullSafe(x));
    assert.equals(testNullsafe.getx(), 20);
    assert.equals(testNullsafe2.getx(), 20);

    const testAutoPromote = NullSafe(1).then(x => x * 5);
    const testAutoPromote2 = NullSafeShorten(1).then(x => x * 5);
    assert.equals(testAutoPromote.getx(), 5);
    assert.equals(testAutoPromote2.getx(), 5);

    let x_ = 2;
    let y_ = 3;

    const result = NullSafe(x_)
        .then(x => x * 2)        // must auto-promote
        .then(x => NullSafe(x))  // must not auto-promote
        .then(x => y_ = x + 1)   // store value, check no double promotion
        .then(x => null)         // jump over rest
        .then(x => x.mustNotBeCalled) !== null && y_ === x_ * 2 + 1;

    assert.equals(result, true);
});