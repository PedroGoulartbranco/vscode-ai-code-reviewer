import * as vscode from 'vscode';
import * as path from 'path';
import { mostrar_erro } from './ui-utils';

export function calcular_media(lista_notas: number[]) {
    const numero_notas = lista_notas.length;
    let soma = 0;
    for (let i: number = 0; i < numero_notas; i ++) {
        soma += lista_notas[i];
    }
    return soma / numero_notas;
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
        throw new Error("Nenhum arquivo aberto");
    }
}

export function verifiar_chave(chave: string) {
    const formato_chave_api = /^AIza[0-9A-Za-z\-_]{35}$/;
    if (formato_chave_api.test(chave)) {
        return formato_chave_api.test(chave);
    }
    throw new Error("Chave Api incorreta");
}

export function pegar_modelo_json(){
    try {
        const config = vscode.workspace.getConfiguration('aiReviewer');
        const modelo = config.get<string>('model');
        return String(modelo);
    } catch (erro) {
        throw new Error("Modelo não reconhecido");
    }
}

export function pegar_chave_json() {
    const config = vscode.workspace.getConfiguration('aiReviewer');
    const chaveSalva = config.get<string>('apiKey');
    return String(chaveSalva);
}

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

export async function mensagem_erro_chave(idioma: String) {
    let mensagem_erro = "Chave API inválida. Deseja configurar agora?";
    let mensagem_sim = "Sim";
    let mensagem_fechar = "Fechar";
    if (idioma === "English") {
        mensagem_erro = "Invalid API Key. Do you want to configure it now?";
        mensagem_sim = "Yes";
        mensagem_fechar = "Close";
    }
    const escolha = await vscode.window.showErrorMessage(
       mensagem_erro, 
       { modal: false },
        mensagem_sim, mensagem_fechar 
    );
    if (escolha === "Sim" || escolha === "Yes") {
        vscode.commands.executeCommand('workbench.action.openSettings', 'ai-code-reviewer.apiKey');
    }
}

export async function pegar_idioma() {
    const config = vscode.workspace.getConfiguration('aiReviewer');
    const idioma = config.get<string>('language');
    return String(idioma);
}

export const instrucoes_idioma: Record<string, string> = {
    "English": "CRITICAL: The JSON structure (keys) must remain EXACTLY as provided. ONLY translate the content (values) inside the JSON into English. Do not rename keys like 'analise_detalhada', 'notas', 'metricas_sql', 'metricas_ruby', etc.",
    "Portuguese (Brazilian)": "CRITICAL: A estrutura do JSON (as chaves) deve permanecer IDÊNTICA. Traduza APENAS o conteúdo (valores) dentro do JSON para Português. NÃO altere nomes de chaves como 'analise_detalhada', 'notas', 'metricas_sql', 'metricas_ruby', etc.",
    "Spanish": "CRITICAL: La estructura del JSON (claves) debe permanecer EXACTAMENTE igual. SOLO traduzca el contenido (valores) dentro del JSON al Español. NO cambie los nombres de las claves como 'analise_detalhada', 'notas', 'metricas_sql', 'metricas_ruby', etc."
};

export const erros_possiveis: Record<string, Record<string, string>> = {
    "English": {
        "429": "Daily limit reached!",
        "500": "Google server is unstable. Please try again later.",
        "Linguagem não reconhecida": "This language is not in our database.",
        "Outro": "Error generating review!",
        "Nenhum arquivo aberto": "No open files at the moment!",
        "Modelo não reconhecido": "Error reading the model configuration!",
        "Fechar": "Close"
    },
    "Portuguese (Brazilian)": {
        "429": "Limite diário atingido!",
        "500": "O servidor do Google está instável. Tente novamente em breve.",
        "Linguagem não reconhecida": "Essa linguagem não está no nosso banco de dados",
        "Outro": "Erro na geração de revisão!",
        "Nenhum arquivo aberto": "Nenhum arquivo aberto atualmente!",
        "Modelo não reconhecido": "Erro na leitura do modelo!",
        "Fechar": "Fechar"
    }
};