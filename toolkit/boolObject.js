// requires /toolkit/utils/test.js

test("Objekte als boolsche Operatoren", assert => {

    ////////////////////////////////////////////////////////////////////////////
    //
    // Objekte als boolsche Operatoren


    // 1. null
    // 2. false
    // 3. undefined
    // 4. 0 (null)
    // 5. "" empty string
    // 6 NaN


    // person
    // let person
    // let person = { }

    // person && person.getAge && person.getAge()
    // assert.equals(person, undefined);  --> console output

    isTrueCheck = value => value
        ? value
        : false;

    assert.equals(isTrueCheck(null), false);
    assert.equals(isTrueCheck(false), false);
    assert.equals(isTrueCheck(undefined), false);
    assert.equals(isTrueCheck(0), false);
    assert.equals(isTrueCheck(""), false);
    assert.equals(isTrueCheck(NaN), false);


});