// requires /toolkit/utils/test.js

test("Crazy JS", assert => {

    ////////////////////////////////////////////////////////////////////////////
    //
    // Truthiness, conditionals
    // Coercion, == vs ===, ordering
    // Deconstructors, min, max
    // Elvis and guards, [generators]

    // Boolscher Kontext

    assert.equals( 0 == false, true);
    assert.equals( "0" == false, true);
    assert.equals( {} == false, false);
    assert.equals( [] == false, true);
    assert.equals( "2" + 1 ,"21");
    assert.equals( "2" - 1 , 1);
    assert.equals( "2" - -1, 3);
    assert.equals( 1 + 2 + "3","33");

    assert.equals( +true,  1);
    assert.equals( +false, 0);
    assert.equals( true + true, 2);    // numerischer Kontext

    assert.equals( [] == [] , false);  //
    assert.equals( [] == ![] , true);
    // zweites Array wird durch ! in den boolschen Kontext gesetzt,
    // danach in einen String, die String representation von einem leeren Array ist einen leeren String,
    // einen leeren String wird übersetzt in die Numerische Represetnation und ist 0 -> dann false

    assert.equals( +[] , 0 );
    assert.equals( 2 == [2] , true);

    assert.equals( [] + {} , '[object Object]');
    assert.equals( {} + [], '[object Object]');
    // falsche Sicherheit look out! Wenn es in der Konsole ausgeführt wird,
    // kommt eine 0 raus. Denn der anonyme Block {} wird ignoriert.
    
    
    
    assert.equals(Number("-0") ,        0);
    assert.equals(JSON.parse("-0") ,     0);
    assert.equals(JSON.stringify(-0) ,  "0");
    assert.equals(String(-0) ,          "0");
    assert.equals(typeof null ,               "object"); // witzig da null ausdrückt, dass es kein Object ist.
    assert.equals(null instanceof Object ,    false);
    assert.equals(typeof NaN ,                "number");  // WTF?
    assert.equals(typeof (1/0) ,              "number");
    assert.equals(0.1 + 0.2 === 0.3 ,         false);
    //assert.equals(999999999999999999 ,           ); // Überlauf - Konstante -> Max Safe Number.
    assert.equals(Number.MAX_VALUE > 0 ,      true);
    assert.equals(Number.MIN_VALUE < 0 ,      false);
    assert.equals(Math.min(1, 2, 3) < Math.max(1, 2, 3) ,  true);
    assert.equals(Math.min() < Math.max(),  false);

    //console.log(typeof NaN === "number");

    // comparison

    assert.equals(1 < 2 < 3 ,            true);
    assert.equals(1 < 4 < 3 ,            true);  // es wird zuerst 1 < 4 zu einem boolean evaluiert
    assert.equals(3 > 2 > 1 ,            false);

    assert.equals( {} == {} ,            false);
    assert.equals( {} >  {} ,            false);
    assert.equals( {} >= {} ,             true); // WTF?
    //  >= wird immer abgebildet auf not kleiner. Also zuerst geprüft ob es kleiner ist oder nicht. Danach verneint.
    // {} nicht kleiner {}

    assert.equals( NaN === NaN, false ); // !!!
    assert.equals( NaN === !NaN, false ); // !!!
    // if ( x === NaN ) ... wird niemals aufgerufen, denn absolut nichts ist === NaN
    assert.equals( Number.isNaN(NaN), true );

    assert.equals(typeof ( +{}) == 'number', true);
    assert.equals( "" == false, true );


    const door = { open: false };
    /*
    const open = door => {
        let result = "open";
        door.open && (result = "already open");
        door.open = true;
        return result;
    };
    */

    const open = door => {
        if (door.open) {
            return  "already open"
        }
        door.open = true;
        return "open";
    };


    console.info("Door is ");
    //console.info(door.open || "closed");
    console.info(open(door) ? open(door) : "closed");



});

//import { Suite } from "../test/test.js"

//const crazySuite = Suite("crazy");
/*
crazySuite.add("equals", assert => {

    const a = "0";
    const b =  0;
    const c = [];

    // assert.is( a == b, );
    // assert.is( b == c, );
    // assert.is( a == c, );
});

crazySuite.add("false", assert => {

    assert.true( ! false     );
    assert.true( ! null      );
    assert.true( ! undefined );
    assert.true( ! ""        );
    assert.true( ! 0         );
});

crazySuite.add("coercion", assert => {

    assert.true( "1"   == 1     );
    assert.true( +"2"  == 2     );
    assert.true( !"0"  == false );
    assert.true( !!"0" == true  );
    assert.is  ( Number("0"), 0 );
});

crazySuite.add("object", assert => {

    const coerce = x => x ? true : false ;

    // assert.is( coerce("0")            , );
    // assert.is( coerce(+"0")           , );
    // assert.is( coerce(Number("0"))    , );
    // assert.is( coerce(new Number("0")), );

});

crazySuite.add("refactor", assert => {

    // const x = ; // fill here
    //
    // const if_1 = x => (x == true) ? true : false ;
    // const if_2 = x =>  x          ? true : false ; // safe refactoring ???
    //
    // assert.is( if_1(x), if_2(x) );  // is this true for every x ???

});


crazySuite.add("other", assert => {

    // assert.is( "2" + 1,      );
    // assert.is( "2" - 1,      );
    // assert.is( "2" - - 1,    );
    // assert.is( 1 + 2 + "3",  );

    // assert.is( +true,        );
    // assert.is( +false,       );
    // assert.is( true + true,  );
    // assert.is( [] == [],     );
    // assert.is( [] == ![],    );
    // assert.is( +[],          );
    // assert.is( 2 == [2],     );
    // assert.is( [] + {},      );
    // assert.is( {} + [],      );

});

crazySuite.add("numbers", assert => {

    // assert.is(Number("-0") ,            );
    // assert.is(JSON.parse("-0") ,        );
    // assert.is(JSON.stringify(-0) ,      );
    // assert.is(String(-0) ,              );
    // assert.is(typeof null ,             );
    // assert.is(null instanceof Object ,  );
    // assert.is(typeof NaN ,              );
    //
    // assert.is(typeof (1/0) ,            );
    // assert.is(0.1 + 0.2 === 0.3 ,       );
    // assert.is(999999999999999999 ,      );
    // assert.is(Number.MAX_VALUE > 0 ,    );
    // assert.is(Number.MIN_VALUE < 0 ,    );
    //
    // assert.is(Math.min(1, 2, 3) < Math.max(1, 2, 3) ,  );
    // assert.is(Math.min() < Math.max(),  );

});

crazySuite.add("compare", assert => {

    // assert.is(1 < 2 < 3 ,            );
    // assert.is(3 > 2 > 1 ,            );

    // assert.is( {} == {} ,            );
    // assert.is( {} >  {} ,            );
    // assert.is( {} >= {} ,            );

});


crazySuite.run();
*/