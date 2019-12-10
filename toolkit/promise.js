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

    console.info("------------");


    const NullSafe = x => {
        const isNullSafe = y => y && y.then;
        const maywrap = y => isNullSafe(y)
            ? y
            : NullSafe(y);
        return {
            then: fn => {

                // 1. es isch es NullSafe objekt
                // 2. es isch kes
                console.info("test mit vale 2");
                let f = maywrap(x);
                fn(f);
                //fn(x)
                //return maywrap(fn(x))
            }
        }
    };

    const test = NullSafe(null);
    console.info("test mit vale");

    test.then(console.log)


 //       .then(console.log);                   // will call the log
  //  NullSafe(null).then(console.log);                // will not call the log
  //  NullSafe(2).then(x => null).then(console.log); // will not call the log


      /*
        function doit(waszutunist) {
        return function bla(arg) {
            return waszutunist(arg)
        }
    }
     */

    /*
       function NullCheck(x) {
            return function then(fn) {
                isNullSafe(ab)
                mayWrap(ab)
                return {
                    return maywrap
                }

            }
       }
     */


// (1) if x is not null or undefined, call fn(x);
// either way, make sure the result is a NullSafe
// x_ and y_ are given. do not override.


    /*
                console.info("bevore " + x);
                console.info(isNullSafe(x));
                console.info(fn);
                if (isNullSafe(x)) {
                    console.info("is null safe");
                    return fn(x);
                } else {
                    console.info("is not null safe");
                    return NullSafe(x)
                }
     */
});