// requires /toolkit/utils/observable.js

test("observable-value", assert => {

    const obs = Observable("");

    //  initial state
    assert.equals(obs.getValue(),  "");

    //  subscribers get notified
    let found;
    obs.onChange(val => found = val);
    obs.setValue("firstValue");
    assert.equals(found,  "firstValue");

    //  value is updated
    assert.equals(obs.getValue(),  "firstValue");

    //  it still works when the receiver symbols changes
    const newRef = obs;
    newRef.setValue("secondValue");
    // listener updates correctly
    assert.equals(found,  "secondValue");

    //  Attributes are isolated, no "new" needed
    const secondAttribute = Observable("");

    //  initial state
    assert.equals(secondAttribute.getValue(),  "");

    //  subscribers get notified
    let secondFound;
    secondAttribute.onChange(val => secondFound = val);
    secondAttribute.setValue("thirdValue");
    assert.equals(found,  "secondValue");
    assert.equals(secondFound,  "thirdValue");

    //  value is updated
    assert.equals(secondAttribute.getValue(),  "thirdValue");


    let sum = 0;
    const trackable = Observable(0);
    const callback = x => sum += trackable.getValue();

    //trackable.onChange(x => sum += trackable.getValue());
    trackable.onChange(callback);
    trackable.setValue(2);
    trackable.setValue(5);
    assert.equals(sum, 7);
});

test("observable-list", assert => {
    const raw  = [];
    const list = ObservableList( raw ); // decorator pattern

    assert.equals(list.count(), 0);
    let addCount = 0;
    let delCount = 0;
    list.onAdd( item => addCount += item);
    list.add(1);
    assert.equals(addCount, 1);
    assert.equals(list.count(), 1);
    assert.equals(raw.length, 1);

    list.onDel( item => delCount += item);
    list.del(1);
    assert.equals(delCount, 1);
    assert.equals(list.count(), 0);
    assert.equals(raw.length, 0);
});
