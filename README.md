# 🤖 Gemini Code Reviewer (VS Code Extension)

The **Gemini Code Reviewer** transforms your VS Code into a high-level Senior Pair Programming partner. Using the Google Gemini API, this extension performs structured, secure, and detailed code reviews directly within your development environment.

> ⚠️ **Status:** Under active development. The analysis engine is being expanded daily.

## ✨ Engine Highlights
* **Multi-language Analysis:** Robust support for Go, TypeScript, C#, Lua, Luau, PHP, Ruby, Python, Java, C, C++, and HTML/CSS.
* **Smart Scoring System:** Automated metric calculation with visual status (Emoji-based).
* **Prompt Firewall:** Active security layer against *Prompt Injection* attacks.
* **Professional Reports:** Generation of Markdown dashboards featuring technical analysis, *code smells* detection, and practical refactoring suggestions.
* **API Resilience:** Graceful handling of API rate limits and network errors.

## 🛠️ Supported Languages

| Category | Languages |
| :--- | :--- |
| **Web/Backend** | TypeScript, JavaScript, PHP, Ruby, Go, C#, Java |
| **Systems** | C, C++, Python |
| **Gaming/Scripts** | Lua, Luau |
| **Markup/Style** | HTML, CSS |

## 🚀 Roadmap

- [x] **Core Engine:** Google Gemini integration and scoring system.
- [x] **Multi-language Support:** Language support roadmap completed (including PHP and Ruby).
- [ ] **Model Selection:** Toggle between `Flash` and `Pro` models via settings.
- [ ] **Marketplace Release:** Official release on the VS Code Marketplace.

## ⚙️ Local Setup

To contribute or run the project locally:

1. Clone this repository.
2. Install the dependencies:
   ```bash
   npm install