// requires /toolkit/utils/test.js

test("Dataflow and Scheduler - Koordinationschemata", assert => {

    ////////////////////////////////////////////////////////////////////////////
    //
    // Data Flow
    //

    // 1) Keine Koordination notwendig - Multithreading alle machen was sie wollen
    // 2) Reihenfolgeabhängigkeit      - zuerst a dann b / queing
    // 3) Ergebnisabhängigkeit         - für b und c muss zuerst a laufen


    // Keine Koordination notwendig
    //
    // - nichts zu tun

    // Reihenfolgeabhängigkeit
    //
    // - Actor - Actor -> Flux Architecture, Redux, ViewX
    // - Delegierte Koordination => Scheduler

    // execute asynchronous tasks in strict sequence, aka "reactive stream", "flux architecture"
    const Scheduler = () => {
        let sempahore = false;
        const tasks = [];

        function process() {
            // wird asynchrone im Thread angeordnet -> Spielt keine Rolle auf welchem Core es läuft.
            if (sempahore) return;
            if (tasks.length === 0) return; // guard clause / Schutzklausel

            sempahore = true;
            const task = tasks.pop();
            const doit = new Promise((resolve) => {
                task(resolve);
            });

            doit.then(() => {
                sempahore = false;
                process();
            });
        }

        function add(task) {
            tasks.unshift(task);
            process();
        }

        return {
            add: add,
            addOk: task => add(ok => {
                task();
                ok();
            }) // convenience
        }
    };


    // Ergebnisabhängigkeit
    //
    // - für b und c muss zuerst a laufen, a darf nur 1 mal laufen
    // - Implizite Koordination => DataFlowVariable

    const DataFlowVariable = howto => {
        let value = undefined;  // Javascript benutzt auch undefined statt null
        return () => undefined === value    // !value -> blockiert die Werte false, 0, naN, ...
            ? value = howto()               // Zuweisung sowohl ein Statement und Rückgabe
            : value;

    };


    const z = DataFlowVariable(() => x() + y());   // z depends on x and y, which are set later...
    const x = DataFlowVariable(() => y());         // x depends on y, which is set later...
    const y = DataFlowVariable(() => 1);

    assert.equals(z(), 2);
    assert.equals(x(), 1);
    assert.equals(y(), 1);
});


/*

    let counter = 0;
    const x = DataFlowVariable(() => {
        counter++;
        return 1;
    });

    assert.is(counter, 0);
    assert.is(x(), 1);
    assert.is(counter, 1);
    assert.is(x(), 1);
    assert.is(counter, 1);

 */