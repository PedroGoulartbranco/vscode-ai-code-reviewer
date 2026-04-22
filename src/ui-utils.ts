import * as vscode from 'vscode'; 
import { template_css, template_html, template_python, listaTemplates } from './templates';

export function cor_emoji_nota(nota: number) {
    if (nota >= 7) {
        return "🟢";
    } else if (nota >= 5) {
        return "⚠️";
    } else {
        return "❌";
    }
}

export async function mostrar_revisao(revisao_json: any, linguagem: string) {
    const markdown = listaTemplates[linguagem](revisao_json);
    let mostrar = await vscode.workspace.openTextDocument({
        content: markdown,
        language: 'markdown'
    });

    await vscode.commands.executeCommand('markdown.showPreview', mostrar.uri);
}

export function mostrar_erro(erro: any) {
    console.log("ERRO COMPLETO:", erro);
    if (erro.status === 429) {
        vscode.window.showErrorMessage("Limite diário atingido!", "Fechar");
    } else if (erro.status >= 500) {
        vscode.window.showErrorMessage("O servidor do Google está instável. Tente novamente em breve.", "Fechar");
    } else {
        vscode.window.showErrorMessage("Erro na geração de revisão!", "Fechar");
    }
}