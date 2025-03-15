# Plano de Leitura Bíblica Personalizado (Web App)

Este projeto é uma aplicação web para criar e gerenciar planos de leitura bíblica personalizados. Desenvolvido utilizando React e Firebase, ele permite que usuários criem seus próprios planos de leitura e acompanhem seu progresso.

## Funcionalidades Implementadas Até o Momento

*   **Autenticação de Usuário:**
    *   **Login:** Usuários podem fazer login utilizando email e senha.
    *   **Cadastro:** Novos usuários podem criar contas para salvar seus planos e progresso.
    *   Autenticação gerenciada pelo Firebase Authentication, garantindo segurança e facilidade de uso.

*   **Criação de Planos de Leitura Personalizados:**
    *   **Formulário de Criação:** Interface simples para criar novos planos de leitura.
    *   **Nome do Plano:** Defina um nome para identificar o plano.
    *   **Definição de Leituras:** Insira as leituras bíblicas desejadas no formato "Livro Capítulo" (ex: "Gênesis 1; Mateus 5-7").
    *   Os planos criados são associados ao usuário logado.

*   **Listagem de Planos de Leitura:**
    *   **Visualização dos Planos:** Exibição clara dos planos de leitura criados pelo usuário.
    *   **Detalhes do Plano:** Cada plano lista as leituras bíblicas definidas.

*   **Acompanhamento de Progresso:**
    *   **Marcação de Leituras Concluídas:** Checkboxes interativos para marcar cada leitura como concluída.
    *   **Cálculo de Progresso:** Exibição da porcentagem de progresso para cada plano, mostrando visualmente o avanço do usuário.
    *   O progresso é salvo e associado à conta do usuário, permitindo acompanhamento contínuo.

*   **Persistência de Dados:**
    *   **Firebase Firestore:** Utilizado como banco de dados para armazenar os planos de leitura e o progresso dos usuários.
    *   Os dados são salvos na nuvem, garantindo acesso de qualquer dispositivo após login.

*   **Interface de Usuário Moderna (Básica):**
    *   **Estilização CSS:** Aplicação de estilos CSS para proporcionar uma interface mais agradável e moderna.
    *   Layout responsivo (em desenvolvimento), adaptando-se a diferentes tamanhos de tela (desktops e dispositivos móveis).

## Tecnologias Utilizadas

*   **Front-end:**
    *   **React:** Biblioteca JavaScript para construção de interfaces de usuário dinâmicas e interativas.
    *   **HTML, CSS, JavaScript:**  Tecnologias web fundamentais para a estrutura, estilo e comportamento da página.

*   **Back-end e Banco de Dados:**
    *   **Firebase:** Plataforma completa do Google para desenvolvimento web e mobile, utilizada para:
        *   **Firebase Authentication:** Gerenciamento de autenticação de usuários (login, cadastro).
        *   **Firebase Firestore:** Banco de dados NoSQL para armazenamento dos dados da aplicação (planos e progresso).

## Próximos Passos (Funcionalidades Futuras)

*   **Melhorias na Interface de Usuário:** Refinar o design, responsividade e usabilidade da página.
*   **Edição e Exclusão de Planos:** Permitir que os usuários editem e excluam seus planos de leitura.
*   **Planos de Leitura Sugeridos/Padrão:** Adicionar opções de planos de leitura predefinidos.
*   **Visualização de Progresso Aprimorada:** Implementar gráficos ou outras representações visuais para o progresso.
*   **Integração com API da Bíblia:** Buscar textos bíblicos de APIs para exibir diretamente na página e validar leituras.
*   **Compartilhamento de Planos:** Permitir que usuários compartilhem seus planos com outros.
*   **Notificações:** Implementar notificações (push ou email) para lembrar o usuário de suas leituras diárias.

## Como Executar o Projeto Localmente

1.  **Clone este repositório:**
    ```bash
    git clone [URL do seu repositório]
    cd [nome da pasta do repositório]
    ```
2.  **Instale as dependências:**
    ```bash
    npm install  # ou yarn install
    ```
3.  **Configure o Firebase:**
    *   Certifique-se de ter criado um projeto no Firebase Console.
    *   No arquivo `src/firebase.js`, substitua as chaves de configuração de exemplo pelas **SUAS** chaves do Firebase (apiKey, authDomain, projectId, etc.).
4.  **Inicie a aplicação:**
    ```bash
    npm start  # ou yarn start
    ```
5.  Abra o navegador e acesse `http://localhost:3000`.

## Contribuições

Contribuições são bem-vindas! Se você tiver ideias de melhorias ou encontrar bugs, por favor, abra uma issue ou envie um pull request.

---

Este é um projeto em desenvolvimento contínuo. Fique à vontade para acompanhar as atualizações e contribuir!
