import { HTML_PROMPT, CSS_PROMPT, PYTHON_PROMPT, JAVASCRIPT_PROMPT} from './prompts';
import { GoogleGenerativeAI, GenerativeModel, ResponseSchema } from "@google/generative-ai";
import * as vscode from 'vscode';
import {  molde_json_css, molde_json_html, molde_json_python, molde_json_javascript } from './schemas';
import { mostrar_erro } from '../ui-utils';

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
            mostrar_erro(erro);
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
            mostrar_erro(erro);
        }
    }
    async gerar_revisao_python(codigo: string, nome_arquivo: string) {
        try {
            const prompt_final = PYTHON_PROMPT
                .replace('{{NOME_ARQUIVO}}', nome_arquivo)
                .replace('{{CODIGO}}', codigo);
            const modelo = this.criar_modelo(molde_json_python);
            const resultado = await modelo.generateContent(prompt_final);
            return JSON.parse(resultado.response.text());
        } catch (erro: any) {
            mostrar_erro(erro);
        }
    }
    async gerar_revisao_javascript(codigo: string, nome_arquivo: string) {
        try {
            const prompt_final = JAVASCRIPT_PROMPT
                .replace('{{NOME_ARQUIVO}}', nome_arquivo)
                .replace('{{CODIGO}}', codigo);
            const modelo = this.criar_modelo(molde_json_javascript);
            const resultado = await modelo.generateContent(prompt_final);
            return JSON.parse(resultado.response.text());
        } catch (erro: any) {
            mostrar_erro(erro);
        }
    }
}