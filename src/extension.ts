import * as vscode from 'vscode'; //Importa a "biblioteca" do VS Code.
import { pedirInputAoUsuario, pegar_chave_json, verifiar_chave, mensagem_erro_chave} from './utils';
import { Chave_gemini } from './services/gemini';

export function activate(context: vscode.ExtensionContext) {
	let descartavel = vscode.commands.registerCommand('ai-code-reviewer', async () => {
		const chave = pegar_chave_json();
		let retorno_verificacoes = {
			"chave": "",
			"valido": false
		};
		if (!chave) {
			retorno_verificacoes = await mensagem_erro_chave();
		} else {
			if (verifiar_chave(chave)) {
				const gemini = new Chave_gemini(chave);
				vscode.window.showInformationMessage(`Chave API configurada`);
			} else {
				retorno_verificacoes = await mensagem_erro_chave("Chave API incorreta", "Configurar Novamente");
			}
		}
		//vscode.window.showInformationMessage('');
	}

);
}

export function deactivate() {}
