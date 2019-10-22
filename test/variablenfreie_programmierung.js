////////////////////////////////////////////////////////////////////////////
// Variablenfreie Programmierung
(() => {
    const testReportTitle = "Variablen freie Programmierung";
    console.info("hell");
    let ok = [];

// atoms
    const id = x => x;
    const konst = x => y => x;


// derived
    const fst = konst;
    const snd = konst(id);  // snd2(2) -> konst2(id3)(2) -> id3(2) -> 2

    const T = fst;  // True
    const F = snd;  // False

    const and = p => q => p(q)(p);

    const M = f => f(f);
    const or = M;

    const Pair = x => y => selector => selector(x)(y);
    const firstname = fst;
    const lastname = snd;

    const Triple = x => y => z => f => f(x)(y)(z);
    const person = Triple;
    const lname = x => y => z => x; // select first
    const fname = x => y => z => y; // select snd2
    const age = x => y => z => z; // select third

// Either
    const Left = x => f => g => f(x);
    const Right = x => f => g => g(x);
    const either = e => f => g => e(f)(g);


////////////////////////////////////////////////////////////////////////////
// TESTS

//ok = [];

// id3
    ok.push(id(1) === 1);
    ok.push(id(id) === id); // Spezialität von JS -> Funktionsvergleich

// konst2
    ok.push(konst(42)(0) === 42);
    ok.push(konst(42)(1) === 42);
    ok.push(konst(42)(null) === 42);

// kite
    ok.push(snd(null)(42) === 42);

// true
    ok.push(T(1)(0) === 1);
    ok.push(F(1)(0) === 0);

// and
    ok.push(and(F)(F) === F);
    ok.push(and(T)(F) === F);
    ok.push(and(F)(T) === F);
    ok.push(and(T)(T) === T);

// or
    ok.push(or(F)(F) === F);
    ok.push(or(T)(F) === T);
    ok.push(or(F)(T) === T);
    ok.push(or(T)(T) === T);

// Pair
    const dierk = Pair("Dierk")("König"); // immutable
    ok.push(dierk(firstname) === "Dierk"); // firstname ist eine Funktion die den ersten Wert ausgiebt
    ok.push(dierk(lastname) === "König"); // lastname ist eine Funktion die den zweiten Wert ausgiebt
    ok.push(Pair("M")("A")(firstname) === "M");

// Triple
    const mab = person("bruelhart")("marc-antoine")(14);
    ok.push(mab(lname) === "bruelhart");
    ok.push(mab(fname) === "marc-antoine");
    ok.push(mab(age) === 14);

    const sut = person("sutter");
    const lad = sut("ladina")(11);
    const mar = sut("marco")(10);

    ok.push(sut(lname) !== "sutter");   // es müssen alle Parameter deklariert sein
    ok.push(lad(age) === 11);
    ok.push(mar(lname) === "sutter");
    ok.push(lad(fname) === "ladina");

    const nic = person("wyss");
    ok.push(lname(nic) !== "wyss"); // wenn lName aufgerufen wird die Funktion durch das Argument ersetzt

    const oneTwoThre = person(1)(2)(3);
    ok.push(lname(oneTwoThre) !== 1); // wenn lName aufgerufen wird die Funktion durch das Argument ersetzt


////////////////////////////////////////////////////////////////////////////
// Beispiel Verwendungen für Conditions
    const safeDiv = num => divisor =>
        divisor === 0
            ? Left("schlecht!")
            : Right(num / divisor);

    either(safeDiv(1)(1))
    (console.error)
    (x => console.log(x));

    either(safeDiv(1)(0))
    (console.error)
    (x => console.log(x));

    const eShow = e => e(x => console.error("Cannot divide by 0"))(x => console.log("Result is: " + x));
    eShow(safeDiv(1)(1));
    eShow(safeDiv(1)(0));

    report(testReportTitle, ok);
})();