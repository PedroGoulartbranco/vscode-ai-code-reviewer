import * as vscode from 'vscode'; 
import { Gemini_Bot } from './services/gemini';
import { mostrar_revisao_html, mostrar_revisao_css, mostrar_revisao_python} from './ui-utils';
import { verifiar_chave, pedirInputAoUsuario } from './utils';

export async function decidir_modelo_de_resposta(nome_arquivo: string, linguagem: string, codigo: string, gemini: Gemini_Bot) {
    if (linguagem === "html") {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification, 
            title: "Gemini Code Reviewer",
            cancellable: false 
        }, async (progress) => {
            progress.report({ message: "Gerando revisão do HTML..." });
            try {
                let json_revisao_codigo = await gemini.gerar_revisao_html(codigo, nome_arquivo);
                
                mostrar_revisao_html(json_revisao_codigo);
                
            } catch (erro) {
                vscode.window.showErrorMessage("Falha ao gerar revisão.");
            }
        });
    } else if (linguagem === "css") {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification, 
            title: "Gemini Code Reviewer",
            cancellable: false 
        }, async (progress) => {
            progress.report({ message: "Gerando revisão do CSS..." });
            try {
                let json_revisao_codigo = await gemini.gerar_revisao_css(codigo, nome_arquivo);
                
                mostrar_revisao_css(json_revisao_codigo);
                
            } catch (erro) {
                vscode.window.showErrorMessage("Falha ao gerar revisão.");
            }
        });
    }
    else if (linguagem === "python") {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification, 
            title: "Gemini Code Reviewer",
            cancellable: false 
        }, async (progress) => {
            progress.report({ message: "Gerando revisão do PYTHON..." });
            try {
                let json_revisao_codigo = await gemini.gerar_revisao_python(codigo, nome_arquivo);
                
                mostrar_revisao_python(json_revisao_codigo);
                
            } catch (erro) {
                vscode.window.showErrorMessage("Falha ao gerar revisão.");
            }
        });
    }
}