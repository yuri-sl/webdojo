describe("iFrame", () => {
    it("Deve poder tocar o vídeo de exemplo", () => {
        cy.start();
        cy.submitLoginForm("papito@webdojo.com", "katana123");
        cy.contains("Video").click();
        //thinking time (tempo para o vídeo iFrame carregar)
        cy.wait(3000);

        //Verifica se o iFrame existe no DOM, 0.contentDocument.body (como é um array,ele pega o 0, e verifica o document Body
        //) -> wrap serve para conseguir o valkor de uma página de HTML
        cy.get('iframe[title="Video Player"')
            .should("exist")
            .its("0.contentDocument.body")
            .then(cy.wrap)
            .as("iFramePlayer");

        cy.get("@iFramePlayer").find(".play-button").click();
        cy.get("@iFramePlayer").find(".pause-button").should("be.visible").click();
    });
});