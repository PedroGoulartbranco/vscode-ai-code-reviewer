# 🤖 vscode-ai-code-reviewer (VS Code Extension)

A Visual Studio Code extension named **AI Code Reviewer** that transforms your editor into a high-level Pair Programming partner.

> ⚠️ **Status:** Under active development (Work In Progress 🚧). The source code is being built and refactored daily.

Leveraging the power of the **Google Gemini API**, this extension acts as a Senior Software Engineer, performing automated and structured Code Reviews directly within your development environment.

## ✨ Features (Already Implemented)

Although in its early stages, the core engine already includes:

* **Intelligent Analysis (HTML/CSS):** Deep evaluation of Semantics, Syntax, Styling (inline CSS detection), and Code Organization.
* **Markdown Dashboard:** Generation of rich visual reports side-by-side (`showPreviewToSide`), featuring a highlighted **General Score** and categorized feedback.
* **Prompt Shielding (Security First):** Active defense against *Prompt Injection* attacks (malicious comments within code attempting to bypass the grading system).
* **API Resilience:** Intelligent handling of request limits (HTTP 429 - *Rate Limit*), ensuring the extension notifies the user gracefully instead of failing.

## 🚀 Roadmap

- [x] Generative API Integration
- [x] Scoring system and average calculation logic
- [x] Prompt Injection prevention
- [ ] Dynamic User API Key configuration (`contributes.configuration`)
- [ ] Model selection (e.g., `gemini-1.5-flash` vs `flash-lite`)
- [ ] VS Code Marketplace publication

## ⚙️ Local Setup

*(Installation instructions via `.vsix` will be added once the first beta version is finalized).*

To run the project locally for development:
1. Clone the repository.
2. Run `npm install`.
3. Press `F5` in VS Code to launch the **Extension Development Host** window.

---
*Developed with TypeScript and Artificial Intelligence.* ♟️🚀