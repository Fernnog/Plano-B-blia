# Plano de Leitura da Bíblia

## Descrição
Esta é uma aplicação web simples que permite aos usuários criar planos personalizados de leitura da Bíblia. Você pode selecionar livros inteiros ou capítulos específicos, definir um período em dias para completar a leitura e acompanhar seu progresso diário. A aplicação exibe os capítulos a serem lidos a cada dia, sem incluir os textos bíblicos em si.

## Funcionalidades
- **Seleção de Livros ou Capítulos**: Escolha livros da Bíblia (lista completa com 66 livros) ou especifique capítulos individuais e agora suporta ranges de capítulos (ex: Gênesis 1-3).
- **Definição do Período**: Determine quantos dias você deseja levar para completar o plano.
- **Exibição do Plano**: Veja os capítulos distribuídos por dia.
- **Acompanhamento de Progresso**: Marque os capítulos como lidos e avance no plano.
- **Resetar Plano**: Opção para resetar o plano de leitura e começar um novo.
- **Feedback Visual**: Mensagens de alerta para sucesso na criação do plano, conclusão e resete.

## Como Usar
1. **Selecionar Livros ou Capítulos**:
   - Use o menu dropdown para escolher um ou mais livros da Bíblia (segure Ctrl ou Cmd para múltiplas seleções). A lista agora está completa com todos os 66 livros.
   - Ou digite capítulos específicos no campo de texto. Você pode especificar capítulos únicos como "Gênesis 1" ou ranges como "Gênesis 1-3, Êxodo 1-2". Separe as entradas por vírgula.
2. **Definir o Período**:
   - Insira o número de dias desejado para completar a leitura.
3. **Criar o Plano**:
   - Clique no botão "Criar Plano" para gerar a distribuição dos capítulos. Você receberá uma mensagem de confirmação.
4. **Acompanhar o Progresso**:
   - Veja os capítulos do dia atual na seção "Seu Plano de Leitura".
   - Clique em "Marcar como Lido" para registrar seu progresso e passar para o próximo dia.
5. **Resetar o Plano**:
    - Se desejar iniciar um novo plano, clique no botão "Resetar Plano" para limpar o plano atual e voltar para a tela de criação.

## Instalação
- Coloque os arquivos `index.html`, `styles.css` e `script.js` na mesma pasta.
- Abra o arquivo `index.html` em um navegador web moderno (como Chrome, Firefox ou Edge).

## Dependências
- Não há dependências externas. A aplicação usa apenas HTML, CSS e JavaScript puros.

## Exemplo de Uso
- **Entrada**:
  - Livros: "Gênesis", "Êxodo"
  - Capítulos: "Levítico 1-5, Salmos 23"
  - Dias: 5
- **Saída Aproximada**:
  - Dia 1: Gênesis 1, Gênesis 2, Gênesis 3, ...
  - Dia 2: ..., Êxodo 1, Êxodo 2, ...
  - Dia 3: ..., Levítico 1, Levítico 2, ...
  - Dia 4: ..., Levítico 3, Levítico 4, ...
  - Dia 5: ..., Levítico 5, Salmos 23, ...

## Melhorias Futuras
- Persistência do estado da leitura (dia atual lido) de forma mais robusta (além do localStorage, talvez backend).
- Opções de personalização do plano (ex: ler apenas o Novo Testamento, planos temáticos).
- Integração com APIs para exibir os textos bíblicos (opcional).
- Design responsivo aprimorado para diferentes tamanhos de tela.
