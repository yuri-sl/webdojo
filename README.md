# 🌐 Projeto de Testes Automatizados com Cypress

Este repositório contém **testes End-to-End (E2E)** utilizando o [Cypress](https://www.cypress.io/).  
O objetivo é automatizar cenários críticos da aplicação, garantindo **qualidade, confiabilidade e velocidade** no processo de desenvolvimento.

---

## 🚀 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## 📂 Estrutura do Projeto

A estrutura principal segue o padrão do Cypress:

```
cypress/
 ├── fixtures/        # Arquivos de dados e mocks para os testes
 │   ├── 1.pdf
 │   ├── cep.json
 │   └── consultancy.json
 └── support/         # Utilitários e comandos customizados
     ├── commands.js
     ├── e2e.js
     └── utils.js
```

### Descrição das pastas:

- **fixtures/** → Armazena arquivos JSON, PDFs ou outros dados usados para simulação em testes.  
- **support/** → Contém arquivos de suporte, como comandos customizados (`commands.js`), setup global (`e2e.js`) e utilitários (`utils.js`).

---

## 📜 Scripts Disponíveis

No `package.json` você encontrará os seguintes scripts configurados:

```json
"scripts": {
  "dev": "serve -s dist -p 3000",
  "test": "npx cypress run --config viewportWidth=414,viewportHeight=896",
  "test:ui": "npx cypress open",
  "test:login": "npx cypress run --spec cypress/e2e/login.cy.js",
  "test:login:mobile": "npx cypress run --spec cypress/e2e/login.cy.js"
}
```

### Explicação dos scripts:

- **dev** → Sobe a aplicação estática em `http://localhost:3000`.  
- **test** → Executa todos os testes em modo headless, com viewport mobile (414x896).  
- **test:ui** → Abre a interface interativa do Cypress Test Runner.  
- **test:login** → Executa apenas os testes localizados em `cypress/e2e/login.cy.js`.  
- **test:login:mobile** → Executa o teste de login simulando viewport mobile.  

---

## ▶️ Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie a aplicação:
   ```bash
   npm run start
   ```

3. Execute os testes conforme necessário:

   - Todos os testes em modo headless:
     ```bash
     npm run test
     ```

   - Interface do Cypress:
     ```bash
     npm run test:ui
     ```

   - Apenas o teste de login:
     ```bash
     npm run test:login
     ```

   - Teste de login simulando dispositivo mobile:
     ```bash
     npm run test:login:mobile
     ```

---

## 🧪 Exemplo de Teste (`login.cy.js`)

Abaixo um exemplo simplificado de teste de login:

```javascript
describe("Fluxo de Login", () => {
  it("Deve realizar login com sucesso", () => {
    cy.visit("/login");

    cy.get("input[name=email]").type("usuario@teste.com");
    cy.get("input[name=password]").type("senha123");

    cy.get("button[type=submit]").click();

    cy.url().should("include", "/dashboard");
    cy.contains("Bem-vindo").should("be.visible");
  });
});
```

---

## 📖 Notas

- É necessário rodar `npm run start` antes de iniciar os testes, garantindo que a aplicação esteja acessível.  
- As **fixtures** podem ser utilizadas para mock de dados dinâmicos em testes (ex: carregamento de JSON).  
- Os comandos customizados no arquivo `support/commands.js` ajudam a simplificar e reutilizar passos de testes.  

---

## 🛠️ Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) → Framework de testes E2E  
- [Node.js](https://nodejs.org/) → Ambiente de execução  
- [Serve](https://www.npmjs.com/package/serve) → Servidor local para rodar o build da aplicação  

---

## 🤝 Contribuição

Sinta-se à vontade para **abrir issues** ou **enviar pull requests** com melhorias.  
Sugestões de novos testes ou refatorações são sempre bem-vindas!

---

## 👨‍💻 Autor

Projeto desenvolvido e mantido por **[Seu Nome]** 💻  
Entre em contato para colaborações ou sugestões!
