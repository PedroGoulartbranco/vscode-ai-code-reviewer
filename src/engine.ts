import * as vscode from 'vscode'; 
import { Gemini_Bot } from './services/gemini';
import {  mostrar_revisao, mostrar_erro} from './ui-utils';
import { verifiar_chave, pedirInputAoUsuario, pegar_modelo_json } from './utils';

export async function decidir_modelo_de_resposta(nome_arquivo: string, linguagem: string, codigo: string, gemini: Gemini_Bot, idioma: String) {
    try {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification, 
            title: "Gemini Code Reviewer",
            cancellable: false 
        }, async (progress) => {
            let mensagem_esperando = `Gerando ${linguagem} revisão...`;
            if (mensagem_esperando === "English") {
                mensagem_esperando = `Generating ${linguagem} review...`;
            }
            progress.report({ message: mensagem_esperando });
            try {
                let resultado = await gemini.gerar_revisao(codigo, nome_arquivo, linguagem, String(idioma));
                let modelo = pegar_modelo_json();
                mostrar_revisao(resultado.revisao, linguagem, resultado.idioma, modelo);
                
            } catch (erro) {
                mostrar_erro(erro);
            }
        });
    } 
    catch (erro) {
       mostrar_erro(erro);
    }
}