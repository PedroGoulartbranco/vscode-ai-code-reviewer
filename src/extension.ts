import * as vscode from 'vscode'; //Importa a "biblioteca" do VS Code.

export function activate(context: vscode.ExtensionContext) {


	console.log('ta funcionando seu lixo');

	//Cria a função e da o nome
	const mostrar_mensagem = vscode.commands.registerCommand('teste', () => { 

		vscode.window.showInformationMessage('Hello World from ai-code-reviewer!');
	});

	context.subscriptions.push(mostrar_mensagem);
}

export function deactivate() {}
