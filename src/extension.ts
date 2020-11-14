// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {ReminderView} from './reminderView';
import {Scheduler} from './scheduler';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	Scheduler.start(context);
	// const scheduler = new Scheduler(context);
	// scheduler.start();

	context.subscriptions.push(vscode.commands.registerCommand('deepbreath.enablebreath', () => {
		Scheduler.enableBreath(context)
	}));
	context.subscriptions.push(vscode.commands.registerCommand('deepbreath.disablebreath', () => {
		Scheduler.disableBreath(context)
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
