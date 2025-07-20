describe("Formulário de consultoria", () => {
  it("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");
    cy.get('input[placeholder="Digite seu nome completo"]').type("PapitoNinja");
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("11 99999-1000")
      .should("have.value", "(11) 99999-1000");
    //Select
    //cy.get("#consultancyType").select("inCompany");
    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("inCompany");
  });
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
  //tagHTML[chave=valor]
});
