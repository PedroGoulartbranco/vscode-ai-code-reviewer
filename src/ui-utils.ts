import * as vscode from 'vscode'; 
import { listaTemplates } from './templates';
import { listaTemplates_English } from './templates_english';
import { pegar_idioma, erros_possiveis } from './utils';

export function cor_emoji_nota(nota: number) {
    if (nota >= 7) {
        return "🟢";
    } else if (nota >= 5) {
        return "⚠️";
    } else {
        return "❌";
    }
}

export async function mostrar_revisao(revisao_json: any, linguagem: string, idioma: string) {
    let markdown: any;
    if (idioma === "English") {
        markdown = listaTemplates_English[linguagem](revisao_json);
    } else {
        markdown = listaTemplates[linguagem](revisao_json);
    }
    let mostrar = await vscode.workspace.openTextDocument({
        content: markdown,
        language: 'markdown'
    });

    await vscode.commands.executeCommand('markdown.showPreview', mostrar.uri);
}

export async function mostrar_erro(erro: any) {
    let idioma = String(await pegar_idioma());
    if (erro.status >= 500) {
        erro.status = 500;
    }
    if (erro.status === 429 || erro.status === 500) {
        vscode.window.showErrorMessage(erros_possiveis[idioma][String(erro.status)], erros_possiveis[idioma]["Fechar"]);
    } else if (erro.message === "Linguagem não reconhecida") {
        vscode.window.showErrorMessage(erros_possiveis[idioma]["Linguagem não reconhecida"], erros_possiveis[idioma]["Fechar"]);
    }
    else {
        vscode.window.showErrorMessage(erros_possiveis[idioma]["Outros"], erros_possiveis[idioma]["Fechar"]);
        console.log(erro);
    }
}