import * as vscode from 'vscode'; //Importa a "biblioteca" do VS Code.
import { pedirInputAoUsuario, pegar_chave_json } from './utils';

export function activate(context: vscode.ExtensionContext) {
	let descartavel = vscode.commands.registerCommand('ai-code-reviewer', async () => {
		const chave = pegar_chave_json();
		if (!chave) {
			const escolha = await vscode.window.showErrorMessage(
				"Gemini API Key não encontrada!",
				"Configurar Agora" 
			);
			if (escolha) {
				//Retorna uma lista [chave, True ou False]
				const lista_resposta_chave_e_booleano = pedirInputAoUsuario();
			}
		} else {
			vscode.window.showInformationMessage(`Chave: ${chave}`);
		}
		//vscode.window.showInformationMessage('');
	}

);
}

export function deactivate() {}
