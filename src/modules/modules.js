// requires /toolkit/utils/test.js

test("Module - organize code", assert => {

    ////////////////////////////////////////////////////////////////////////////
    //
    // Warum verwenden wir Module?
    //
    // - Code organisieren
    // - Klarheit schaffen: Abhängigkeiten
    // - Fehler vermeiden:
    // - Globals, Scoping, Namensraum
    //

    // Koheränz

    //
    // Abgrenzungen
    //
    // package manager  - Paketierung, Auflösung und
    // build tools      - wir sind cool und kompilieren Code wie in anderen Sprachen
    // bundler          - werden alle obsolet mit ES06 Module System


    /*
        <script src="./my.js" type="module">
        import("./my.js").then( mod => … )

        - wird async geladen
        - wobei mod der Namensraum ist und mit x.mod geladen werden kann.
          (Achtung kein Objeckt)

        Beispiele von Import und Export Varianten (es gibt unzählige davon)

        import "module-name";                             // ganzes File inkl. JS Doku laden
        import { export1 , export2 } from "module-name";  // Objekt dekonstruktor

        export { name1, name2, …, nameN };
     */


    /*
        Wirkungen von Modulen

        - exports sind immer read-only
        - kein globales Objekt mehr
        - kein globales "this" und hoisting

        - Module sind Namespaces -> keine clashes mehr von z.B Variablennamen
        - Module sind Singletons


        Module haben SOP (Single Origin Police) mit File System null orgin.
        Deshalb können nachfolgende Tools verwendet werden.

        - Developer Mode (suppress SOP)  ! don't forget to set back!
        - Local Webserver               ! disable cache
        - Bundler (Rollup, Parcel, Webpack, …)
        - Start Browser in Debug mode (z.B mit Intellij

     */



});