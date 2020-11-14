'use strict';
import * as vscode from 'vscode';
import * as path from 'path';
import { Scheduler } from './scheduler';

export class ReminderView {
    private static panel: vscode.WebviewPanel | undefined;

    public static show(context: vscode.ExtensionContext) {
        if (this.panel) {
            this.panel.webview.html = this.generateHtml();
            this.panel.reveal();
        } else {
            this.panel = vscode.window.createWebviewPanel("breath", "呼吸", vscode.ViewColumn.Two, {
                enableScripts: true,
                retainContextWhenHidden: true
            });            
            this.panel.webview.onDidReceiveMessage(message => {
                switch (message) {
                    case 'close': {
                        this.panel?.dispose()
                        Scheduler.timerEnabled = true
                        Scheduler.start(context);
                    }
                }
            })
            this.panel.webview.html = this.generateHtml();

            this.panel.onDidDispose(() => {
                this.panel = undefined;
                Scheduler.timerEnabled = true
                Scheduler.start(context);
            });
        }
    }

    protected static generateHtml(): string {
        let html = `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>呼吸</title>
        
            <style>
                html,
                body {
                    overflow: hidden !important;
                }
        
                @keyframes enter {
                    from {
                        opacity: 0;
                    }
        
                    to {
                        opacity: 1;
                    }
                }
        
                @keyframes exit {
                    from {
                        opacity: 1;
                    }
        
                    to {
                        opacity: 0;
                    }
                }
        
                breath {
                    animation: 1s enter ease-out;
                    background: black;
                    position: fixed;
                    height: 100vh;
                    width: 100vw;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000000;
                }
        
                breath .progress-container {
                    margin-top: 100px;
                }
        
                breath .progress {
                    --width: 300px;
                    --height: 10px;
                    --percent: 100%;
                    width: var(--width);
                    height: var(--height);
                    background: #f1f2f7;
                    border-radius: calc(var(--height) / 2);
                    overflow: hidden;
                }
        
                breath .bar {
                    width: var(--percent);
                    height: var(--height);
                    min-width: 1%;
                    background: rgb(97, 190, 162);
                    border-radius: calc(var(--height) / 2);
                }
        
                breath .close button {
                    width: 0;
                    height: 0;
                    appearance: none;
                    visibility: hidden;
                }
        
                breath .close {
                    position: absolute;
                    top: 50px;
                    right: 50px;
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                    opacity: .3;
                    border-radius: 50%;
                    transition: all .3s ease-in-out;
                }
        
                breath .close:hover {
                    opacity: .7;
                    transform: rotate(90deg);
                }
        
                breath .close::before,
                breath .close::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: block;
                    width: 100%;
                    height: 3px;
                    transform-origin: center;
                    background-color: white;
                }
        
                breath .close::before {
                    transform: translateY(-50%) translateY(15px) rotate(45deg);
                }
        
                breath .close::after {
                    transform: translateY(-50%) translateY(15px) rotate(-45deg);
                }
        
                breath .hint {
                    font-family: sans-serif;
                    font-size: 20px;
                    font-weight: 800;
                    color: white;
                    animation: 3s hint-blink ease-in-out infinite alternate;
                }
        
                @keyframes hint-blink {
                    from {
                        opacity: .5;
                    }
        
                    to {
                        opacity: .8;
                    }
                }
        
                breath .flowers {
                    height: 125px;
                    width: 125px;
                    animation: breath-pulse 4s ease-in-out alternate infinite;
                }
        
                breath .circle {
                    height: 125px;
                    width: 125px;
                    border-radius: 50%;
                    position: absolute;
                    mix-blend-mode: screen;
                    transform: translate(0, 0);
                    animation: center 6s infinite;
                }
        
                breath .circle:nth-child(odd) {
                    background: #61bea2;
                }
        
                breath .circle:nth-child(even) {
                    background: #529ca0;
                }
        
                breath .circle:nth-child(1) {
                    animation: breath-circle-1 4s ease alternate infinite;
                }
        
                breath .circle:nth-child(2) {
                    animation: breath-circle-2 4s ease alternate infinite;
                }
        
                breath .circle:nth-child(3) {
                    animation: breath-circle-3 4s ease alternate infinite;
                }
        
                breath .circle:nth-child(4) {
                    animation: breath-circle-4 4s ease alternate infinite;
                }
        
                breath .circle:nth-child(5) {
                    animation: breath-circle-5 4s ease alternate infinite;
                }
        
                breath .circle:nth-child(6) {
                    animation: circle-6 4s ease alternate infinite;
                }
        
                @keyframes breath-pulse {
                    0% {
                        transform: scale(.15) rotate(180deg);
                    }
        
                    100% {
                        transform: scale(1);
                    }
                }
        
                @keyframes breath-circle-1 {
                    0% {
                        transform: translate(0, 0);
                    }
        
                    100% {
                        transform: translate(-35px, -50px);
                    }
                }
        
                @keyframes breath-circle-2 {
                    0% {
                        transform: translate(0, 0);
                    }
        
                    100% {
                        transform: translate(35px, 50px);
                    }
                }
        
                @keyframes breath-circle-3 {
                    0% {
                        transform: translate(0, 0);
                    }
        
                    100% {
                        transform: translate(-60px, 0);
                    }
                }
        
                @keyframes breath-circle-4 {
                    0% {
                        transform: translate(0, 0);
                    }
        
                    100% {
                        transform: translate(60px, 0);
                    }
                }
        
                @keyframes breath-circle-5 {
                    0% {
                        transform: translate(0, 0);
                    }
        
                    100% {
                        transform: translate(-35px, 50px);
                    }
                }
        
                @keyframes circle-6 {
                    0% {
                        transform: translate(0, 0);
                    }
        
                    100% {
                        transform: translate(35px, -50px);
                    }
                }
            </style>
        </head>
        
        <breath>
            <div class="flowers">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>

            <label for="breath-close-btn" class="close">
                <button id="breath-close-btn"></button>
            </label>
            <div class="progress-container">
                <div class="progress" id="progress">
                    <div class="bar"></div>
                </div>
            </div>
            <div class="hint"><br><br><br><br><span>沉静下来，</span><br><span>将注意力放在呼吸上。</span></div>
        </breath>
        
        <body>
            <script>

                const BREATH_TIME = 50// seconds
                let breathActive = false

                let progress = document.getElementsByClassName("progress")[0]
                let bar = document.getElementsByClassName("bar")[0]
                let closeBtn = document.getElementsByClassName("close")[0]
                console.log(bar)
                bar.style.cssText = \`transition: width 50s linear\`
                bar.scrollTop // trigger reflow
                progress.style.cssText = \`--percent: 0%\`
                let timerId = setTimeout(exit, BREATH_TIME * 1000)
        
                closeBtn.addEventListener('click', () => {
                    console.log("tttttt")
                    clearInterval(timerId)
                    exit()
                })
                let vscode = acquireVsCodeApi()
                function exit() {
                    vscode.postMessage("close")
                }
            </script>
        
        </body>
        
        </html>
        `;

        return html;
    }
}