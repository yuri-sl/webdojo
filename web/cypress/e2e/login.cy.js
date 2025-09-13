import { dataHoje } from "../support/utils";

describe("Login", () => {
  let data = dataHoje();
  beforeEach(() => {
    cy.viewport("iphone-xr"); //Apenas simula a visualização em mobile
  });
  it.only("Deve logar com ssucesso", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");
    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Fernando Papito");
    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and(
        "have.text",
        "Olá QA, esse é o seu Dojo para aprender Automação de Testes."
      );
    cy.getCookie("login_date").should("exist");
    /*
                                cy.getCookie("login_date").should((cookie) => {
                                    expect(cookie.value).to.eq(dataHoje);
                                });
                                */

    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.match(/^[a-fA-F0-9]{32}$/);
    });
  });
  it("Não deve logar com senha inválida", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana321");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });
  //it.skip -> Pula o teste
  it("Não deve logar com email não cadastrado", () => {
    cy.start();
    cy.submitLoginForm("papitoAsd@webdojo.com", "katana321");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });
});
