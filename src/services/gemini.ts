import { dicionario_prompts} from './prompts';
import { GoogleGenerativeAI, GenerativeModel, ResponseSchema } from "@google/generative-ai";
import * as vscode from 'vscode';
import {  molde_json_css, molde_json_html, molde_json_python, molde_json_javascript, dicionario_schemas } from './schemas';
import { mostrar_erro } from '../ui-utils';
import { pegar_idioma,  instrucoes_idioma} from '../utils';
import { linguagens_diponiveis } from './rules';

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
    async gerar_revisao(codigo: string, nome_arquivo: string, linguagem: string) {
        try {
            if (!linguagens_diponiveis.includes(linguagem)) {
                throw new Error("Linguagem não reconhecida");
            }
            let idioma = await pegar_idioma();
            let idioma_instrucao = (instrucoes_idioma as any)[String(idioma)];
            const prompt_final = dicionario_prompts[linguagem] 
                .replace('{{NOME_ARQUIVO}}', nome_arquivo)
                .replace('{{CODIGO}}', codigo)
                .replace('{{IDIOMA}}', idioma_instrucao);
            const modelo = this.criar_modelo(dicionario_schemas[linguagem]);
            const resultado = await modelo.generateContent(prompt_final);
            return {
                "revisao": JSON.parse(resultado.response.text()),
                "idioma": idioma
            };
        } catch (erro: any) {
            mostrar_erro(erro);
            throw erro;
        }
    }
}