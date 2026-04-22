import { calcular_media} from './utils';
import { cor_emoji_nota } from './ui-utils';

type template_json = (dados: any) => string;

export const listaTemplates: Record<string, template_json> = {
    'html': template_html,
    'css': template_css,
    'python': template_python,     
    'javascript': template_javascript,
    'typescript': template_typescript,
    'c': template_c,
    'java': template_java
};

export function template_html(dados: any)  {
    const listaSugestoes = dados.sugestoes
        .map((s: string) => `- ${s.trim()}`)
        .join('\n');

    const media_geral = calcular_media([dados.notas.semantica, dados.notas.organizacao, dados.notas.boas_praticas]);

    return `
# 🛡️ Code Review: \`${dados.nome_arquivo}\`

| Critério | Nota | Status |
| :--- | :---: | :---: |
| **Semântica** | ${dados.notas.semantica}/10 | ${cor_emoji_nota(dados.notas.semantica)} |
| **Organização** | ${dados.notas.organizacao}/10 | ${cor_emoji_nota(dados.notas.organizacao)} |
| **Boas Práticas** | ${dados.notas.boas_praticas}/10 | ${cor_emoji_nota(dados.notas.boas_praticas)} |

---

## 📊 Média Geral: \`${media_geral.toFixed(2)}/10\` ${cor_emoji_nota(media_geral)}

## 🔍 Análise Detalhada

### 🏗️ Semântica e Estrutura
${dados.analise_detalhada.semantica.trim()}

### 🏷️ Estrutura de Tags
${dados.analise_detalhada.tags_estrutura.trim()}

### 🎨 Estilização
${dados.analise_detalhada.estilos.trim()}

---

## 💡 Caminho para Melhoria
${listaSugestoes}

---
_Gerado por Gemini Code Reviewer_ ♟️
`.trim();
};

export function template_css(dados: any) {
    // Processamento das listas
    const listaSugestoes = dados.sugestoes_refatoracao
        .map((s: string) => `- 💡 ${s.trim()}`)
        .join('\n');

    const listaSmells = dados.code_smells_encontrados
        .map((s: string) => `- 🚨 ${s.trim()}`)
        .join('\n');

    const notasParaMedia = [
        dados.notas.arquitetura,
        dados.notas.manutenibilidade,
        dados.notas.especificidade,
        dados.notas.responsividade
    ];
    const media_geral = calcular_media(notasParaMedia);

    const usaVar = dados.metricas_css.usa_variaveis ? "Sim ✅" : "Não ❌";

    return `
# 🎨 Code Review CSS: \`${dados.nome_arquivo}\`

| Critério | Nota | Status |
| :--- | :---: | :---: |
| **Arquitetura** | ${dados.notas.arquitetura}/10 | ${cor_emoji_nota(dados.notas.arquitetura)} |
| **Manutenibilidade** | ${dados.notas.manutenibilidade}/10 | ${cor_emoji_nota(dados.notas.manutenibilidade)} |
| **Especificidade** | ${dados.notas.especificidade}/10 | ${cor_emoji_nota(dados.notas.especificidade)} |
| **Responsividade** | ${dados.notas.responsividade}/10 | ${cor_emoji_nota(dados.notas.responsividade)} |

---

## 📊 Média Geral: \`${media_geral.toFixed(2)}/10\` ${cor_emoji_nota(media_geral)}

## 📏 Métricas Técnicas
- **Uso de \`!important\`:** ${dados.metricas_css.qtd_important} ocorrência(s)
- **Profundidade de Seletores:** Máximo de ${dados.metricas_css.profundidade_maxima} níveis
- **Usa Variáveis CSS:** ${usaVar}

---

## 🔍 Análise Detalhada

### 🏗️ Arquitetura e Seletores
${dados.analise_detalhada.arquitetura_e_seletores.trim()}

### 🛠️ Boas Práticas e Reuso
${dados.analise_detalhada.boas_praticas_e_reuso.trim()}

---

## ⚠️ Code Smells Encontrados
${listaSmells || "_Nenhum problema grave detectado._"}

## 🚀 Sugestões de Refatoração
${listaSugestoes}

---
_Gerado por Gemini Code Reviewer_ ♟️
`.trim();
}

export function template_python(dados: any) {
    const listaSugestoes = dados.sugestoes_refatoracao
        ?.map((s: string) => `- 💡 ${s?.trim() || "Sugestão vazia"}`)
        .join('\n') || "_Nenhuma sugestão no momento._";

    const listaSmells = dados.code_smells_encontrados
        ?.map((s: string) => `- 🚨 ${s?.trim() || "Problema não especificado"}`)
        .join('\n') || "_Nenhum problema grave detectado._";

    const notasParaMedia = [
        dados.notas?.pep8_compliance || 0,
        dados.notas?.logica_e_eficiencia || 0,
        dados.notas?.modularizacao || 0,
        dados.notas?.tratamento_erros || 0
    ];
    
    const media_geral = calcular_media(notasParaMedia);

    // 3. Verificação segura de métricas
    const usaTypeHints = dados.metricas_python?.usa_type_hints ? "Sim ✅" : "Não ❌";
    const compCiclomatica = dados.metricas_python?.complexidade_ciclomatica || "Não avaliada";
    const loops = dados.metricas_python?.qtd_loops_aninhados ?? 0;

    return `
# 🐍 Code Review Python: \`${dados.nome_arquivo || "arquivo_desconhecido"}\`

| Critério | Nota | Status |
| :--- | :---: | :---: |
| **PEP8 Compliance** | ${dados.notas?.pep8_compliance || 0}/10 | ${cor_emoji_nota(dados.notas?.pep8_compliance || 0)} |
| **Lógica e Eficiência** | ${dados.notas?.logica_e_eficiencia || 0}/10 | ${cor_emoji_nota(dados.notas?.logica_e_eficiencia || 0)} |
| **Modularização** | ${dados.notas?.modularizacao || 0}/10 | ${cor_emoji_nota(dados.notas?.modularizacao || 0)} |
| **Tratamento de Erros** | ${dados.notas?.tratamento_erros || 0}/10 | ${cor_emoji_nota(dados.notas?.tratamento_erros || 0)} |

---

## 📊 Média Geral: \`${media_geral.toFixed(2)}/10\` ${cor_emoji_nota(media_geral)}

## 📏 Métricas Técnicas
- **Complexidade Ciclomática:** ${compCiclomatica}
- **Loops Aninhados (Máx):** ${loops} nível(is)
- **Usa Type Hints:** ${usaTypeHints}

---

## 🔍 Análise Detalhada

### 🐍 Pythonic Code
${dados.analise_detalhada?.pythonic_code?.trim() || "_Análise de estilo não disponível._"}

### 🛡️ Segurança e Tratamento de Erros
${dados.analise_detalhada?.seguranca_e_erros?.trim() || "_Análise de segurança não disponível._"}

---

## ⚠️ Code Smells Encontrados (são erros ou práticas ruins que afetam a qualidade do código)
${listaSmells}

## 🚀 Sugestões de Refatoração
${listaSugestoes}

---
_Gerado por Gemini Code Reviewer_ ♟️
`.trim();
}

export function template_javascript(dados: any) {
    const listaSugestoes = dados.sugestoes_refatoracao
        ?.map((s: string) => `- 💡 ${s?.trim() || "Sugestão vazia"}`)
        .join('\n') || "_Nenhuma sugestão no momento._";

    const listaSmells = dados.code_smells_encontrados
        ?.map((s: string) => `- 🚨 ${s?.trim() || "Problema não especificado"}`)
        .join('\n') || "_Nenhum problema grave detectado._";

    const notasParaMedia = [
        dados.notas?.clean_code || 0,
        dados.notas?.performance_assincrona || 0,
        dados.notas?.modularizacao || 0,
        dados.notas?.seguranca || 0
    ];
    
    const media_geral = calcular_media(notasParaMedia);

    const usa_Async_Await = dados.metricas_js?.usa_async_await ? "Sim ✅" : "Não ❌";
    const usa_ConstLet = dados.metricas_js?.usa_const_let ? "Sim ✅" : "Não ❌ (Uso de var detectado)";
    const compCiclomatica = dados.metricas_js?.complexidade_ciclomatica || "Não avaliada";

    return `
# 🟨 Code Review JavaScript: \`${dados.nome_arquivo || "arquivo_desconhecido"}\`

| Critério | Nota | Status |
| :--- | :---: | :---: |
| **Clean Code** | ${dados.notas?.clean_code || 0}/10 | ${cor_emoji_nota(dados.notas?.clean_code || 0)} |
| **Performance Assíncrona** | ${dados.notas?.performance_assincrona || 0}/10 | ${cor_emoji_nota(dados.notas?.performance_assincrona || 0)} |
| **Modularização (ESM)** | ${dados.notas?.modularizacao || 0}/10 | ${cor_emoji_nota(dados.notas?.modularizacao || 0)} |
| **Segurança (XSS/Injection)** | ${dados.notas?.seguranca || 0}/10 | ${cor_emoji_nota(dados.notas?.seguranca || 0)} |

---

## 📊 Média Geral: \`${media_geral.toFixed(2)}/10\` ${cor_emoji_nota(media_geral)}

## 📏 Métricas Técnicas (JS Moderno)
- **Complexidade Ciclomática:** ${compCiclomatica}
- **Usa ES6+ (const/let):** ${usa_ConstLet}
- **Padrões Assíncronos (Async/Await):** ${usa_Async_Await}

---

## 🔍 Análise Detalhada

### ⚡ Modern JS & ES6+
${dados.analise_detalhada?.modern_js_analysis?.trim() || "_Análise de recursos modernos não disponível._"}

### 🔄 Gestão de Assincronismo
${dados.analise_detalhada?.async_error_handling?.trim() || "_Análise de concorrência não disponível._"}

---

## ⚠️ Code Smells Encontrados (são erros ou práticas ruins que afetam a qualidade do código)
${listaSmells}

## 🚀 Sugestões de Refatoração
${listaSugestoes}

---
_Gerado por Gemini Code Reviewer_ ♟️
`.trim();
}

export function template_typescript(dados: any) {
    const listaSugestoes = dados.sugestoes_refatoracao
        ?.map((s: string) => `- 💡 ${s?.trim() || "Sugestão vazia"}`)
        .join('\n') || "_Nenhuma sugestão no momento._";

    const listaSmells = dados.code_smells_encontrados
        ?.map((s: string) => `- 🚨 ${s?.trim() || "Problema não especificado"}`)
        .join('\n') || "_Nenhum problema grave detectado._";

    const notasParaMedia = [
        dados.notas?.clean_code || 0,
        dados.notas?.seguranca_tipos || 0,
        dados.notas?.modularizacao || 0,
        dados.notas?.seguranca || 0
    ];
    
    const media_geral = calcular_media(notasParaMedia);

    const usa_Any = dados.metricas_ts?.usa_any ? "Sim 🚨 (Evite!)" : "Não ✅ (Excelente!)";
    const usa_Interfaces = dados.metricas_ts?.usa_interfaces ? "Sim ✅" : "Não ❌ (Defina contratos!)";
    const compCiclomatica = dados.metricas_ts?.complexidade_ciclomatica || "Não avaliada";

    return `
# 🟦 Code Review TypeScript: \`${dados.nome_arquivo || "arquivo_desconhecido"}\`

| Critério | Nota | Status |
| :--- | :---: | :---: |
| **Clean Code** | ${dados.notas?.clean_code || 0}/10 | ${cor_emoji_nota(dados.notas?.clean_code || 0)} |
| **Segurança de Tipos** | ${dados.notas?.seguranca_tipos || 0}/10 | ${cor_emoji_nota(dados.notas?.seguranca_tipos || 0)} |
| **Modularização** | ${dados.notas?.modularizacao || 0}/10 | ${cor_emoji_nota(dados.notas?.modularizacao || 0)} |
| **Segurança Geral** | ${dados.notas?.seguranca || 0}/10 | ${cor_emoji_nota(dados.notas?.seguranca || 0)} |

---

## 📊 Média Geral: \`${media_geral.toFixed(2)}/10\` ${cor_emoji_nota(media_geral)}

## 📏 Métricas Técnicas (TypeScript)
- **Complexidade Ciclomática:** ${compCiclomatica}
- **Usa \`any\` indevidamente:** ${usa_Any}
- **Usa Interfaces/Types:** ${usa_Interfaces}

---

## 🔍 Análise Detalhada

### 🛡️ Sistema de Tipagem
${dados.analise_detalhada?.type_system_analysis?.trim() || "_Análise de tipagem não disponível._"}

### 🔄 Gestão de Assincronismo e Erros
${dados.analise_detalhada?.async_error_handling?.trim() || "_Análise de concorrência não disponível._"}

---

## ⚠️ Code Smells Encontrados
${listaSmells}

## 🚀 Sugestões de Refatoração
${listaSugestoes}

---
_Gerado por Gemini Code Reviewer_ ♟️
`.trim();
}

export function template_c(dados: any) {
    const listaSugestoes = dados.sugestoes_refatoracao
        ?.map((s: string) => `- 💡 ${s?.trim() || "Sugestão vazia"}`)
        .join('\n') || "_Nenhuma sugestão no momento._";

    const listaSmells = dados.code_smells_encontrados
        ?.map((s: string) => `- 🚨 ${s?.trim() || "Problema não especificado"}`)
        .join('\n') || "_Nenhum problema grave detectado._";

    const notasParaMedia = [
        dados.notas?.gestao_memoria || 0,
        dados.notas?.performance_velocidade || 0,
        dados.notas?.reutilizacao_recursos || 0,
        dados.notas?.clean_code_c || 0
    ];
    
    const media_geral = calcular_media(notasParaMedia);

    const status_memoria = dados.metricas_c?.vazamento_memoria_provavel ? "Vazamento Detectado! 💀" : "Seguro ✅";
    const status_ponteiros = dados.metricas_c?.uso_ponteiros_perigosos ? "Ponteiros Inseguros! ⚠️" : "Uso Seguro ✅";
    const status_escopo = dados.metricas_c?.poluicao_escopo_global ? "Poluição de Globais 🚩" : "Escopo Limpo ✅";
    const status_headers = dados.metricas_c?.possui_header_guards ? "Presentes ✅" : "Ausentes ❌";

    return `
# ⚙️ Code Review C: \`${dados.nome_arquivo || "arquivo_desconhecido"}\`

| Critério | Nota | Status |
| :--- | :---: | :---: |
| **Gestão de Memória** | ${dados.notas?.gestao_memoria || 0}/10 | ${cor_emoji_nota(dados.notas?.gestao_memoria || 0)} |
| **Performance/Velocidade** | ${dados.notas?.performance_velocidade || 0}/10 | ${cor_emoji_nota(dados.notas?.performance_velocidade || 0)} |
| **Reutilização/Stack** | ${dados.notas?.reutilizacao_recursos || 0}/10 | ${cor_emoji_nota(dados.notas?.reutilizacao_recursos || 0)} |
| **Organização (Clean Code)** | ${dados.notas?.clean_code_c || 0}/10 | ${cor_emoji_nota(dados.notas?.clean_code_c || 0)} |

---

## 📊 Média Geral: \`${media_geral.toFixed(2)}/10\` ${cor_emoji_nota(media_geral)}

## 📏 Métricas de Baixo Nível
- **Memória:** ${status_memoria}
- **Ponteiros:** ${status_ponteiros}
- **Escopo Global:** ${status_escopo}
- **Header Guards:** ${status_headers}

---

## 🔍 Análise Detalhada

### 🧠 Gestão de Memória e Ciclo de Vida
${dados.analise_detalhada?.memory_management_analysis?.trim() || "_Análise de memória não disponível._"}

### ⚡ Potencial de Otimização
${dados.analise_detalhada?.optimization_potential?.trim() || "_Sugestões de performance não disponíveis._"}

---

## ⚠️ Code Smells Encontrados
${listaSmells}

## 🚀 Sugestões de Refatoração
${listaSugestoes}

---
_Gerado por Gemini Code Reviewer (C-Engine)_ ♟️
`.trim();
}

export function template_java(dados: any) {
    const listaSugestoes = dados.sugestoes_refatoracao
        ?.map((s: string) => `- 💡 ${s?.trim() || "Sugestão vazia"}`)
        .join('\n') || "_Nenhuma sugestão no momento._";

    const listaSmells = dados.code_smells_encontrados
        ?.map((s: string) => `- 🚨 ${s?.trim() || "Problema não especificado"}`)
        .join('\n') || "_Nenhum problema grave detectado._";

    const notasParaMedia = [
        dados.notas?.encapsulamento || 0,
        dados.notas?.organizacao_oo || 0,
        dados.notas?.gestao_recursos || 0,
        dados.notas?.clean_code_java || 0
    ];
    
    const media_geral = calcular_media(notasParaMedia);

    const status_modificadores = dados.metricas_java?.uso_correto_modificadores ? "Protegidos ✅" : "Expostos 🚨 (Use private)";
    const status_naming = dados.metricas_java?.segue_padroes_naming ? "Padrão Java ✅" : "Fora do Padrão ❌";
    const status_recursos = dados.metricas_java?.vazamento_recursos_io ? "Vazamento Detectado! ⚠️" : "Recursos Fechados ✅";
    const complexidade_oo = dados.metricas_java?.complexidade_oo || "Não avaliada";

    return `
# ☕ Code Review Java: \`${dados.nome_arquivo || "arquivo_desconhecido"}\`

| Critério | Nota | Status |
| :--- | :---: | :---: |
| **Encapsulamento** | ${dados.notas?.encapsulamento || 0}/10 | ${cor_emoji_nota(dados.notas?.encapsulamento || 0)} |
| **Organização OO** | ${dados.notas?.organizacao_oo || 0}/10 | ${cor_emoji_nota(dados.notas?.organizacao_oo || 0)} |
| **Gestão de Recursos** | ${dados.notas?.gestao_recursos || 0}/10 | ${cor_emoji_nota(dados.notas?.gestao_recursos || 0)} |
| **Clean Code Java** | ${dados.notas?.clean_code_java || 0}/10 | ${cor_emoji_nota(dados.notas?.clean_code_java || 0)} |

---

## 📊 Média Geral: \`${media_geral.toFixed(2)}/10\` ${cor_emoji_nota(media_geral)}

## 📏 Métricas de Arquitetura (JVM)
- **Modificadores de Acesso:** ${status_modificadores}
- **Convenções de Naming:** ${status_naming}
- **Vazamento de I/O (Streams):** ${status_recursos}
- **Complexidade OO:** ${complexidade_oo}

---

## 🔍 Análise Detalhada

### 🏗️ Design e Orientação a Objetos
${dados.analise_detalhada?.oo_analysis?.trim() || "_Análise de OO não disponível._"}

### 🚀 Eficiência de Recursos e Performance
${dados.analise_detalhada?.resource_efficiency?.trim() || "_Análise de eficiência não disponível._"}

---

## ⚠️ Code Smells Encontrados
${listaSmells}

## 🚀 Sugestões de Refatoração
${listaSugestoes}

---
_Gerado por Gemini Code Reviewer (Java-Engine)_ ♟️
`.trim();
}