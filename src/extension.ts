import * as vscode from 'vscode'; //Importa a "biblioteca" do VS Code.
import { pedirInputAoUsuario } from './utils';

export function activate(context: vscode.ExtensionContext) {


	console.log('ta funcionando seu lixo');

	//Cria a função e da o nome
	const mostrar_mensagem = pedirInputAoUsuario();
	//vscode.window.showInformationMessage('');
	
}

export function deactivate() {}
