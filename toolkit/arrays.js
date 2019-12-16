(() => {

    const testReportTitle = "Arrays and some fancy array processing tricks";
    let ok = [];


    ////////////////////////////////////////////////////////////////////////////
    //
    // useful tips js tips - have a look at "mdn js XXX"
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array


    // Arrays functions
    //
    // - find
    // - every
    // - some

    let personen = ["bob", "alice", "foo"];

    let found = personen.find(element => {
        console.log(element);                             // iterate over all, change elements
        return element === "alice"                        // stop iteration
    });

    ok.push("alice" === found);

    let array1 = [1, 18, 42, 16, 49];
    let array2 = [1, 18, 42, 17, 49];

    ok.push(!array1.every((it, index) => it > 15));
    // evaluate each item

    ok.push(array1.some((it, index) => it === array2[index]));
    // gibt es iergend ein element, das in array 1 nicht in array 2 ist




    // Arrays Comparison with additional functions
    //
    // - create helper functions for the array object
    // - iterate over array content to compare content

    Array.prototype.eq = function (second) {
        const first = this;
        if (first.length !== second.length) {
            return false;
        }
        return !first.some((it, index) => second[index] !== it);
    };


    // Array Modeling with Splice and Slice
    //
    // - Remove, Shallow Copy, retrieve, exchange and some more tricks

    const animals = ['ant', 'bison', 'animal', 'duck', 'elephant'];

    ok.push(animals.slice(2).eq(["animal", "duck", "elephant"]));
    ok.push(animals.slice(2, 4).eq(["animal", "duck"]));

    let copy = animals.slice(0);  // shallow copy
    ok.push(copy.eq(animals));

    // splice statt slice
    //copy = animals.splice(0,2); // ausversehen einen Schreibfehler...
    //ok.push(!copy.eq(animals));

    // Element aus einem array löschen
    const animalDeleted = animals.splice(1, 1);
    ok.push(['bison'].eq(animalDeleted));
    ok.push(['ant', 'animal', 'duck', 'elephant'].eq(animals));

    // Element aus einem Array austauschen, mit einem oder mehreren ...
    ok.push([].eq(animals.splice(1, 0, "huu", "mab")));
    ok.push(["ant", "huu", "mab", "animal", "duck", "elephant"].eq(animals));
    report(testReportTitle, ok);
})();