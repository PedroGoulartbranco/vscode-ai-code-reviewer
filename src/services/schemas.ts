import { SchemaType, ResponseSchema } from "@google/generative-ai";

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
                tags_structure: { type: SchemaType.STRING },
                estilos: { type: SchemaType.STRING }
            },
            required: ["semantica", "tags_structure", "estilos"]
        },
        sugestoes: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
        },
        relatorio_formatado: {
            type: SchemaType.STRING,
            description: "Relatório completo em formato Markdown"
        }
    },
    required: ["nome_arquivo", "notas", "analise_detalhada", "sugestoes", "relatorio_formatado"]
};