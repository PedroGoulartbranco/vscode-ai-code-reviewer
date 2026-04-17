import * as vscode from 'vscode'; 
import { template_css, template_html } from './templates';

export function cor_emoji_nota(nota: number) {
    if (nota >= 7) {
        return "🟢";
    } else if (nota >= 5) {
        return "⚠️";
    } else {
        return "❌";
    }
}

export async function mostrar_revisao_html(revisao_json: any) {
    const markdown_html = template_html(revisao_json);
    let mostrar = await vscode.workspace.openTextDocument({
        content: markdown_html,
        language: 'markdown'
    });

    await vscode.commands.executeCommand('markdown.showPreview', mostrar.uri);
}

export async function mostrar_revisao_css(revisao_json: any) {
    const markdown_css = template_css(revisao_json);
    let mostrar = await vscode.workspace.openTextDocument({
        content: markdown_css,
        language: 'markdown'
    });

    await vscode.commands.executeCommand('markdown.showPreview', mostrar.uri);
}