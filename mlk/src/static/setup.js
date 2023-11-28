import { MonacoEditorLanguageClientWrapper, vscode } from './monaco-editor-wrapper/index.js';
import { buildWorkerDefinition } from "./monaco-editor-workers/index.js";
import monarchSyntax from "./syntaxes/modul-land-karte.monarch.js";

buildWorkerDefinition('./monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId('modul-land-karte');
editorConfig.setMonarchTokensProvider(monarchSyntax);

let mainCode = `
model v001

curriculum ce_ba
type bachelor
displayShortName "CE(BA)"
fullName "Computer Engineering"
status running
noSemesters 6

supplementaryCurriculumInformation

prerequisiteSection
ma1 -> ma2 recommended topics : Mengenlehre, Folgen_Reihen
fs1 -> fs2 recommended
et1 -> et2 recommended
et1 -> ro recommended
prog1 -> prog2 recommended

//moduleTopicSection
mt ma1 Mengenlehre : "Menge" "Element" "Vereinigung" 
mt ma1 Funktionsanalysis : "Relation" "Funktion" "Funktionsdomäne" "Injektion, Surjektion, Bijektion" "Stetigkeit" "Differenzierbarkeit"
mt ma1 Folgen_Reihen: "Konvergenz, obere Schranke"







//
// Semester 1
//
module ma1 
officialID "CE11"
shortName "Mathe 1"
officialName "Mathematik 1"
semester 1
etcs 6
workingHoursSL 5
workingHoursBUE 1

module prog1
officialID "CE22"
shortName "Programmieren 1"
officialName "Grundlagen der Programmierung"
semester 1
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module et1
officialID "CE40"
shortName "ET 1"
officialName "Elektrotechnische Grundlagen 1"
semester 1
etcs 5
workingHoursSL 4
workingHoursBUE 1

module dt1
officialID "CE43"
shortName "Digitaltechnik"
officialName "Digitaltechnik"
semester 1
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module einfce
officialID "CE59"
shortName "Einführung CE"
officialName "Einführung in Computer Engineering"
semester 1
etcs 5
workingHoursSL 2
workingHoursPS 2


module fs1
officialID "BLAFS1"
shortName "Fremdsprache 1"
officialName "Fremdsprache 1"
semester 1
etcs 4
workingHoursPUE 4


//
// Semester 2
//
module ma2 
officialID "CE12"
shortName "Mathe 2"
officialName "Mathematik 2"
semester 2
etcs 6
workingHoursSL 5
workingHoursBUE 1

module phy
officialID "CE15"
shortName "Physik"
officialName "Physik"
semester 2
etcs 5
workingHoursSL 4
workingHoursLPr 1

module prog2
officialID "CE23"
shortName "Programmieren 2"
officialName "Fortgeschrittene Algorithmen und Programmierung"
semester 2
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module ro
officialID "CE24"
shortName "Rechnerorganisation"
officialName "Rechnerorganisation"
semester 2
etcs 5
workingHoursSL 2
workingHoursLPr 2

module et2
officialID "CE41"
shortName "ET 2"
officialName "Elektrotechnische Grundlagen 2"
semester 2
etcs 5
workingHoursSL 2
workingHoursLPr 2

module fs2
officialID "BLAFS2"
shortName "Fremdsprache 2"
officialName "Fremdsprache 2"
semester 2
etcs 4
workingHoursPUE 4


//
// Semester 3
//
module adk
officialID "CE21"
shortName "ADK"
officialName "Algorithmen, Datenstrukturen und Komplexität"
semester 3
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module bs
officialID "CE25"
shortName "Betriebssysteme"
officialName "Betriebssysteme"
semester 3
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module digitSys
officialID "CE30"
shortName "Digitale Systeme"
officialName "Entwurf digitaler Systeme (FPGA-Entwurf)"
semester 3
etcs 5
workingHoursSL 2
workingHoursLPr 2

module anaelek
officialID "CE42"
shortName "Analogelektronik"
officialName "Analogelektronik"
semester 3
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module lpl
officialID "CE60"
shortName "Leiterplattenentwurf"
officialName "Leiterplattenentwurf"
semester 3
etcs 5
workingHoursSL 2
workingHoursLPr 2

module sv
officialID "CE61"
shortName "Signalverarbeitung"
officialName "Signalverarbeitung"
semester 3
etcs 5
workingHoursSL 2
workingHoursPCUE 2

//
// Semester 4
//

module mpt
officialID "CE20"
shortName "Mikroprozessortechnik"
officialName "Mikroprozessortechnik"
semester 4
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module cn
officialID "CE26"
shortName "CN"
officialName "Computernetzwerke"
semester 4
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module swt
officialID "CE27"
shortName "SWT"
officialName "Softwaretechnik"
semester 4
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module sysprog
officialID "CE28"
shortName "SysProg"
officialName "Systemprogrammierung"
semester 4
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module emb
officialID "CE31"
shortName "EmbSys"
officialName "Embedded Systems"
semester 4
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module mrt
officialID "CE62"
shortName "MRT"
officialName "Mess- und Regelungstechnik"
semester 4
etcs 5
workingHoursSL 2
workingHoursPCUE 2

//
// Semester 5
//

module db
officialID "CE29"
shortName "DB"
officialName "Datenbanken"
semester 5
etcs 5
workingHoursSL 2
workingHoursPCUE 2

module proj
officialID "CE71"
shortName "Projekt"
officialName "Projekt Computer Systems Engineering"
semester 5
etcs 5
workingHoursPCUE 1  
workingHoursPS 1

module sem
officialID "CE73"
shortName "Seminar"
officialName "Seminar Advanced Computer Systems"
semester 5
etcs 5 
workingHoursPS 2

module wp1
officialID "BLAWP1"
shortName "Wahlpflicht1"
officialName "Wahlpflichtmodul 1"
semester 5
etcs 5 
workingHoursPUE 2

module wp2
officialID "BLAWP2"
shortName "Wahlpflicht2"
officialName "Wahlpflichtmodul 2"
semester 5
etcs 5 
workingHoursPUE 2

module awe
officialID "BLAAWE"
shortName "AWE"
officialName "Fremdsprache oder AWE-Modul"
semester 5
etcs 4
workingHoursPUE 4

// erstreckt sich bis ins 6. Semester
module prakt
officialID "CE91"
shortName "Praktikum"
officialName "Praxisphase: Fachpraktikum"
semester 5
etcs 16
workingHoursPUE 1


//
// Semester 6
//
module bachsem
officialID "CE94"
shortName "Bachelorseminar"
officialName "Bachelorseminar und Kolloquium"
semester 6
etcs 3
workingHoursSL 1
workingHoursPS 1
`;

editorConfig.setMainCode(mainCode);

editorConfig.theme = 'vs-dark';
editorConfig.useLanguageClient = true;
editorConfig.useWebSocket = false;

const workerURL = new URL('./modul-land-karte-server-worker.js', import.meta.url);
console.log(workerURL.href);

const lsWorker = new Worker(workerURL.href, {
    type: 'classic',
    name: 'ModulLandKarte Language Server'
});
client.setWorker(lsWorker);

// keep a reference to a promise for when the editor is finished starting, we'll use this to setup the canvas on load
const startingPromise = client.startEditor(document.getElementById("monaco-editor-root"));

// Set a status message to display below the update button
function setStatus(msg) {
    document.getElementById('status-msg').innerHTML = msg;
}

let running = false;
const generateAndDisplay = (() => {
    if (running) {
        return;
    }
    running = true;
    setStatus('');
    console.info('generating and displaying information ...');
    const value = client.editor.getValue();
    if (window.localStorage) {
        window.localStorage.setItem('mainCode', value);
    }
    // execute custom command, and receive the response
    vscode.commands.executeCommand('parseAndGenerate', value).then((AST) => {
        return sendAstToVue(AST);
    }).catch((e) => {
        setStatus(e.toString());
    }).finally(() => {
        console.info('done...');
        running = false;
    });
});

function sendAstToVue(AST) {
    // Sendet den AST an das Quasar-Projekt
    window.parent.postMessage(AST, 'http://localhost:9000');
}




// Updates the mini-logo canvas
window.generateAndDisplay = generateAndDisplay;



startingPromise.then(() => {
    generateAndDisplay();
});

