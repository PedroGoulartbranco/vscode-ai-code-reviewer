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

export const molde_json_python: ResponseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        nome_arquivo: {
            type: SchemaType.STRING,
            description: "Nome do arquivo analisado"
        },
        notas: {
            type: SchemaType.OBJECT,
            properties: {
                pep8_compliance: { type: SchemaType.NUMBER },
                logica_e_eficiencia: { type: SchemaType.NUMBER },
                modularizacao: { type: SchemaType.NUMBER },
                tratamento_erros: { type: SchemaType.NUMBER }
            },
            required: ["pep8_compliance", "logica_e_eficiencia", "modularizacao", "tratamento_erros"]
        },
        metricas_python: {
            type: SchemaType.OBJECT,
            properties: {
                complexidade_ciclomatica: { type: SchemaType.STRING },
                usa_type_hints: { type: SchemaType.BOOLEAN },
                qtd_loops_aninhados: { type: SchemaType.NUMBER }
            },
            required: ["complexidade_ciclomatica", "qtd_loops_aninhados", "usa_type_hints"]
        },
        analise_detalhada: {
            type: SchemaType.OBJECT,
            properties: {
                pythonic_code: { type: SchemaType.STRING },
                tags_estrutura: { type: SchemaType.STRING }
            },
            required: ["pythonic_code", "tags_estrutura"]
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
    required: ["nome_arquivo", "notas", "analise_detalhada", "sugestoes_refatoracao", "metricas_python", "code_smells_encontrados"]
};

export const molde_json_javascript: ResponseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        nome_arquivo: {
            type: SchemaType.STRING,
            description: "Nome do arquivo analisado"
        },
        notas: {
            type: SchemaType.OBJECT,
            properties: {
                clean_code: { type: SchemaType.NUMBER },
                performance_assincrona: { type: SchemaType.NUMBER },
                modularizacao: { type: SchemaType.NUMBER },
                seguranca: { type: SchemaType.NUMBER }
            },
            required: ["clean_code", "logica_e_eficiencia", "modularizacao", "seguranca"]
        },
        metricas_js: {
            type: SchemaType.OBJECT,
            properties: {
                usa_async_await: { type: SchemaType.BOOLEAN },
                usa_const_let: { type: SchemaType.BOOLEAN },
                complexidade_ciclomatica: { type: SchemaType.STRING }
            },
            required: ["usa_async_await", "usa_const_let", "complexidade_ciclomatica"]
        },
        analise_detalhada: {
            type: SchemaType.OBJECT,
            properties: {
                modern_js_analysis: { type: SchemaType.STRING },
                async_error_handling: { type: SchemaType.STRING }
            },
            required: ["modern_js_analysis", "async_error_handling"]
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
    required: ["nome_arquivo", "notas", "analise_detalhada", "sugestoes_refatoracao", "metricas_python", "code_smells_encontrados"]
};