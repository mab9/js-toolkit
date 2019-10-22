////////////////////////////////////////////////////////////////////////////
// Test Report - print test results

function printTestReport(module, ok) {

    if (ok.every(elem => elem)) {
        //document.writeln("All " + ok.length + " tests ok.");
        //document.writeln(`<div class="block success">Test title - all ${ok.length} tests ok</div>`);
        document.writeln(`<div class="block">
                <div class="align">
                  <div class="chip success">${ok.length} passed</div>
                </div>
                <div class="title">Module: ${module}</div>
                </div>`);
    } else {
        let failed = ok.filter(x => x === false);
        document.writeln(`<div class="block">
                            <div class="align">
                              <div class="chip error">${failed.length} failed</div>
                            </div>
                            <div class="title">Module: ${module}</div>
                            </div>`);
    }
}

/*
    <div class="block2">
      <div class="chip">7 failed</div>
      <div class="title">Module: Lambda Kalkuel</div>
    </div>

    <div class="block2"><div class="chip">7 failed</div><div class="title">Module: Title</div></div>
 */