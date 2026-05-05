# 🤖 AI Code Reviewer

![AI Code Reviewer Demo](./assets/demo.gif)

The **AI Code Reviewer** is a professional VS Code extension that transforms your editor into a high-level Senior Pair Programming environment. Using the Google Gemini API, it provides structured, secure, and deeply technical code audits.

## ✨ Key Features

- **Professional Markdown Reports:** Every audit generates a comprehensive Markdown dashboard. These reports include a visual scoring system, technical analysis, detection of _code smells_, and specific refactoring suggestions.
- **Language-Specific Intelligence:** The engine doesn't use generic prompts. Each supported language has its own specialized review template to ensure the feedback respects the idioms and best practices of that specific ecosystem.
- **Total Customization:**
  - **Model Selection:** Toggle between different Gemini models, such as `gemini-2.5-flash-lite`, directly through your settings.
  - **Response Language:** Choose your preferred language for the analysis reports (e.g., English or Portuguese).
- **Smart Optimization & Security:**
  - **Token Efficiency:** Automated logic to strip empty lines and whitespace before processing, maximizing your context window.
  - **Safety Thresholds:** Built-in safeguards for large files (e.g., 4300+ useful lines) to prevent API failures and maintain high analysis quality.
- **API Resilience:** Advanced handling for "503 Service Unavailable" errors and high-demand spikes, ensuring a smooth workflow even during server congestion.

## 🛠️ Supported Languages

The engine provides specialized analysis for a wide range of technologies:

| Category             | Languages                                       |
| :------------------- | :---------------------------------------------- |
| **Web & Backend** | TypeScript, JavaScript, PHP, Ruby, Go, C#, Java |
| **Systems** | C, C++, Python                                  |
| **Gaming & Scripts** | Lua, Luau                                       |
| **Markup & Style** | HTML, CSS                                       |

## ⚙️ Local Setup

1.  Clone this repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Press `F5` to open the Extension Development Host and start reviewing code.

---

### 📝 Important

You must provide your own **Google Gemini API Key** in the extension settings to enable the analysis features.

**Developed by Pedro Goulart Branco**