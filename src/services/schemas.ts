import { SchemaType, ResponseSchema } from "@google/generative-ai";

export const molde_json_css: ResponseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        nome_arquivo: {
            type: SchemaType.STRING,
            description: "Nome do arquivo analisado"
        },
        notas: {
            type: SchemaType.OBJECT,
            properties: {
                arquitetura: { type: SchemaType.NUMBER },
                manutenibilidade: { type: SchemaType.NUMBER },
                especificidade: { type: SchemaType.NUMBER },
                responsividade: { type: SchemaType.NUMBER }
            },
            required: ["arquitetura", "manutenibilidade", "especificidade", "responsividade"]
        },
        metricas_css: {
            type: SchemaType.OBJECT,
            properties: {
                qtd_important: { type: SchemaType.NUMBER },
                profundidade_maxima: { type: SchemaType.NUMBER },
                usa_variaveis: { type: SchemaType.NUMBER }
            },
            required: ["qtd_important", "profundidade_maxima", "usa_variaveis"]
        },
        analise_detalhada: {
            type: SchemaType.OBJECT,
            properties: {
                arquitetura_e_seletores: { type: SchemaType.STRING },
                boas_praticas_e_reuso: { type: SchemaType.STRING }
            },
            required: ["arquitetura_e_seletores", "boas_praticas_e_reuso"]
        },
        code_smells_encontrados: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
        },
        sugestoes_refatoracao: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
        }
    },
    required: ["nome_arquivo", "notas", "analise_detalhada", "metricas_css","sugestoes_refatoracao", "code_smells_encontrados"]
};

export const molde_json_html: ResponseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        nome_arquivo: {
            type: SchemaType.STRING,
            description: "Nome do arquivo analisado"
        },
        notas: {
            type: SchemaType.OBJECT,
            properties: {
                semantica: { type: SchemaType.NUMBER },
                organizacao: { type: SchemaType.NUMBER },
                boas_praticas: { type: SchemaType.NUMBER }
            },
            required: ["semantica", "organizacao", "boas_praticas"]
        },
        analise_detalhada: {
            type: SchemaType.OBJECT,
            properties: {
                semantica: { type: SchemaType.STRING },
                tags_estrutura: { type: SchemaType.STRING },
                estilos: { type: SchemaType.STRING }
            },
            required: ["semantica", "tags_estrutura", "estilos"]
        },
        sugestoes: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
        }
    },
    required: ["nome_arquivo", "notas", "analise_detalhada", "sugestoes"]
};