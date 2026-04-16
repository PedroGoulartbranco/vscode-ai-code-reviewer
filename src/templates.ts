export function template_html(dados: any)  {
    // Transformando a lista de sugestões em string
    const listaSugestoes = dados.sugestoes.map((s: string) => `🟢 ${s}`).join('\n');

    return `
# 🛡️ Code Review: \`${dados.nome_arquivo}\`

## 💹 Status da Análise
> [!TIP]
> **Avaliação de Qualidade:** Abaixo estão as notas baseadas nos pilares de desenvolvimento.

🟢 **Semântica:** ${dados.notas.semantica}/10
🟢 **Organização:** ${dados.notas.organizacao}/10
🟢 **Boas Práticas:** ${dados.notas.boas_praticas}/10

---

## 🔍 O que foi analisado?

### 🏗️ Semântica
${dados.analise_detalhada.semantica}

### 🏷️ Estrutura de Tags
${dados.analise_detalhada.tags_estrutura}

### 🎨 Estilização
${dados.analise_detalhada.estilos}

---

## 💡 Caminho para Melhoria
${listaSugestoes}

---

## 📝 Relatório Completo do Gemini
${dados.relatorio_formatado}

---
_Gerado por **Gemini Code Reviewer**_ ♟️
`.trim();
};