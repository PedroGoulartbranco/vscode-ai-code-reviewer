import * as vscode from 'vscode'; //Importa a "biblioteca" do VS Code.
import { decidir_modelo_de_resposta} from './engine';
import { pegar_arquivo_atual, verifiar_chave, pegar_chave_json, pedirInputAoUsuario, mensagem_erro_chave, pegar_idioma } from './utils';
import { Gemini_Bot } from './services/gemini';
import { mostrar_erro } from './ui-utils';

export function activate(context: vscode.ExtensionContext) {
	let descartavel = vscode.commands.registerCommand('ai-code-reviewer', async () => {
		const chave = pegar_chave_json();
		const config = vscode.workspace.getConfiguration('aiReviewer');
		let retorno_verificacoes = {
			"chave": "",
			"valido": false
		};
		let informacoes_arquivo = {
			"nome": "",
			"codigo": "",
			"linguagem": ""
		};
		
		if (!chave) {
			retorno_verificacoes = await mensagem_erro_chave();
		} else {
			if (verifiar_chave(chave)) {
				const gemini = new Gemini_Bot(chave);
				retorno_verificacoes = {"chave": gemini.chave_string, "valido": true};
			} else {
				retorno_verificacoes = await mensagem_erro_chave("Chave API incorreta", "Configurar Novamente");
			}
		}

		if (retorno_verificacoes.valido) {
			await config.update('apiKey', retorno_verificacoes.chave, vscode.ConfigurationTarget.Global);
			const gemini = new Gemini_Bot(chave);
			try {
				informacoes_arquivo = pegar_arquivo_atual();
				decidir_modelo_de_resposta(informacoes_arquivo.nome, informacoes_arquivo.linguagem, informacoes_arquivo.codigo, gemini);
			} catch(erro) {
				mostrar_erro(erro);
			}
		} else {
			vscode.window.showInformationMessage("Chave incorreta tente novamente");
		}
	}

);
}

export function deactivate() {}
