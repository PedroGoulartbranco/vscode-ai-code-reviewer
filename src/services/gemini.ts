export class Chave_gemini {
    private chave: string;

    constructor(apiKey: string) {
        this.chave = apiKey;
    }

    get chave_string(): string {
        return this.chave;
    }
}