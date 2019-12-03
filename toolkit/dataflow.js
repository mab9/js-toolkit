// requires /toolkit/utils/test.js

test("Koordinationschemata - ähnlich zu Nebenläufigkeit", assert => {

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


    // Ergebnisabhängigkeit
    //
    // - für b und c muss zuerst a laufen, a darf nur 1 mal laufen
    // - Implizite Koordination => DataFlowVariable


    let a;
    assert.equals(a, undefined);
});