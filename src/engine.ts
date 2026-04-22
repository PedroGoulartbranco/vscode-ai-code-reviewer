import * as vscode from 'vscode'; 
import { Gemini_Bot } from './services/gemini';
import {  mostrar_revisao} from './ui-utils';
import { verifiar_chave, pedirInputAoUsuario } from './utils';

export async function decidir_modelo_de_resposta(nome_arquivo: string, linguagem: string, codigo: string, gemini: Gemini_Bot) {
    try {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification, 
            title: "Gemini Code Reviewer",
            cancellable: false 
        }, async (progress) => {
            progress.report({ message: `Gerando revisão ${linguagem}...` });
            try {
                let json_revisao_codigo = await gemini.gerar_revisao(codigo, nome_arquivo, linguagem);
               
                mostrar_revisao(json_revisao_codigo, linguagem);
                
            } catch (erro) {
                vscode.window.showErrorMessage("Falha ao gerar revisão.");
            }
        });
    } 
    catch (erro) {
        vscode.window.showErrorMessage("Falha ao gerar revisão.");
    }
}