(() => {

    const testReportTitle = "Arrays and useful tips";

////////////////////////////////////////////////////////////////////////////
//
//  useful tips js tips - have a look at "mdn js XXX"
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array

    let ok = [];

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

    report(testReportTitle, ok);
})();