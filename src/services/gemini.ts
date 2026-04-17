import { HTML_PROMPT, CSS_PROMPT } from './prompts';
import { GoogleGenerativeAI, GenerativeModel, ResponseSchema } from "@google/generative-ai";
import * as vscode from 'vscode';
import {  molde_json_css, molde_json_html } from './schemas';

export class Gemini_Bot {
    private chave: string;
    private genAI: GoogleGenerativeAI;

    constructor(apiKey: string) {
        this.chave = apiKey;
        this.genAI = new GoogleGenerativeAI(apiKey); //Conecta a chave com o google
    }

    get chave_string(): string {
        return this.chave;
    }

    private criar_modelo(schema: ResponseSchema) {
        return this.genAI.getGenerativeModel({ //Configura o modelo
            model: "gemini-2.5-flash-lite",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.2,
            },
        });
    }

    async gerar_revisao_html(codigo: string, nome_arquivo: string) {
        try {
            const prompt_final = HTML_PROMPT 
                .replace('{{NOME_ARQUIVO}}', nome_arquivo)
                .replace('{{CODIGO}}', codigo);
            const modelo = this.criar_modelo(molde_json_html);
            const resultado = await modelo.generateContent(prompt_final);
            return JSON.parse(resultado.response.text());
        } catch (erro: any) {
            console.log("ERRO COMPLETO:", erro);
            if (erro.status === 429) {
                vscode.window.showErrorMessage("Limite diário atingido!", "Fechar");
            } else if (erro.status >= 500) {
                vscode.window.showErrorMessage("O servidor do Google está instável. Tente novamente em breve.", "Fechar");
            } else {
                vscode.window.showErrorMessage("Erro na geração de revisão!", "Fechar");
            }
        }
    }
    async gerar_revisao_css(codigo: string, nome_arquivo: string) {
        try {
            const prompt_final = CSS_PROMPT 
                .replace('{{NOME_ARQUIVO}}', nome_arquivo)
                .replace('{{CODIGO}}', codigo);
            const modelo = this.criar_modelo(molde_json_css);
            const resultado = await modelo.generateContent(prompt_final);
            return JSON.parse(resultado.response.text());
        } catch (erro: any) {
            console.log("ERRO COMPLETO:", erro);
            if (erro.status === 429) {
                vscode.window.showErrorMessage("Limite diário atingido!", "Fechar");
            } else if (erro.status >= 500) {
                vscode.window.showErrorMessage("O servidor do Google está instável. Tente novamente em breve.", "Fechar");
            } else {
                vscode.window.showErrorMessage("Erro na geração de revisão!", "Fechar");
            }
        }
    }
}