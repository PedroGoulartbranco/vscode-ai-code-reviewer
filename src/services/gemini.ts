import { HTML_PROMPT } from './prompts';
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import * as vscode from 'vscode';

export class Gemini_Bot {
    private chave: string;
    private modelo: GenerativeModel;
    private genAI: GoogleGenerativeAI;

    constructor(apiKey: string) {
        this.chave = apiKey;
        this.genAI = new GoogleGenerativeAI(apiKey); //Conecta a chave com o google

        this.modelo = this.genAI.getGenerativeModel({ //Configura o modelo
            model: "gemini-2.5-flash"
        });
    }

    get chave_string(): string {
        return this.chave;
    }

    async gerar_revisao_html(codigo: string, nome_arquivo: string) {
        try {
            const prompt_final = HTML_PROMPT 
                .replace('{{NOME_ARQUIVO}}', nome_arquivo)
                .replace('{{CODIGO}}', codigo);
            const resultado = await this.modelo.generateContent(HTML_PROMPT);
            return JSON.parse(resultado.response.text());
        } catch (erro) {
            vscode.window.showInformationMessage("Erro na hora de gerar resposta");
            throw erro;
        }
    }
}