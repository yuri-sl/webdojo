describe("Formulário de consultoria", () => {
  before(() => {
    cy.log("Essa execução será feita");
  });
  beforeEach(() => {
    cy.login();
    cy.goTo("Formulários", "Consultoria");
  });
  it("Deve solicitar consultoria individual", () => {
    //Super massa de testes
    const consultancyForm = {
      name: "Fernando Papito",
      email: "papito@teste.com.br",
      phone: "11 99999-1000",
      consultancyType: "Individual",
      personType: "cpf",
      document: "65602530070",
      discoveryChannels: [
        "Instagram",
        "Udemy",
        "YouTube",
        "Indicação de Amigo",
      ],
      file: "./cypress/fixtures/1.pdf",
      description: "Argentina Prateada",
      techs: [
        "Cypress",
        "Selenium",
        "WebDriverIO",
        "PlayWright",
        "Robot Framework",
      ],
      terms: true,
    };
    cy.get('input[placeholder="Digite seu nome completo"]').type(
      consultancyForm.name
    );
    cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email);
    cy.get('input[placeholder="(00) 00000-0000"]').type(consultancyForm.phone);
    //.should("have.value", "(11) 99999-1000");
    //Select
    //cy.get("#consultancyType").select("inCompany");
    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("inCompany");
    cy.contains("span", "Pessoa Física").parent().find("input").check();
    ////span[text()="Pessoa Física"]//..//input
    cy.contains("span", "Pessoa Jurídica").parent().find("input").check();
    if (consultancyForm.personType === "cpf") {
      cy.contains("span", "Pessoa Física")
        .parent()
        .find("input")
        .check()
        .should("be.checked");

      cy.contains("label", "Pessoa Jurídica")
        .find("input")
        .should("be.not.checked");
    }
    if (consultancyForm.personType === "cnpj") {
      cy.contains("span", "Pessoa Física")
        .parent()
        .find("input")
        .check()
        .should("be.not.checked");

      cy.contains("label", "Pessoa Jurídica")
        .find("input")
        .should("be.checked");
    }
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

    consultancyForm.discoveryChannels.forEach((channel) => {
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
  it("Deve solicitar consultoria InCompany", () => {
    //Super massa de testes
    const consultancyForm = {
      name: "Fernando Papito",
      email: "papito@teste.com.br",
      phone: "11 99999-1000",
      consultancyType: "Individual",
      personType: "cnpj",
      document: "65602530070",
      discoveryChannels: [
        "Instagram",
        "Udemy",
        "YouTube",
        "Indicação de Amigo",
      ],
      file: "./cypress/fixtures/1.pdf",
      description: "Argentina Prateada",
      techs: [
        "Cypress",
        "Selenium",
        "WebDriverIO",
        "PlayWright",
        "Robot Framework",
      ],
      terms: true,
    };
    cy.get('input[placeholder="Digite seu nome completo"]').type(
      consultancyForm.name
    );
    cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email);
    cy.get('input[placeholder="(00) 00000-0000"]').type(consultancyForm.phone);
    //.should("have.value", "(11) 99999-1000");
    //Select
    //cy.get("#consultancyType").select("inCompany");
    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("inCompany");
    cy.contains("span", "Pessoa Física").parent().find("input").check();
    ////span[text()="Pessoa Física"]//..//input
    cy.contains("span", "Pessoa Jurídica").parent().find("input").check();
    if (consultancyForm.personType === "cpf") {
      cy.contains("span", "Pessoa Física")
        .parent()
        .find("input")
        .check()
        .should("be.checked");

      cy.contains("label", "Pessoa Jurídica")
        .find("input")
        .should("be.not.checked");
    }
    if (consultancyForm.personType === "cnpj") {
      cy.contains("span", "Pessoa Física")
        .parent()
        .find("input")
        .check()
        .should("be.not.checked");

      cy.contains("label", "Pessoa Jurídica")
        .find("input")
        .should("be.checked");
    }
    cy.contains("label", "cnpj").parent().find("input");

    cy.get('input[placeholder="000.000.000-00"]')
      .type("22654312022")
      .should("have.value", "226.543.120-22");

    const discoveryChannels = [
      "Instagram",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    consultancyForm.discoveryChannels.forEach((channel) => {
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
  it("Deve testar os campos ao tentar submeter um formulário sem validar", () => {
    cy.contains("button", "Enviar formulário").click();

    /*
                cy.contains("label", "Nome Completo")
                  .parent()
                  .find("p")
                  .should("be.visible")
                  .should("have.text", "Campo obrigatório")
                  .and("have.class", "text-red-400")
                  .and("have.css", "color", "rgb(248,113,113)");
                cy.contains("label", "Email").parent();
                */
  });
  afterEach(() => {
    cy.log("Isso acontece depois de cada teste");
  });
  after(() => {
    cy.log("Isso acontece depois de todos os testes uma única vez");
  });
});
