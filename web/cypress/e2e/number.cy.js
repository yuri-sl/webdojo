describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/random_num.html");
  });
  it("gera um número ao clicar e pesquisa por ele", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("button").click();
    cy.get("#numero")
      .invoke("text")
      .then((text) => {
        const numeroGerado = text.match(/\d+/)[0];
        cy.wrap(numeroGerado).as("numeroSalvo");
      });
    //reutilizando o alias
    cy.get("@numeroSalvo").then((valor) => {
      cy.get("#pesquisa").clear().type(valor);
    });
    //pode reutilizar aqui
    cy.get("@numeroSalvo").then((valor) => {
      cy.log("Número gerado e salvo: " + valor);
    });
    /* ==== End Cypress Studio ==== */
  });
});
