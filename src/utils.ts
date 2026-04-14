import * as vscode from 'vscode'; 

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

function verifiar_chave(chave: string) {
    const formato_chave_api = /^AIza[0-9A-Za-z\-_]{35}$/;
    return formato_chave_api.test(chave);
}

function pegar_chave_json() {
    const config = vscode.workspace.getConfiguration('aiReviewer.apiKey');
    const chaveSalva = config.get<string>('apiKey');
}