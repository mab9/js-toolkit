(() => {

    const testReportTitle = "Test Js - to use for temporary tests";

    let ok = [];
    ok.push(true);

    const Observable = value => {
        const listeners = [];
        return {
            onChange: callback => listeners.push(callback),
            getValue: () => value,
            setValue: val => {
                if (value === val) return;
                value = val;
                listeners.forEach(notify => notify(val));
            }
        }
    };

    const callback = (x) => console.log("ticked: " + x);
    const obsi = Observable(20);
    obsi.onChange(callback);
    obsi.setValue(21);


    const Observable2 = value => {
        const listeners = [];
        return {
            onChange: callback => {
                listeners.push(callback);
                callback(value, value);
            },
            getValue: () => value,
            setValue: newValue => {
                if (value === newValue) return;
                const oldValue = value;
                value = newValue;
                listeners.forEach(callback => callback(value, oldValue));
            }
        };
    };

    let sum = 0;
    const trackable = Observable2(0);

    //trackable.onChange(x => sum += trackable.getValue());
    let tmp = null;
    trackable.onChange(x => tmp = x);
    console.info("x");
    console.info(trackable.getValue());

    report(testReportTitle, ok);
})();