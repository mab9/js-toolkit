////////////////////////////////////////////////////////////////////////////
// Test Report - print test results

function report(module, ok) {

    if (ok.every(elem => elem)) {
        document.writeln(`
            <div class="w3-panel w3-card">
              <p> ${ok.length} passed - module: ${module}</p>
            </div>`);
    } else {
        let failed = ok.filter(x => x === false);
        document.writeln(`
            <div class="w3-panel w3-card">
              <p> ${failed.length} failed - module: ${module}</p>
            </div>`);
    }
}
