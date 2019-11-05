(() => {

    const testReportTitle = "Test Js - to use for temporary tests";

////////////////////////////////////////////////////////////////////////////
//
//
//


    let ok = [];
    let num1 = Number("25");
    let num2 = Number("26");
    let num3 = Number("27");

    let nums = [];
    nums.push(num1);
    nums.push(num2);
    nums.push(num3);

    nums.forEach((num, index) => {
        ok.push(num === (25 + index));
    });


    /*function Empty() {

    }
    const empty = new Empty();
    Empty.prototype.answer = 42;
    ok.push(empty.answer === 42);


    const Empty = (() => {
        function Empty() {        }
        return Empty;
    }) ();

    const empty = new Empty;
    ok.push(empty instanceof Empty);
    console.info(empty);



    const Empty = (() => {
        function Empty() {        }
        return Empty;
    }) ();

    const empty = new Empty;
    const also = new Empty;

    Empty.prototype.answer = 42;
    ok.push(empty.answer === 42 && also.answer === 42);
    console.info(empty);


    const Empty = (() => {
        function Empty() {        }
        return Empty;
    }) ();

    const empty = new Empty;

    Empty.prototype.answer = 42;
    ok.push(empty.answer === 42 && also.answer === 42);
    console.info(empty);
*/


    const Person = name => {
        let age = 0;
        return {
            getAge: () => age,
            setAge: newAge => age = newAge,
            getName: () => name,
            setName: newName => name = newName

        }
    };

    const me = Person("mab");
    //me.age = 27;
    //me.name = "****";
    me.setAge(50);
    //ok.push(me.getName() === "****");
    me.setName("Sherlok");
    ok.push(me.getAge() === 50);

    ok.push(me.getName() === "Sherlok");

// xs1_.eq(ys1_) && ! xs2_.eq(ys2_) && xs3_.eq(ys3_) && ! xs3_.eq(ys4_) && ! xs4_.eq(ys3_)

    const eq =
    report(testReportTitle, ok);
})();