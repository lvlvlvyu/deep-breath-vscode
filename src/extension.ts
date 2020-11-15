// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ReminderView } from './reminderView';
import { Scheduler } from './scheduler';

export function activate(context: vscode.ExtensionContext) {
	Scheduler.start(context);


	context.subscriptions.push(vscode.commands.registerCommand('deepbreath.enablebreath', () => {
		Scheduler.enableBreath(context)
		vscode.window.showInformationMessage("成功启用deepbreath插件");

	}));
	context.subscriptions.push(vscode.commands.registerCommand('deepbreath.start',()=>{
		vscode.window.showInformationMessage("成功激活deepbreath插件");
	}));

	context.subscriptions.push(vscode.commands.registerCommand('deepbreath.disablebreath', () => {
		Scheduler.disableBreath(context)
		vscode.window.showInformationMessage("成功禁用deepbreath插件");

	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
