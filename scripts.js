/* 
Lógica de Programação

Algoritmo - Receita de BOLO

[x] Saber quando o botão foi clicado
[x] Pegar o texto do TextArea
[x] Enviar para a IA(servidor)
[x] Pegar a resposta da IA
[x] Colocar na tela
    [x] Código
    [x] Resultado do Código     
[ ] Refinar nosso resultado        

    querySelector - pega um elemento que eu escolher
    HTML - document
    JavaScript - script
*/
let endereco = "https://api.groq.com/openai/v1/chat/completions"

let prompt = `Você é um designer web premiado e Programador. 
Crie uma landing page COMPLETA e VISUALMENTE IMPRESSIONANTE para o negócio descrito.

                    Regras de resposta CRUCIAL:
                    - Escreva TODO o código em um único bloco contendo o HTML e o CSS juntos.
                    - Todo o CSS DEVE obrigatoriamente estar dentro de uma tag <style> no <head> do HTML.
                    - NÃO tente importar arquivos externos como 'style.css', 'styles.css' ou 'estilo.css'.
                    - Responda APENAS com o código puro. Não use crases (\`\`\`), markdown ou explicações antes/depois do código.
                    - Não use tags <img>.

                    Identidade visual (capriche e surpreenda):
                    - Invente uma paleta de cores única que combine com a essência do negócio
                    - Escolha uma Google Font marcante via @import dentro da tag <style>
                    - Use emojis grandes no lugar de imagens
                    - Use CSS moderno: gradientes, sombras, animações sutis, layout generoso, tipografia forte

                    Estrutura da página:
                    - Header com nome do negócio e menu
                    - Hero impactante com título, subtítulo e botão CTA
                    - Seção de diferenciais com emojis
                    - Depoimento de cliente
                    - Footer com contato

Todo o conteúdo em português, criativo e específico para o negócio.`


// Clicou no Botão GERAR - Chama essa função
async function gerarCodigo() {


    let textarea = document.querySelector(".texto-pagina").value

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer INSIRA_SUA_CHAVE_DA_GROQ_AQUI"

        },
        body: JSON.stringify({
            "model": "llama-3.3-70b-versatile",
            "messages": [
                // user = usuário - a pessoa que está mexendo no site pede
                // system = quem a IA deve ser
                {
                    "role": "user",
                    "content": textarea
                },
                {
                    "role": "system",
                    "content": prompt
                }
            ],
        })
    })


    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    // ESTA LINHA ABAIXO LIMPA AS CRASES CASO A IA SE ESQUEÇA E COLOQUE ELAS
    resultado = resultado.replace(/```html/g, "").replace(/```/g, "").trim()

    let espacoCodigo = document.querySelector(".bloco-codigo")
    let espacoSite = document.querySelector(".bloco-site")

    espacoCodigo.textContent = resultado
    espacoSite.srcdoc = resultado



}

// Função para copiar o código gerado
function copiarCodigo() {
    // Pega o texto de dentro do bloco de código
    let codigo = document.querySelector(".bloco-codigo").textContent
    
    // Verifica se não está com o texto padrão inicial
    if (codigo === "O código gerado aparecerá aqui..." || codigo.trim() === "") {
        alert("Gere um site primeiro antes de copiar!");
        return;
    }

    // Copia para a área de transferência (Ctrl + C do sistema)
    navigator.clipboard.writeText(codigo).then(() => {
        let botao = document.querySelector(".botao-copiar")
        
        // Efeito visual maneiro de feedback para o usuário
        botao.textContent = "✓ Copiado!"
        botao.style.background = "#22c55e"
        botao.style.color = "#000"

        // Volta o botão ao normal depois de 2 segundos
        setTimeout(() => {
            botao.textContent = "Copiar Código"
            botao.style.background = "#27272a"
            botao.style.color = "#fafafa"
        }, 2000)
    })
}

/* IA para gerar o que queremos 

1) Qual o modelo de IA vamos usar
2) system - Quem a IA deve ser - Programador / Designer
3) user - mensagem do usuário
*/