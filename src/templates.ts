import {cor_emoji_nota} from './utils';

export function template_html(dados: any)  {
    const listaSugestoes = dados.sugestoes
        .map((s: string) => `- ${s.trim()}`)
        .join('\n');

    return `
# 🛡️ Code Review: \`${dados.nome_arquivo}\`

| Critério | Nota | Status |
| :--- | :---: | :---: |
| **Semântica** | ${dados.notas.semantica}/10 | ${cor_emoji_nota(dados.notas.semantica)} |
| **Organização** | ${dados.notas.organizacao}/10 | ${cor_emoji_nota(dados.notas.organizacao)} |
| **Boas Práticas** | ${dados.notas.boas_praticas}/10 | ${cor_emoji_nota(dados.notas.boas_praticas)} |

---

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