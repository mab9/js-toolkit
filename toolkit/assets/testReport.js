////////////////////////////////////////////////////////////////////////////
// Test Report - print test results

// #E8F3E8
// #92C591
// #559E54
// #305A30
// #0A3409

function report(module, ok) {
    let passed = ok.filter(x => x === true).length;
    let marked = "";
    let button = "";
    if (passed < ok.length) {
        marked = "w3-flat-sun-flower";
        button = `<a href="" class="w3-button w3-right w3-flat-midnight-blue">Show</a>`;
    }

    //ok.filter(x => x === false).every(console.error);



    document.writeln(`
       <div class="w3-panel w3-card ${marked}">
          <p> ${passed} / ${ok.length} passed - ${module} ${button}</p>
       </div>
    `);

}
