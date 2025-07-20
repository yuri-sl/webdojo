describe("Formulário de consultoria", () => {
  it("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");
    cy.get('input[placeholder="Digite seu nome completo"]').type(
      "Papito Ninja"
    );
    cy.get('input[placeholder="Digite seu email"]').type("papito@gmail.com");
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("11 99999-1000")
      .should("have.value", "(11) 99999-1000");
    //Select
    //cy.get("#consultancyType").select("inCompany");
    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("inCompany");
    cy.contains("span", "Pessoa Física").parent().find("input").check();
    ////span[text()="Pessoa Física"]//..//input
    cy.contains("span", "Pessoa Jurídica").parent().find("input").check();
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
      .type("22654312022")
      .should("have.value", "226.543.120-22");

    const discoveryChannels = [
      "Instagram",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discoveryChannels.forEach((channel) => {
      cy.contains("span", channel)
        .parent()
        .find("input[type='checkbox']")
        .click()
        .should("be.checked");
    });

    cy.get('input[type="file"]').selectFile("./cypress/fixtures/1.pdf", {
      force: true,
    });
    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]'
    )
      .type("Argentina Prateada")
      .should("have.value", "Argentina Prateada");
    const techs = [
      "Cypress",
      "Selenium",
      "WebDriverIO",
      "PlayWright",
      "Robot Framework",
    ];
    techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}");
      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });
    cy.contains("label", "termos de uso")
      .find("input")
      .check()
      .should("be.checked");
    cy.contains("button", "Enviar formulário").click();
    cy.contains(
      "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido."
    ).should("be.visible");
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
