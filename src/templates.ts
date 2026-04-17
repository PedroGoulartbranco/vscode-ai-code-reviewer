import { calcular_media} from './utils';
import { cor_emoji_nota } from './ui-utils';

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

--

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