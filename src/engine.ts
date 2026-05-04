import * as vscode from 'vscode'; 
import { Gemini_Bot } from './services/gemini';
import {  mostrar_revisao, mostrar_erro} from './ui-utils';
import { verifiar_chave, pegar_modelo_json } from './utils';

export async function decidir_modelo_de_resposta(nome_arquivo: string, linguagem: string, codigo: string, gemini: Gemini_Bot, idioma: string, numero_linhas: number) {
    try {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification, 
            title: "Gemini Code Reviewer",
            cancellable: false 
        }, async (progress) => {
            let mensagem_esperando = `Gerando ${linguagem} revisão...`;
            if (idioma === "English") {
                mensagem_esperando = `Generating ${linguagem} review...`;
            }
            progress.report({ message: mensagem_esperando });
            try {
                if (numero_linhas >= 4300) {
                    //Tira as linhas vazias
                    const codigo_limpo = codigo
                    .split('\n')
                    .filter(linha => linha.trim() !== '')
                    .join('\n');

                    numero_linhas = codigo_limpo.split('\n').length;

                    if (numero_linhas >= 5000) {
                        let mensagem_erro_linhas = `Arquivo muito grande (${numero_linhas} linhas úteis). A análise pode falhar. Prosseguir?`;
                        const confirmacao = await vscode.window.showWarningMessage(
                            mensagem_erro_linhas,
                            'Sim', 'Cancelar'
                        );
                        if (confirmacao !== 'Sim') return;
                    }
                }
                let resultado = await gemini.gerar_revisao(codigo, nome_arquivo, linguagem, String(idioma));
                let modelo = pegar_modelo_json();
                mostrar_revisao(resultado.revisao, linguagem, resultado.idioma, modelo);
                console.log(numero_linhas);
                
            } catch (erro) {
                mostrar_erro(erro);
            }
        });
    } 
    catch (erro) {
       mostrar_erro(erro);
    }
}