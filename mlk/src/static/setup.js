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
// Default example!
model v001

curriculum ce_ba
type bachelor
displayShortName "CE(BA)"
fullName "Computer Engineering"
status running
noSemesters 6
url "https://ce-bachelor.htw-berlin.de/fileadmin/HTW/Zentral/Rechtsstelle/Amtliche_Mitteilungsblaetter/2020/24_20.pdf"

supplementaryCurriculumInformation

prerequisiteSection
// 2. Semester
ma1 -> ma2 recommended topics : Mengenlehre, Folgen_Reihen
fs1 -> fs2 recommended
et1 -> et2 recommended
et1 -> ro recommended
prog1 -> prog2 recommended
// 3. Semester
prog2 -> adk recommended
prog1 -> bs recommended
dt1 -> digitSys recommended
et1 -> anaelek recommended
et1 -> lpl recommended
et2 -> lpl recommended
ma2 -> sv recommended
dt1 -> sv recommended
// 4. Semester
ro -> mpt recommended
dt1 -> mpt recommended
dt1 -> cn recommended
prog2 -> swt recommended
prog1 -> sysprog recommended
swt -> emb recommended
ma2 -> mrt recommended
anaelek -> mrt recommended
// 5. Semester
swt -> db recommended
fs2 -> awe recommended

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
shortName "Projekt CSE"
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

supplementaryCurriculumInformation


learningOutcomeSection


//
// Semester 1
//
ma1 
"
Die Studierenden kennen die elementaren Grundlagen der Linearen Algebra und Analysis und lernen, damit lineare Gleichungssysteme eines technischen Studienganges aufzubereiten und zu lösen, auch mit den Methoden der Matrizenrechnung. Die Studierenden setzen die sich in ihrem Studiengang stellenden räumlich-geometrischen Probleme mit den Methoden der Vektorrechnung mathematisch um und bearbeiten diese. Sie übersetzen durch einen funktionalen Zusammenhang beschreibbare Probleme in die Sprache der Mathematik und lösen diese, insbesondere mit den Methoden der Differentialrechnung. Sie erlernen ein Verständnis für den Umgang mit komplexen Zahlen und komplexen Funktionen als Hilfsmittel und wenden diese zur Lösung von Problemen ihres eigenen Studienganges an.
"

prog1
"
Die Studierenden entwerfen Lösungen zu einfachen Programmieraufgaben und stellen diese als Algorithmus in einem Flussdiagramm, Programmablaufplan o.ä. unmissverständlich dar. Sie programmieren die Lösungen in einer industrierelevanten imperativen Programmiersprache (ggf. auch mit den Imperativen Sprachelementen einer objektorientierten Programmiersprache). Dabei wissen sie um Datentypen, Ein- und Ausgabe von der Tastatur bzw. auf den Bildschirm, Schleifen, Bedingungen/Verzweigungen, Funktionen sowie Dateien und wenden die Kenntnisse sicher an. Sie verstehen Compilieren und Linken und wissen, wie Daten im Speicher repräsentiert sind. Sie kennen Dezimal-, Binär- und Hexadezimalsystem und wenden diese an.
"

et1
"
Die Studierenden verfügen über die Grundlagenkenntnisse der Elektrotechnik (Ladung, Strom, Spannung, Leistung, Widerstand, Kondensator, Spule). Sie wenden die Verfahren zur Netzwerksberechnung für Gleich- und Wechselstromkreise an.
"

dt1
"
Die Studierenden verstehen die boolesche Algebra und wenden diese an. Sie realisieren kombinatorische Gatterschaltungen und nutzen Techniken zur Minimierung kombinatorischer Logik, wie z.B. KV-Diagramme (Karnaugh-Diagramme). Sie kennen die Funktionsweise von Flip Flops und entwerfen Zustandsautomaten. Sie verstehen die Arbeitsweise programmierbarer Bausteine wie PALs, CPLDs, FPGAs, Speicher und realisieren digitale Hardware auf der Registertransferebene, mittels schematischer Schaltungseingabe oder auf Basis von Hardwarebeschreibungssprachen.
"

einfce
"
Die Studierenden überblicken die Berufsfelder von Ingenieuren und Informatikern, die an den Nahtstellen von Hard- und Software arbeiten. Sie benennen einige der aktuellen industriellen Entwicklungen sowie Forschungsfelder im Fachgebiet. Sie erläutern für ausgewählte eingebettete Systeme deren Grundaufbau und Funktionsweise und stellen einen Zusammenhang mit den Grundlagenfächern Elektrotechnik, Elektronik, Mathematik und Programmierung her. Die Studierenden kennen die Anforderungen an wissenschaftliche Arbeiten und können diese in eigenen Ausarbeitungen umsetzen.
"


fs1
"
Sprachspezifisch.
"


//
// Semester 2
//
ma2 
"
Die Studierenden vertiefen ihr Verständnis der mathematischen Methoden und Grundlagen der Algebra und Analysis. Sie verfügen damit über ein erweitertes theoretisches Wissen, vertiefen die Fertigkeit zur praktischen Arbeit und verbinden diese Fähigkeiten zur Aufbereitung und Lösung von Integrationsproblemen (Flächenberechnung, Fourier-Reihen, Fourier-Integral) und deren Umsetzung zur Lösung relevanter Probleme im eigenen Studiengang. Sie arbeiten theoretisch und praktisch mit gewöhnlichen Differentialgleichungen und deren Lösungen, direkt und mittels der Laplace-Transformation. Die Studierenden kennen wahrscheinlichkeitstheoretische Begriffe und Wissen um deren Umsetzung in elementare Probleme der angewandten Statistik eines technischen Studienganges, deren Aufbereitung und Lösung.
"

phy
"
Die Studierenden verstehen die wichtigsten physikalischen Gesetzmäßigkeiten aus den Bereichen Mechanik, Optik, Schwingungen und Wellen und wenden diese Kenntnisse auf die Bewertung physikalisch-technischer Vorgänge in der Praxis an. Sie planen physikalisch-technische Untersuchungen, führen diese durch, werten sie einschließlich der Fehlerrechnung aus und beurteilen die Ergebnisse.
"

prog2
"
Die Studierenden programmieren zu gegebenen Aufgabenstellungen Lösungen in einer industrierelevanten imperativen (ggf. auch objektorientierten) Programmier-sprache. Dabei verwenden sie vertiefte Kenntnisse und Fähigkeiten, z.B. über Funktionen, Zeiger, Objekte sowie Sprachelemente der strukturierten, prozeduralen und/oder objektorientierten Programmierung. Bei der Umsetzung von selbst entwickelten Algorithmen verwenden und adaptieren die Studierenden bekannte Algorithmen wie z.B. zum Sortieren. Ihren Programmcode bauen sie so auf, dass auch größere Projekte (z.B. modular sowie gut dokumentiert) realisiert und existierende Bibliotheken sinnvoll genutzt werden.
"

ro
"
Die Studierenden verstehen Funktion und Struktur von Rechneranlagen. Sie unterscheiden alle Aspekte der Funktion und Struktur des Zentralprozessors (ZE). Die Studierenden wissen um die Art wie die Elemente eines Rechners mit dem Ziel der Datenverarbeitung untereinander agieren. Sie kennen die Turing- und von Neumann Maschinen als Grundlagen zur automatisierten Verarbeitung von in Algorithmen formalisierten Aufgaben, grundlegende Befehlssatzarchitekturen und -abarbeitung, Assemblerprogrammierung, Ein-/Ausgabe-System, Schnittstellen, Interrupt-Verarbeitung und Bus-Systeme. Die Studierenden betrachten eine Fallstudie und lernen aktuelle Entwicklungen in der Rechnerorganisation wie die RISC/CISC-Architektur, das Pipelining des Maschinenbefehlszykluses und die Sprungvorhersage kennen. Sie optimieren RISC-Programme zur Vermeidung von Pipeline-Konflikten, passen daraufhin ihre Software-Lösungen an aktuelle Prozessorarchitekturen an und steigern die Rechenleistung.
"

et2
"
Die Studierenden verstehen die Berechnungsmethoden und Gesetze elektromagnetischer Felder. Sie analysieren das Zeit- Frequenz- und Schaltverhalten von Bauelementen, einfachen elektrischen Netzwerken und Resonanzkreisen. Die Studierenden wenden Ortskurven und Bodediagramme zur Beschreibung von Frequenzabhängigkeiten an.
"

fs2
"
Sprachspezifisch.
"


//
// Semester 3
//
adk
"
Die Studierenden wenden grundlegende Datenstrukturen und grundlegende Kontrollstrukturen imperativer Programmiersprachen sachgerecht an. Sie kennen die Vor-/Nachteile von Standardalgorithmen bei unterschiedlichen Datenstrukturen und analysieren diese hinsichtlich Laufzeitverhalten und Ressourcenverbrauch. Die Studierenden vergleichen alternative Algorithmen zur Lösung eines Problems auf Grundlage eigener Komplexitätsanalyse und kombinieren mehrere Algorithmen zur Lösung eines komplexen Problems. Sie wenden Heuristiken zur Algorithmenkombination zur Lösung eines komplexen Problems sowie Strategien für den Entwurf und die Analyse von Algorithmen an. Die Studierenden klassifizieren Problemklassen und setzen Algorithmen nach ihrer Komplexität ein.
"

bs
"
Die Studenten kennen die Basiskonzepte moderner Betriebssysteme als Schnittstelle zwischen der Computer-Hardware und den jeweiligen Anwendungsprogrammen. Sie verstehen die grundlegenden Funktionsprinzipien von CPU-, Memory-, File-, und I/O-Management in universellen Multiuser-/Multitasking- und spezialisierten Realzeit-Betriebssystemen und können mit graphischen und textbasierten Benutzungsschnittstellen (GUI, Shells) von Standard-Betriebssystemen sicher umgehen. Sie verstehen die Basisfunktionalität der Betriebssystem-Programmierschnittstelle (API) und kennen die grundlegenden Systemaufrufe in universellen Betriebssystemen. Zudem besitzen sie umfangreiche praktische Fertigkeiten bei der Programmierung von Shell-Skripten.
"

digitSys
"
Die Studierenden kennen den gesamten Prozess des FPGA-Entwurfs beginnend beim Schaltungsentwurf, über die Simulation bis zur Programmierung eines FPGA. Sie behandeln, basierend auf der Hardwarebeschreibungssprache VHDL, verschiedene Signaltypen und deren Eigenschaften und Anwendungsbereiche, die Anwendung von Signalen und Variablen, Verhaltens- und Strukturbeschreibung, Testbenches, Nebenläufige Anweisungen und die Verwendung von Hochsprachenelementen in Prozessen. Die Studierenden realisieren praktisch VHDL-Beschreibungen auf einem Evaluation-Board und verifizieren den Entwurf durch Simulation und messtechnische Verifikation der realisierten Hardware.
"

anaelek
"
Die Studierenden verfügen über Grundkenntnisse und -fertigkeiten für den Schalt-kreisentwurf zur analogen Signalaufbereitung, der Signalmessung sowie der Nut-zung von Messgeräten und Messsystemen. Sie entwickeln einfache Konzepte der Aufbereitung von Signalen mittels Verstärkerschaltungen und wissen um einfache Transistor-Verstärkerschaltungen, Grundschaltungen von Operationsverstärkern sowie Grundschaltungen zur Analog/Digitalwandlung und zur Digital/Analog Wandlung. Sie kennen die Messung elektrischer Grundgrößen, Baugruppen und Verfahren der digitalen Messtechnik genauso wie die Simulation einfacher Mess-schaltungen.
"

lpl
"
Die Studierenden kennen den gesamten Prozess beginnend beim Schaltungsentwurf, über die Simulation und den Layoutentwurf bis zum Leiterplattenentwurf und deren Herstellung. Sie entwerfen elektronische Schaltungen (Stromlaufplaneingabe: Platzieren von Bauelementen, Verbinden, Packaging, Backannotation, Busse, Netzlisten, Rulechecks, Bibliotheken, Editieren und Erstellen von Bauelementen), wissen um Simulation (Analogsimulation, Digitalsimulation, Mixed-Mode- Simulation, Simulation nichtlinearer Schaltungen) und Layoutentwurf (Routingalgorithmus, Routingstrategie, Routerarten, Routingparameter, Outlines, Sperrfläche, Plazierungsalgorithmen, Pin- und Gateswap, Nachbearbeitung, Gerberdaten, Bohrdaten, Masken).
"

sv
"
Die Studierenden beherrschen die mathematischen Grundlagen zur Beschreibung von Signalen und Systemen im Zeit- und im Frequenzbereich (Fourier–Reihe, Fourier–Transformation, Laplace–Transformation). Sie bearbeiten und beschreiben einfache Aufgaben aus der Nachrichtentechnik, der Informationstechnik oder der Energietechnik mit Hilfe der Systemtheorie. Ausgehend von der kontinuierlichen Signal- und Systembeschreibung gehen die Studierenden mit Hilfe der Signalabtastung über zur diskreten Signal- und Systembeschreibung. In Übungsaufgaben entwerfen sie Filter als digitale Schaltungen oder als Programme für Signalprozessoren auf Basis der Z–Transformation.
"

//
// Semester 4
//

mpt
"
Die Studierenden haben erweiterte Kenntnisse über Konzepte von Mikroprozessoren, die der Steigerung der Bearbeitungsgeschwindigkeit von Software dienen. Sie kennen Techniken für die Parallelverarbeitung von Instruktionen (z.B. Fließbandverarbeitung und spekulative Ausführung) und wissen wie Prozessoren die Parallelisierung auf Thread-Ebene unterstützen (z.B. Mehrkernprozessoren), und welche architekturellen Änderungen sich daraus z.B. bei Caches ergeben. Die Studierenden setzen sich mit den Verfahren in Hinblick auf mögliche Sicherheitsrisiken durch Seitenkanalattacken auseinander. Weiterhin sind sie mit den Besonderheiten und Vorzügen der Virtualisierung und mit heterogenen Rechnerarchitekturen vertraut.
"

cn
"
Die Studierenden verstehen Grundlagen in der Kommunikation PC-basierter Systeme. Sie unterscheiden den Datenaustausch sowohl zwischen CPU und Peripherie als auch zwischen Computersystemen und führen Berechnungen zum parallelen, seriellen, synchronen und asynchronen Datenaustausch zwischen Rechner und Rechner bzw. Rechner und Peripherie durch. Die Studierenden beurteilen die Funktionsweise und Leistungsfähigkeit von PC-Schnittstellen und den hardwaretechnischen Aufbau von PC-spezifischen externen wie internen Schnittstellen (Bsp. AGP, USB, FireWire etc., PCIe, Ethernet etc.). Sie schätzen die Nutzbarkeit einer Schnittstelle für eine Problemlösung ein und kennen die softwaretechnische und hardware-nahe Integration von Schnittstellen für Computersysteme. Die Studierenden vergleichen Bussysteme, erlernen den Aufbau und die Wirkungsweise und den Zusammenhang zu Protokollstapel wie z.Bsp. das ISO/OSI-Referenzmodell und TCP/IP Netzwerkprotokoll.
"

swt
"
Die Studierenden überblicken bestehende Softwareentwicklungsprozesse und kennen für etablierte Entwicklungsprozesse deren Phasen, Rollen und Artefakte. Sie betrachten den Softwarelebenszyklus mit seinen grundlegenden Phasen: Analyse, Entwurf, Programmierung, Test/Qualitätssicherung und Wartung. Die Studierenden kennen einen Großteil der UML-Diagramme und erläutern, welche Eigenschaften eines Systems hiermit modellierbar sind. Sie nutzen verschiedene Diagrammarten der UML, um verschiedene Aspekte eines Systems zu modellieren. Die Studierenden kennen wichtige Werkzeuge der professionellen Softwareentwicklung (Versionsverwaltung, Build-Management, Continuous Integration, Collaboration Tools) und verstehen die Grundlagen von modellgetriebener Softwareentwicklung und von Domänenspezifischen Sprachen. Sie überblicken wichtige Methoden der Qualitätssicherung (Test, Validierung, Verifikation).
"

sysprog
"
Die Studenten untersuchen die Basisalgorithmen der Betriebssystemsoftware und analysieren die Implementierung typischer Betriebssystemfunktionen in modernen Betriebssystemen am Beispiel des Linux-Kernels. Dabei erwerben sie praxisorientierte Kenntnisse der Systemprogrammierung und des Betriebssystem-Engineerings. Die Studenten nutzen moderne Software-Konzepte und setzen diese beim systematischen Entwurf und bei der Implementierung von Systemsoftware sicher um. Sie verstehen die Basisfunktionalität der Betriebssystem-Programmierschnittstelle (API) und kennen die wichtigsten Systemaufrufe. Die Studierenden analysieren gängige Methoden der Interprozess-Kommunikation und –Synchronisation und setzen diese bei der Softwareentwicklung für spezialisierte Computersysteme praktisch ein.
"

emb
"
Die Studierenden kennen die Grundlagen von Eingebetteten Systemen, Charakteristiken von Embedded Software (Firmware, Echtzeitbetriebssysteme) und entwerfen Eingebettete Systeme in Abhängigkeit von verschiedensten Anforderungen (Echtzeit, Schnittstellen, Datenmenge, Energieverbrauch, Kosten etc.). Ausgehend von einer Problembeschreibung sind die Studierenden in der Lage, einen integrierten Entwurf von Embedded Systems, bestehend aus Hardware, Firmware und An-wendungen, durchzuführen. Des Weiteren kennen die Studierenden verschiedene Möglichkeiten der Systemverifikation wie Messung von Signalen, Hardware-Cosimulation mit Matlab/Simulink, Chipscope und Zustandssignalisierung über LED.
"

mrt
"
Die Studierenden verfügen über Grundkenntnisse und Grundfertigkeiten zur Messung elektrischer und physikalischer Größen und die dafür notwendigen Sensoren und Aktoren. Sie kennen direkte und indirekte Messverfahren und Messkonzepte bis hin zu Konzepten der Datenauswertung. Darüber hinaus sind die Studierenden in der Lage einfache elektrische Messaufgaben zu lösen, die Ergebnisse zu bewerten und Routinemessungen zu automatisieren. Sie realisieren Messkonzepte beispielhaft anhand von Mikrokontroller und/oder FPGA-basierten Systemen. Die Studierenden erwerben regelungstechnische Kenntnisse und sind in der Lage, praktische Aufgabenstellungen im Bereich der Regelungstechnik zu bearbeiten. Sie sind insbesondere in der Lage, einfache statische und dynamische Systeme zu untersuchen und zu vergleichen. Weiterhin erwerben Studierende die Kompetenz, selbständig Reglerentwürfe für einfache Regelkreise durchzuführen.
"

//
// Semester 5
//

db
"
Die Studierenden unterscheiden Aufgaben und Einsatzszenarien für Informationssysteme. Sie beherrschen Techniken zur Informationsmodellierung mit Tabellen/Relationen und ermitteln Normalform für gegebene Tabellen und Datenbestand. Die Studierenden betrachten den Entwurf einer relationalen Datenbank für ein grob spezifiziertes Problem und erkennen sicher funktionale Abhängigkeiten innerhalb eines gegebenen Datenbestands. Sie wissen um den Aufbau und Einsatz der Standard-Abfragesprache SQL, um alternative Konzepte der Datenhaltung (Dokumenten-DB, Graph-DB) und um Erweiterungen zu SQL für spezielle Problembereiche (z.B. räumliche Daten). Die Studierenden wenden die Sprache SQL zum Anlegen, Abfragen und Manipulieren eines Datenbestands an.
"

proj
"
Die Studierenden erfahren erste Schritte zur Programmierung von Logiksystemen. Sie beherrschen den systematischen Entwurf einfacher Funktionen, Algorithmen und Ablauflaufsteuerungen anhand von programmierbaren Logiksystemen (FPGA und MC).
"

sem
"
Die Studierenden erfahren weiterführende Kenntnisse in der Programmierung von Embedded Systems auf MC und/oder FPGA-Basis. Sie implementieren IP-Blöcke in VHDL und/oder Verilog zu komplexen Funktionen auf einem FPGA und lernen auf der Basis von MC und FPGAs mit Soft-IP die Entwicklung von Echtzeitsystemen kennen.
"

wp1
"
Fachspezifisch.
"

wp2
"
Fachspezifisch.
"

awe
"
Fachspezifisch.
"
// erstreckt sich bis ins 6. Semester
prakt
"
Die Studierenden kennen die realen, technischen, organisatorischen, wirtschaftlichen und sozialen Bedingungen der Arbeitswelt des Ingenieurs bzw. der Ingenieurin. Sie wenden im Studium erworbenes Wissen und vermittelte Fertigkeiten und Fähigkeiten unter Anleitung zur selbständigen Lösung von einfachen ingenieur-technischen Aufgabenstellungen an. Die Studierenden beweisen innerhalb eines Projektes, das durchaus mit industriellen Projekten korrespondieren soll, lösungsorientiert ihre Praxistauglichkeit. Sie eignen sich praktische Arbeitstechniken, Arbeitsweisen und fachunabhängige Schlüsselqualifikationen, wie Teamarbeit und Aufgabenteilung an. Das Projekt dient im Rahmen des Praktikums als berufsorientierender Praxiseinstieg.
"


//
// Semester 6
//
bachsem
"
Das Bachelorseminar dient der fachlichen, methodischen und organisatorischen Begleitung der Bachelorarbeit sowie der abschließenden Präsentation und Verteidigung im Kolloquium.
Die Studierenden wenden die Grundlagen des wissenschaftlichen Arbeitens zur zeitlichen und inhaltlichen Planung konzeptionell und strukturiert in der Bachelorarbeit an und präsentieren diese. Sie führen Literaturrecherchen durch, zitieren verwendete Quellen korrekt und verfügen über eine ausreichende Methodenkompetenz, um den Qualitätsanforderungen bei der Abfassung ihrer Bachelorarbeit gerecht zu werden.
Während des Seminars erlernen und gestalten die Studierenden aktiv einen nachhaltigen wissenschaftlichen und praktischen Erfahrungsaustausch, beispielsweise durch kurze Statusreferate und das Präsentieren von (Teil-)Ergebnissen ihrer Arbeiten.
Die Studierenden präsentieren im Kolloquium strukturiert, prägnant und überzeugend in der vorgegebenen Zeit ihre Bachelorarbeit und stellen sich mit Erfolg einer wissenschaftlichen Diskussion ihrer Ergebnisse.
"

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
//function setStatus(msg) {
//    document.getElementById('status-msg').innerHTML = msg;
//}

let running = false;
const generateAndDisplay = (() => {
    if (running) {
        return;
    }
    running = true;
    //setStatus('');
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


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('load-from-file').addEventListener('click', loadFromFile);
    document.getElementById('curriculum1').addEventListener('click', () => loadPreset('ceBa_abWS2021.mlk'));
    document.getElementById('curriculum2').addEventListener('click', () => loadPreset('ceBa_bisSoSe20.mlk'));
    document.getElementById('curriculum3').addEventListener('click', () => loadPreset('ceMa_abWS2324.mlk'));
    document.getElementById('curriculum4').addEventListener('click', () => loadPreset('ceMa_bisSoSe23.mlk'));
});

function loadFromFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            client.editor.setValue(content);
        };
        reader.readAsText(file);
    }
}

function loadPreset(presetPath) {
    fetch(presetPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            client.editor.setValue(data);
        })
        .catch(error => {
            console.error('Error loading the preset:', error);
        });
}



// Updates the mini-logo canvas
window.generateAndDisplay = generateAndDisplay;



startingPromise.then(() => {
    generateAndDisplay();
});

