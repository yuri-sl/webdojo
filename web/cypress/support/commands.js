// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Os commands ficam em inglês, enquanto que os its ficam em português.

import "cypress-real-events";

Cypress.Commands.add("start", () => {
  cy.viewport(1440, 900);
  cy.visit("http://localhost:3000");
});
Cypress.Commands.add("submitLoginForm", (email, senha) => {
  cy.get("#email").type(email);
  cy.get("#password").type(senha);

  cy.contains("button", "Entrar").click();
});
Cypress.Commands.add("login", () => {
  cy.start();
  cy.submitLoginForm("papito@webdojo.com", "katana123");
});
Cypress.Commands.add("goTo", (buttonName, pageTitle) => {
  cy.contains("button", buttonName).should("be.visible").click();
  cy.contains("h1", pageTitle).should("be.visible");
  //cy.contains("h4", "Formulários")
  //  .parent()
  //  .parent()
  //  .parent()
  //  .should("be.visible");
});

Cypress.Commands.add("interactInputPlaceholder", (placeholder, text) => {
  cy.get(`input[placeholder=${placeholder}]`).type(text);
});
Cypress.Commands.add("fillConsultancyForm", (personal) => {
  //ArrowHead function não consegue identificar o this de objetos que foram definidos em outras funções.
  //const personal = this.consultancyData.personal;
  cy.get('input[placeholder="Digite seu nome completo"]').type(personal.name);
  cy.get('input[placeholder="Digite seu email"]').type(personal.email);
  cy.get('input[placeholder="(00) 00000-0000"]').type(personal.phone);
  //Select
  cy.contains("label", "Tipo de Consultoria")
    .parent()
    .find("select")
    .select("inCompany");
  cy.contains("span", "Pessoa Física").parent().find("input").check();
  ////XPath: span[text()="Pessoa Física"]//..//input
  cy.contains("span", "Pessoa Jurídica").parent().find("input").check();
  if (personal.personType === "cpf") {
    cy.contains("span", "Pessoa Física")
      .parent()
      .find("input")
      .check()
      .should("be.checked");

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("be.not.checked");
    cy.contains("label", "CPF").parent().find("input");

    cy.get('input[placeholder="000.000.000-00"]')
      .type(personal.document)
      .should("have.value", "656.025.300-70");
  }
  if (personal.personType === "cnpj") {
    cy.contains("span", "Pessoa Física")
      .parent()
      .find("input")
      .should("be.not.checked");

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .check()
      .should("be.checked");

    cy.contains("label", "CNPJ").parent().find("input");

    cy.get('input[placeholder="00.000.000/0000-00"]')
      .type(personal.document)
      .should("have.value", "65.602.530/0700-00");
  }
  personal.discoveryChannels.forEach((channel) => {
    cy.contains("span", channel)
      .parent()
      .find("input[type='checkbox']")
      .click()
      .should("be.checked");
  });

  cy.get('input[type="file"]').selectFile("./cypress/fixtures/1.pdf", {
    force: true,
  });
  cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
    .type(personal.description)
    .should("have.value", personal.description);
  personal.techs.forEach((tech) => {
    cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
      .type(tech)
      .type("{enter}");
    cy.contains("label", "Tecnologias")
      .parent()
      .contains("span", tech)
      .should("be.visible");
  });
  cy.contains("Li e aceito os").parent().find('[type="checkbox"]').click();
});
Cypress.Commands.add("submitConsultancyForm", () => {
  cy.contains("button", "Enviar formulário").click();
});
Cypress.Commands.add("validadeConsultancyModal", () => {
  cy.contains(
    "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
    { timeout: 6000 }
  ).should("be.visible");
});
