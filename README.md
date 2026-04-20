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

## 🚀 Roadmap

- [x] **Generative API Integration:** Core engine connected to Google Gemini.
- [x] **Smart Scoring System:** Logic for automated grading and average calculation.
- [x] **Prompt Firewall:** Security layer against Prompt Injection and unauthorized commands.
- [x] **API Key Configuration:** Secure user-defined key storage via VS Code settings.
- [x] **HTML Analysis:** Full support for semantic and structural HTML review.
- [x] **CSS Styling Review:** Dedicated analysis for layout, responsiveness, and best practices.
- [ ] **Multi-language Support:** Expanding reviews to JavaScript, TypeScript, and Python.
- [ ] **Model Selection:** Toggle between different models (e.g., `gemini-2.5-flash` vs `flash-lite`).
- [ ] **VS Code Marketplace Publication:** Official release for the developer community.

## ⚙️ Local Setup

*(Installation instructions via `.vsix` will be added once the first beta version is finalized).*

To run the project locally for development:
1. Clone the repository.
2. Run `npm install`.
3. Press `F5` in VS Code to launch the **Extension Development Host** window.

---
*Developed with TypeScript and Artificial Intelligence.* ♟️🚀
