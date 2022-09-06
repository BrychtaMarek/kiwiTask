
describe('Kiwi Task 1', () => {
  it('should display kiwi landing page', () => {
    cy.visit('/cz')

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

    cy.get('[data-test="BrandingNameContainer"]')
      .should('be.visible')
      .and('contain.text', 'Mír pro všechny')
  })

  it('should search for destination', () => {
    const destination = 'Istanbul'
    cy.get('[data-test="SearchPlaceField-destination"]')
      .should('be.visible')
      .and('not.be.disabled')
      .type(destination)
      .wait(1000)

    cy.get('[data-test="PlacepickerModalOpened-destination"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-test="PlacePickerRow-wrapper"]')
          .contains(destination)
          .should('be.visible')
          .click()
      })

    cy.get('[data-test="SearchPlaceField-destination"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-test="PlacePickerInputPlace"]')
          .should('be.visible')
          .and('contain.text', destination)
      })
  })

  it('should add one more person to flight', () => {
    cy.get('[data-test="PassengersField"]')
      .should('be.visible')
      .click()

    cy.get('[data-test="PassengersPopover"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-test="PassengersRow-adults"]')
          .should('be.visible')
          .within(() => {
            cy.get('input')
              .should('be.visible')
              .and('have.value', '1')

            cy.get('button[aria-label="increment"]')
              .should('be.visible')
              .and('not.be.disabled')
              .click()

            cy.get('input')
              .should('be.visible')
              .and('have.value', '2')
          })
        cy.get('[data-test="PassengersFieldFooter-done"]')
          .should('be.visible')
          .and('not.be.disabled')
          .click()
      })

    cy.get('[data-test="PassengersPopover"]')
      .should('not.exist')

    cy.get('[data-test="PassengersField-note-2"]')
      .first()
      .should('be.visible')
      .and('have.text', '2')
  })

  it('should uncheck the Booking.com accomodation search checkbox', () => {

    cy.get('div.BookingcomSwitchstyled__StyledBookingcomSwitch-sc-otfzia-0 input[type="checkbox"]')
      .should('not.be.disabled')
      .and('be.checked')
      .uncheck({ force: true })
      .should('not.be.checked')

  })

  it('should search and display the results', () => {
    cy.get('[data-test="LandingSearchButton"]')
      .should('be.visible')
      .and('not.be.disabled')
      .and('have.text', 'Hledat')
      .click()

    cy.url()
      .should('include', '/hledej/results/')

    cy.get('[data-test="ResultList-results"]')
      .should('be.visible')
  })

  it('should sort results by price', () => {
    cy.get('[data-test="ResultList-results"]')
      .should('be.visible')

    cy.get('[data-test="SortBy-price"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click()

    cy.url()
      .should('include', 'sortBy=price')

    cy.get('[data-test="ResultCardWrapper"]')
      .each((index) => {
        let previousResultPrice = 0

        cy.get('.ResultCardItineraryPlacestyled__SemiBold-sc-1ekdizc-2')
          .first()
          .should('be.visible')
          .and('contain.text', 'Praha')

        cy.get('.ResultCardItineraryPlacestyled__SemiBold-sc-1ekdizc-2')
          .eq(1)
          .should('be.visible')
          .and('contain.text', 'Istanbul')

        cy.get('.ResultCardItineraryPlacestyled__SemiBold-sc-1ekdizc-2')
          .eq(2)
          .should('be.visible')
          .and('contain.text', 'Istanbul')

        cy.get('.ResultCardItineraryPlacestyled__SemiBold-sc-1ekdizc-2')
          .eq(3)
          .should('be.visible')
          .and('contain.text', 'Praha')

        cy.get('[data-test="ResultCardPrice"] .ResultCardstyled__ResultCardActionsPrice-sc-vsw8q3-7')
          .should('be.visible')
          .and('not.be.empty')
          .then(($price) => {
            let priceText = $price.text().replace(/[^0-9]/g, '')
            let actualResultPrice = Number(priceText)
            assert.isAtLeast(actualResultPrice, previousResultPrice)

            previousResultPrice = Number(priceText)
          })



        cy.get('[data-test="ResultCardPrice"] span')
          .should('be.visible')
          .and('contain.text', 'za tuto cenu: 2')
      })

  })

  it('should continue to reservation page', () => {
    cy.get('[data-test="ResultCardWrapper"]')
      .first()
      .should('be.visible')
      .find('[data-test="BookingButton"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click()


    cy.get('[data-test="MagicLogin-RequiredLogin"]')
      .should('be.visible')
      .and('contain.text', 'Nechcete se nejdřív přihlásit?')
      .find('[data-test="MagicLogin-GuestTextLink"]')
      .should('be.visible')
      .click({ force: true })

    cy.url()
      .should('include', '/booking?activeStep=0')

    cy.get('[data-test="CommonJourneyHead"]')
      .should('be.visible')
      .and('contain.text', 'Praha')
      .and('contain.text', 'Istanbul')
  })

})
