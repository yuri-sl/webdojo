describe("kanban Board", () => {
  it("Deve mover uma tarefa de Todo para Done e atualizar o board", () => {
    cy.login();
    cy.contains("Kanban").click();

    const dataTransfer = new DataTransfer(); //Recurso DataTransfer de JavaScript para transferir para outra hierarquia HTML

    cy.contains("div[draggable=true]", "Documentar API").trigger("dragstart", {
      dataTransfer,
    });
    cy.get(".column-done")
      .trigger("drop", { dataTransfer })
      .find("h3")
      .should("have.text", "Done (4)");

    //include.text verifica se o texto de elemento contém ma substring específica.
    cy.get(".column-done")
      .and("include.text", "Documentar API")
      .and("include.text", "Criar documentação da API com Swagger");
  });
});
