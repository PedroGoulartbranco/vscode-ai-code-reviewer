import * as vscode from 'vscode'; 
import * as path from 'path';
import { Gemini_Bot } from './services/gemini';
import { template_html } from './templates';

export async function pedirInputAoUsuario() {
    const input = await vscode.window.showInputBox({
        placeHolder: "Insira sua chave API do Gemini",
        prompt: "O que você quer perguntar?"
    });
    if (!input) {
        return {
            "chave": "",
            "valido": false
        };
    }
    let chave_correta = verifiar_chave(String(input));
    return {
        "chave": input,
        "valido": chave_correta
    };
}

export function verifiar_chave(chave: string) {
    const formato_chave_api = /^AIza[0-9A-Za-z\-_]{35}$/;
    return formato_chave_api.test(chave);
}

export function pegar_chave_json() {
    const config = vscode.workspace.getConfiguration('aiReviewer');
    const chaveSalva = config.get<string>('apiKey');
    return String(chaveSalva);
}

export async function mensagem_erro_chave(mensagem_erro: string = "Gemini API Key não encontrada!", mensagem_botao: string = "Configurar Agora") {
    const escolha = await vscode.window.showErrorMessage(
        mensagem_erro,
        mensagem_botao 
    );
    if (escolha) {
        //Retorna uma lista [chave, True ou False]
        const lista_resposta_chave_e_booleano = pedirInputAoUsuario();
        return lista_resposta_chave_e_booleano;
    }
    return {
        "chave": "",
        "valido": false
    };
}

export function pegar_arquivo_atual() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        let nome_documento = editor.document.fileName;
        nome_documento = path.basename(nome_documento);
        const codigo = editor.document.getText();
        const linguagem = editor.document.languageId;

        return {
            "nome": nome_documento,
            "codigo": codigo,
            "linguagem": linguagem
        };
    } else {
        return {
            "nome": "",
            "codigo": "",
            "linguagem": ""
        };
    }
}

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
    };
}

async function mostrar_revisao_html(revisao_json: any) {
    const markdown_html = template_html(revisao_json);
    let mostrar = await vscode.workspace.openTextDocument({
        content: markdown_html,
        language: 'markdown'
    });

    await vscode.commands.executeCommand('markdown.showPreview', mostrar.uri);
}