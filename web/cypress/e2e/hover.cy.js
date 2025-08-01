describe("Simulando um mousehover", () => {
  it("Deve mostrar um texto em cima ao dar hover no instagram", () => {
    cy.login();

    cy.contains("Isso é Mouseover!").should("not.exist");
    cy.get('[data-cy="instagram-link"]').realHover();
    cy.contains("Isso é Mouseover!").should("exist");
  });
});
