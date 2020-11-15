'use strict';
import * as vscode from "vscode";
import { ReminderView } from './reminderView';
// import { Utility } from './utility';

export class Scheduler {
    public static timerId?: NodeJS.Timeout
    public static timerEnabled = true
    public static focusTime = 0
    public static TIMER_ACC = 1000
    public static threshold = 10 * 1000
    public constructor(private context: vscode.ExtensionContext) {

    }

    public static stopTimer(context: vscode.ExtensionContext) {
        console.log("stopTimer")
        if (Scheduler.timerId) {
            clearInterval(Scheduler.timerId)
        }
        Scheduler.timerId = undefined
    }

    public static disableBreath(context: vscode.ExtensionContext) {
        this.stopTimer(context)
        ReminderView.quitPanel(context)
        this.timerEnabled = false
    }

    public static enableBreath(context: vscode.ExtensionContext) {
        this.timerEnabled = true
        this.start(context)
    }

    public static onTimeout(context: vscode.ExtensionContext) {
        ReminderView.show(context)
    }

    public static checkTime(context: vscode.ExtensionContext) {
        if (Scheduler.focusTime >= Scheduler.threshold) {
            this.stopTimer(context)
            Scheduler.focusTime = 0
            this.timerEnabled = false
            this.onTimeout(context)
        }
    }
    
    public static start(context: vscode.ExtensionContext) {
        if (!this.timerEnabled || Scheduler.timerId != undefined)
            return
        console.log("startTimer")
        Scheduler.timerId = setInterval(() => {
            Scheduler.focusTime += Scheduler.TIMER_ACC
            console.log(`focusTime ${Scheduler.focusTime}`)
            this.checkTime(context)
        }, Scheduler.TIMER_ACC)
    }
}