describe("testando", () => {
    beforeEach(() => {
        cy.login(false);
        cy.goTo("Tabela", "Perfis do GitHub");
    });
    it("Deve cadastrar um novo perfil na página de perfis do GitHub", () => {
        cy.log("Continuamos aqui");
        cy.get("#name").click().type("Fernando Papito");
        cy.get("#username").click().type("Papito Dev");
        cy.get("#profile").click().type("QA");
        cy.contains("button", "Adicionar Perfil").click();

        cy.contains("table tbody tr", "Fernando Papito")
            .should("be.visible")
            .as("trProfile")
            .contains("Fernando Papito")
            .should("be.visible");
        cy.get("@trProfile").contains("td", "QA").should("be.visible");
    });
    it("Deve poder remover um perfil do GitHub", () => {
        const profile = {
            name: "Fernando Papito",
            username: "papito123",
            profile: "QA",
        };
        cy.get("#name").click().type(profile.name);
        cy.get("#username").click().type(profile.username);
        cy.get("#profile").click().type(profile.profile);
        cy.contains("button", "Adicionar Perfil").click();
        cy.contains("table tbody tr", profile.username)
            .should("be.visible")
            .as("trProfile");
        cy.get("@trProfile").find('button[title="Remover perfil"]').click();

        cy.contains("table tbody", profile.username).should("not.exist");
    });
    it("Deve poder validar um perfil do GitHub", () => {
        const profile = {
            name: "Fernando Papito",
            username: "papito123",
            profile: "QA",
        };
        cy.get("#name").click().type(profile.name);
        cy.get("#username").click().type(profile.username);
        cy.get("#profile").click().type(profile.profile);
        cy.contains("button", "Adicionar Perfil").click();
        cy.contains("table tbody tr", profile.username)
            .should("be.visible")
            .as("trProfile");
        cy.get("@trProfile")
            .find("a")
            .should("have.attr", "href", "https://github.com/" + profile.username)
            .and("have.attr", "target", "_blank");
    });
});