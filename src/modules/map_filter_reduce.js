(() => {

    const testReportTitle = "Map Filter Reduce";
    let ok = [];


    ////////////////////////////////////////////////////////////////////////////
    // MAP FILTER REDUCE
    //
    // map    - die Struktur bleibt gleich -> Aus einem Array wird ein Array usw.
    // filter - die Struktur bleibt gleich aber es hat danach gleich viel oder weniger Elemente
    // reduce - reduziert die Menge der Daten auf einen neuen Wert
    //
    // Partial Application   const


    // MAP
    // Funktoren sind Datenstrukturen auf denen "map" aufgerufen werden kann.

    // const times = (a, b) => a * b;           // Warum wir diese Schreibweise nicht mögen
    const times = a => b => a * b;
    const twoTimes = times(2);


    [1, 2, 3].map(x => times(2)(x));   // Es fällt auf, dass die Eta-Redukton
                                       // ausgeführt werden kann (allerdings nicht wenn times = (a, b) ...
    [1, 2, 3].map(times(2));
    [1, 2, 3].map(twoTimes);


    // FILTER
    const odd = x => x % 2 === 1;
    [1, 2, 3].filter(x => x % 2 === 1);
    [1, 2, 3].filter(x => odd(x));        // Eta-Reduktion
    [1, 2, 3].filter(odd);

    /*
    const divideBy = x => y => x / y === 1;
    [1, 2, 3].filter(x => x / y === 1);
    [1, 2, 3].filter(x => odd(x));        // Eta-Reduktion
    [1, 2, 3].filter(odd); */


    // REDUCE ein katamorphismus - "un-partial" reduce
    const plus = (accu, cur) => accu + cur;
    [1, 2, 3].reduce((accu, cur) => accu + cur);   // zu Beginn wird der accu auf die 1 und der cur auf die 2 gesetzt
    [1, 2, 3].reduce(plus);                        // first: 1+2 = 3, second 3+3 = 6

    // variant with initial accu value as 2nd argument
    // then cur starts at first element
    [1, 2, 3].reduce(plus, 0);    // the second argument as start value


    // Pair, Product Type
    const pair = x => y => f => f(x)(y);
    const fst = p => p(T);
    const snd = p => p(F);

    // Either, Co - Product, Sum
    const Left = x => f => g => f(x);           // ctor 1
    const Right = x => f => g => g(x);          // ctor 2
    const either = e => f => g => e(f)(g);      // accessor


    /////////////////////
    // In der Funktionalen Programmierung versuchen wir immer mit Ausdrücken zu programmieren.
    //
    // Statements - die die etwas machen sind Satements   console.log("jej"); document.writeln("div")
    // Ausdrücke  - die die etwas berechnen sind Ausdrücke.

    // go around null / undefined

    // Maybe - go around null / undefined
    const Nothing = Left();
    const Just = Right;
    const maybe = either;


    //


    //maybe(expressionThatMightGoWrong)
    //      (handleBad)
    //      (handleGood);


    // monoid and functor
    //  // todo siehe slides 5 scirpting
    //


    const twice = a => a * 2;
    //console.info([1,2,3].map(twice).toString());
    ok.push([1, 2, 3].map(twice).toString() === "2,4,6");


    const divides = x => y => y % x === 0;
    //console.info([1,2,3,4,5,6].filter(divides(3)).toString() === "3,6");
    ok.push([1, 2, 3, 4, 5, 6].filter(divides(3)).toString() === "3,6");

    const join = t => (x, y) => x + t + y;
    //console.info([1,2,3].reduce(join('-')));
    ok.push([1, 2, 3].reduce(join('-')) === '1-2-3');


    // Reduce example ???
    const preOrder = (accu, cur) => {
        accu.unshift(cur);
        return accu;
    };

    //console.info([1, 2, 3].reduce(preOrder, []));
    //console.info([3, 2, 1]);
    ok.push([1, 2, 3].reduce(preOrder, []) !== [3, 2, 1]);  // this will never work!


    var a = [];
    var b = a;
    ok.push(a === b);    // True, a and b refer to the same object
    ok.push([] !== []);
    ok.push([][0] === [][0]);


    /*
    Implement a function named 'palindrome' that tells whether a given string
  is the same when read left-to-right and right-to-left, ignoring upper/lowercase differences
  and any characters outside 'a' to 'z'. For example
  palindrome('ABBA')  // true
  palindrome('Abba')  // true
  palindrome('A man, a plan, a canal: Panama!') // true

  You must use the following helper functions (they are provided):
  const str2chars = str  => [...str];            // convert a string to an array of chars
  const isAlpha   = char => char.match(/[a-z]/); // char is in the alphabet

  The question title contains implementation hints.


  palindrome("Amore, Roma!")
  && palindrome("Madam, I'm Adam!")
  && palindrome("Never odd or even.")
  && ! palindrome("Amore")

     */


    /*
     // Reduce example ???
        const preOrder = (accu, cur) => {
            accu.unshift(cur);
            return accu;
        };

        //console.info([1, 2, 3].reduce(preOrder, []));
        //console.info([3, 2, 1]);
        ok.push([1, 2, 3].reduce(preOrder, []) !== [3, 2, 1]);  // this will never work!

        // REDUCE ein katamorphismus - "un-partial" reduce
        const plus = (accu, cur) => accu + cur;
        [1, 2, 3].reduce((accu, cur) => accu + cur);   // zu Beginn wird der accu auf die 1 und der cur auf die 2 gesetzt
        [1, 2, 3].reduce(plus);                        // first: 1+2 = 3, second 3+3 = 6

     */


    // 1. convert into array         // map
    // 2. remove all not alpha chars // filter
    // 3. reduce

    const str2chars = str => [...str];            // convert a string to an array of chars
    const isAlpha = char => char.match(/[a-z]/); // char is in the alphabet

    const palindrome = str => {
        let cleaned = str2chars(str).map(char => char.toLowerCase()).filter(isAlpha);

        return cleaned.reduce((acc, cur) => acc + cur)
            === cleaned.reverse().reduce((acc, cur) => acc + cur);
    };

    palindrom("abb a,");
    palindrom("ABBb a,");

    report(testReportTitle, ok);
})();