import * as vscode from 'vscode'; 
import * as path from 'path';

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