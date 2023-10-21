import { MonacoEditorLanguageClientWrapper } from './monaco-editor-wrapper/index.js';
import { buildWorkerDefinition } from "./monaco-editor-workers/index.js";
import monarchSyntax from "./syntaxes/modul-land-karte.monarch.js";

buildWorkerDefinition('./monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId('modul-land-karte');

editorConfig.setMonarchTokensProvider(monarchSyntax);

editorConfig.setMainCode(`// ModulLandKarte is running in the web!`);

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
    vscode.commands.executeCommand('parseAndGenerate', value).then((minilogoCmds) => {
        return updateMLKCanvas(minilogoCmds);
    }).catch((e) => {
        setStatus(e);
    }).finally(() => {
        console.info('done...');
        running = false;
    });
});

// Updates the mini-logo canvas
window.generateAndDisplay = generateAndDisplay;

// Takes generated MiniLogo commands, and draws on an HTML5 canvas
function updateMLKCanvas(cmds) {
    const canvas = document.getElementById('mlk-canvas');
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.strokeStyle = '#333';
    for (let x = 0; x <= canvas.width; x+=(canvas.width / 10)) {
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y+=(canvas.height / 10)) {
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
    }
    context.stroke();

    context.strokeStyle = 'white';

    // maintain some state about our drawing context
    let drawing = false;
    let posX = 0;
    let posY = 0;

    const doneDrawingPromise = new Promise((resolve) => {
        // use the command list to execute each command with a small delay
        const id = setInterval(() => {
            if (cmds.length > 0) {
                //dispatchCommand(cmds.shift(), context);
            } else {
                // finish existing draw
                if (drawing) {
                    context.stroke();
                }
                clearInterval(id);
                resolve();
            }
        }, 1);
    });

    /*
    // dispatches a single command in the current context
    function dispatchCommand(cmd, context) {
        if (cmd.cmd) {
            switch (cmd.cmd) {
                // pen is lifted off the canvas
                case 'penUp':
                    drawing = false;
                    context.stroke();
                    break;

                // pen is put down onto the canvas
                case 'penDown':
                    drawing = true;
                    context.beginPath();
                    context.moveTo(posX, posY);
                    break;

                // move across the canvas
                // will draw only if the pen is 'down'
                case 'move':
                    const x = cmd.x;
                    const y = cmd.y;
                    posX += x;
                    posY += y;
                    if (!drawing) {
                        // move, no draw
                        context.moveTo(posX, posY);
                    } else {
                        // move & draw
                        context.lineTo(posX, posY);
                    }
                    break;

                // set the color of the stroke
                case 'color':
                    if (cmd.color) {
                        // literal color or hex
                        context.strokeStyle = cmd.color;
                    } else {
                        // literal r,g,b components
                        context.strokeStyle = `rgb(${cmd.r},${cmd.g},${cmd.b})`;
                    }
                    break;

            }
        }
    }
    */
    return doneDrawingPromise;
}

startingPromise.then(() => {
    generateAndDisplay();
});

