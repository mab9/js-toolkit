(() => {

    const testReportTitle = "Slice Splice - Array.slice and splice examples";
    let ok = [];

    Array.prototype.eq = function (second) {
        const first = this;
        if (first.length !== second.length) {
            return false;
        }
        return !first.some((it, index) => second[index] !== it);
    };

    const animals = ['ant', 'bison', 'animal', 'duck', 'elephant'];

    ok.push(animals.slice(2).eq([ "animal", "duck", "elephant" ]));
    ok.push(animals.slice(2,4).eq([ "animal", "duck"]));

    let copy = animals.slice(0);  // shallow copy
    ok.push(copy.eq(animals));

    // splice statt slice
    //copy = animals.splice(0,2); // ausversehen einen Schreibfehler...
    //ok.push(!copy.eq(animals));

    // Element aus einem array löschen
    const animalDeleted = animals.splice(1,1);
    ok.push(['bison'].eq(animalDeleted));
    ok.push(['ant', 'animal', 'duck', 'elephant'].eq(animals));

    // Element aus einem Array austauschen, mit einem oder mehreren ...
    ok.push([].eq(animals.splice(1,0, "huu", "mab")));
    ok.push([ "ant", "huu", "mab", "animal", "duck", "elephant" ].eq(animals));
    report(testReportTitle, ok);
})();