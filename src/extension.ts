import * as vscode from 'vscode'; //Importa a "biblioteca" do VS Code.
import { decidir_modelo_de_resposta} from './engine';
import { pegar_arquivo_atual, verifiar_chave, pegar_chave_json, pegar_idioma } from './utils';
import { Gemini_Bot } from './services/gemini';
import { mostrar_erro } from './ui-utils';

export function activate(context: vscode.ExtensionContext) {
	let descartavel = vscode.commands.registerCommand('ai-code-reviewer', async () => {
		const config = vscode.workspace.getConfiguration('aiReviewer');
		let idioma = await pegar_idioma();
		let chave: any;
		let retorno_verificacoes = {
			"chave": "",
			"valido": false
		};
		let informacoes_arquivo = {
			"nome": "",
			"codigo": "",
			"linguagem": ""
		};
		try {
			chave = pegar_chave_json();
			verifiar_chave(chave);
			const gemini = new Gemini_Bot(chave);
			try {
				informacoes_arquivo = pegar_arquivo_atual();
				decidir_modelo_de_resposta(informacoes_arquivo.nome, informacoes_arquivo.linguagem, informacoes_arquivo.codigo, gemini, String(idioma));
			} catch(erro) {
				mostrar_erro(erro);
			}
		} catch (erro) {
			mostrar_erro(erro);
		}
	}

);
}

export function deactivate() {}
