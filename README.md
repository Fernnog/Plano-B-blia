# Plano de Leitura da Bíblia

## Descrição
Esta é uma aplicação web simples que permite aos usuários criar planos personalizados de leitura da Bíblia. Você pode selecionar livros inteiros ou capítulos específicos, definir um período em dias para completar a leitura e acompanhar seu progresso diário. A aplicação exibe os capítulos a serem lidos a cada dia, sem incluir os textos bíblicos em si.

## Funcionalidades
- **Seleção de Livros ou Capítulos**: Escolha livros da Bíblia ou especifique capítulos individuais.
- **Definição do Período**: Determine quantos dias você deseja levar para completar o plano.
- **Exibição do Plano**: Veja os capítulos distribuídos por dia.
- **Acompanhamento de Progresso**: Marque os capítulos como lidos e avance no plano.

## Como Usar
1. **Selecionar Livros ou Capítulos**:
   - Use o menu dropdown para escolher um ou mais livros da Bíblia (segure Ctrl ou Cmd para múltiplas seleções).
   - Ou digite capítulos específicos no campo de texto, como "Gênesis 1-3, Êxodo 1".
2. **Definir o Período**:
   - Insira o número de dias desejado para completar a leitura.
3. **Criar o Plano**:
   - Clique no botão "Criar Plano" para gerar a distribuição dos capítulos.
4. **Acompanhar o Progresso**:
   - Veja os capítulos do dia atual.
   - Clique em "Marcar como Lido" para registrar seu progresso e passar para o próximo dia.

## Instalação
- Coloque os arquivos `index.html`, `styles.css` e `script.js` na mesma pasta.
- Abra o arquivo `index.html` em um navegador web moderno (como Chrome, Firefox ou Edge).

## Dependências
- Não há dependências externas. A aplicação usa apenas HTML, CSS e JavaScript puros.

## Exemplo de Uso
- **Entrada**:
  - Livros: "Gênesis", "Êxodo"
  - Capítulos: "Levítico 1-5"
  - Dias: 5
- **Saída**:
  - Dia 1: Gênesis 1, Gênesis 2
  - Dia 2: Gênesis 3, Gênesis 4
  - Dia 3: Êxodo 1, Êxodo 2
  - Dia 4: Êxodo 3, Levítico 1
  - Dia 5: Levítico 2, Levítico 3, Levítico 4, Levítico 5

## Melhorias Futuras
- Adicionar suporte para todos os 66 livros da Bíblia.
- Criar uma opção para resetar o plano de leitura.
- Possibilitar integração com APIs para exibir os textos bíblicos (opcional).
