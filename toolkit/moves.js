(() => {

    const testReportTitle = "Moves - Vorgehen beim Implementieren von neuer Funktionalität";
    let ok = [];

    ////////////////////////////////////////////////////////////////////////////
    //
    // Programming ist ein Vorgang
    // Welche Natur hat der Vorgang?
    // Aus welchen Teilen besteht er?
    //
    // Schrittfolgen (moves) muss man lernen.
    // Dann kann man sie kombinieren und
    // den Umständen gemäss anpassen.
    //
    // Bewusst werden, was man tut.
    // Wir programmieren gemeinsam,
    // Sie halten nach moves Ausschau.

    // 0 Exploration:           technische Machbarkeit, nur lernen, Timebox
    // 1 Start at the End:      statische Version des Resultats bauen, vor jeder dynamischen
    // 2 Extract:               statische Werte durch Variablen ersetzen,
    //                          Wiederholungen durch mappings/loops ersetzen.
    // 3 Abstract:              Abstrahieren der Lösung, bennenn und in Konzepte fassen.
    //                          Wenn man keinen guten Begriff für die Abstrahierung findet,
    //                          sollte man den Schritt abbrechen.
    // 4 Reorganize:            Teile so umorganisieren, dass man leichter mit ihnen arbeiten kann.
    // 5 Release:               Die Lösung selbständig machen - ohne  geheimes Wissen oder Hilfestellung
    //                          Vor jedem push auf shared Repo!
    // 6 Retrospektive:         Was beibehalten, was nächstes mal anders machen?





    // todo replace this example with example of todo application .... or some description how this "test framework" and this simple app was build
    // const collect = (10).times( n => n+1 );

    Number.prototype.times = function (todoSoOften) {
        const myNumber = this.toFixed(0);
        console.log(myNumber);
        for (let i = 0; i < myNumber; i++) {
            todoSoOften(i);
        }
    };

    const collect = (10).times( n => n+1 );

    ok.push(collect.length === 10);
    ok.push(collect[0] === 1);
    ok.push(collect[9] === 11);

    //console.error("fehler");  // erster Schritt ist es technisch möglich den Fehler sichtbar zu machen...


    report(testReportTitle, ok);
})();