import * as vscode from 'vscode'; //Importa a "biblioteca" do VS Code.
import { pedirInputAoUsuario } from './utils';

export function activate(context: vscode.ExtensionContext) {
	let descartavel = vscode.commands.registerCommand('ai-code-reviewer', async () => {
		console.log('ta funcionando seu lixo');

		//Retorna uma lista [chave, True ou False]
		const lista_resposta_chave_e_booleano = pedirInputAoUsuario();
		//vscode.window.showInformationMessage('');
	}

);
}

export function deactivate() {}
