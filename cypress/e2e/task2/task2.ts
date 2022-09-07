describe('Kiwi Task 1', () => {

    const partner = 'cypress'
    const partnerMarket = ['CZ']
    const flyFromLocations = ['PRG']
    const flyToLocations = ['IST']
    let bookingToken

    it('precondition: should get booking token', () => {
        cy.request({
            method: 'GET', url: `https://api.skypicker.com/flights?partner=${partner}&partner_market=${partnerMarket[0]}&fly_from=${flyFromLocations[0]}&fly_to=${flyToLocations[0]}`,

        })
            .its('body')
            .then((body) => {
                this.bookingToken = body.data[0].booking_token
            })


    })

    it('should display kiwi landing page', () => {

        cy.visit(`/booking?token=${this.bookingToken}`)

        cy.get('body')
            .then(($body) => {
                if ($body.find('.Modal__ModalWrapperContent-sc-15ie1vv-3')) {
                    cy.get('[data-test="CookiesPopup-Accept"]')
                        .should('be.visible')
                        .click()


                    cy.get('.Modal__ModalWrapperContent-sc-15ie1vv-3')
                        .should('not.exist')
                }
            })


    })


})