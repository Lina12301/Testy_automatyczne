/// <reference types="cypress" />
import pass from '../../fixtures/data.json'
import ObjectPage from '../../PageObject/xkom'
const xkom = new ObjectPage();

Cypress.Commands.add('closePopUp', ()=>{
    xkom.getAcceptCookiesBtn().click().wait(5000);
})
Cypress.Commands.add('addItem', ()=>{
    xkom.getProduct().click();
        cy.get('.sc-1hdxfw1-1')
        .click();
       cy.wait(5000);
})
beforeEach('setup', ()=>{
    cy.visit ('/');
    cy.url().should('contain', 'x-kom');
    ;
})
describe ('tests of cookie pop-up on x-kom.pl', ()=>{
   
    it('accept cookies', ()=>{
        xkom.getAcceptCookiesBtn().should('be.visible');
        xkom.getAcceptCookiesBtn().click();
        xkom.getAcceptCookiesBtn().should('be.not.visible');
    })
    it ('change a cookie setting', ()=>{
        xkom.getSettingsBtn().should('be.visible');
        xkom.getSettingsBtn().click();
        cy.get('h3').should('contain', 'Dostosowujemy się do Ciebie'); 
        cy.get(':nth-child(5) > .sc-1p1bjrl-15 > .sc-1p1bjrl-17 > .sc-1s6540e-1 > .sc-1s6540e-0').should('have.attr', 'aria-pressed', 'false');
        cy.get(':nth-child(5) > .sc-1p1bjrl-15 > .sc-1p1bjrl-17 > .sc-1s6540e-1 > .sc-1s6540e-2').click();
        cy.get(':nth-child(5) > .sc-1p1bjrl-15 > .sc-1p1bjrl-17 > .sc-1s6540e-1 > .sc-1s6540e-0').should('have.attr', 'aria-pressed', 'true')
        cy.get('.sc-1p1bjrl-8').click();
      })
})
describe('testing main functionalities', ()=>{
    it('search some e.g. product', ()=>{
        cy.closePopUp();
        cy.get('.sc-suk8z4-0').type('asus{enter}');
        //cy.get('.sc-1p0xkzn-7').click();
        cy.url().should('contain', 'asus');
    })
    it('adding item to shopbasket', ()=>{
        cy.closePopUp();
        xkom.getProduct().click();
        cy.get('.sc-1hdxfw1-1')
        .click();
       cy.wait(5000);
       cy.get('.sc-1v4lzt5-12 > .sc-1h16fat-0')
       .click();
       cy.wait(5000);
       cy.url().should('contain','koszyk');
      cy.get('.sc-1toiv8x-1').should('be.visible' )
    })
     it('delete products from basket', ()=>{
        cy.closePopUp();
        cy.addItem();
        cy.get('.sc-an0bcv-13').click();
        cy.get('.bNbQMM > .sc-1tblmgq-1').click()
        cy.get('.sc-69bo37-1 > .sc-13bjpvm-2 > .sc-1h16fat-0').click();
        cy.get('.sc-1muoppy-5 > .sc-1h16fat-0').click();
       cy.get('.sc-1toiv8x-2').should('contain', 'Koszyk');
        cy.get('.sc-17bkz68-1 > .sc-w2d8hn-1 > .sc-w2d8hn-2').click();
        cy.get('.sc-1im0ihg-0').click();
        cy.get('.sc-1btrn13-1').should('contain', 'Twój koszyk jest pusty');
    })
     it ('change number of product', ()=>{    
        cy.closePopUp();
        cy.addItem(); 
        cy.get('.sc-1v4lzt5-12 > .sc-1h16fat-0').click();
       cy.wait(5000);
       cy.url().should('contain','koszyk');
       cy.get('.Select-arrow-zone').click();
       cy.get('.Select-menu-outer').children().children().eq(1).click();
       cy.get('.sc-3a7azd-2').should('contain', 'Liczba produktów zmieniona.');
    })
    it ('correct login',()=>{
        cy.closePopUp();
        cy.get('.sc-69bo37-2 > .sc-13bjpvm-2 > .sc-1h16fat-0').click();
        cy.get('.sc-1ezn6wm-2').click();
        cy.get('.sc-dscwo7-1').should('contain', 'Zaloguj się');
       cy.get('.sc-1k5v2vw-0 > .sc-3ncbnj-0 > .sc-3ncbnj-3').type(pass[0].email);
       cy.get('.sc-1akovi1-0 > .sc-3ncbnj-0 > .sc-3ncbnj-3').type(pass[0].password);
       cy.get('.sc-6i4pc6-2').click();
       cy.get('.sc-ci2k79-5 > .sc-1ezn6wm-0 > .sc-1ezn6wm-10 > .sc-1ezn6wm-7 > .sc-a8nzxk-0 > :nth-child(1) > .sc-1h16fat-0 > .sc-fzoant').click();
       cy.url().should('contain', 'konto');
    })
    
    it('incorrect login details', ()=>{
        cy.closePopUp();
        cy.get('.sc-69bo37-2 > .sc-13bjpvm-2 > .sc-1h16fat-0').click();
        cy.get('.sc-1ezn6wm-2').click();
        cy.get('.sc-dscwo7-1').should('contain', 'Zaloguj się');
        cy.get('.sc-1k5v2vw-0 > .sc-3ncbnj-0 > .sc-3ncbnj-3').type(pass[1].uncorretemail2);
        cy.get('.sc-1akovi1-0 > .sc-3ncbnj-0 > .sc-3ncbnj-3').type(pass[0].password);
        cy.get('.sc-6i4pc6-2').click();
        cy.get('.sc-1nwq0d4-1').should('contain','Sprawdź, czy adres e-mail i hasło są poprawne');
    })
   it('unsuccessful sign-up for newsletters', ()=>{
            cy.closePopUp();
        cy.get('.sc-1pdb6es-2 > .gDfVgj').scrollIntoView();
            cy.get('.sc-1s2eiz4-0').type(pass[1].uncorretemail1);
            cy.get('.sc-1pdb6es-2 > .gDfVgj').scrollIntoView();
            cy.get('.sc-6i4pc6-2').click();
            cy.get('.sc-1nwq0d4-1').should('contain', 'Adres e-mail jest niepoprawny. Adres musi mieć jeden znak @.');
            cy.get('.sc-1pdb6es-2 > .gDfVgj').scrollIntoView();
            cy.get('.sc-1s2eiz4-0').type(pass[1].uncorretemail2);
            cy.get('#brandZoneSection > .sc-10tkls1-0 > .sc-10tkls1-4 > .sc-10tkls1-5 > .sc-10tkls1-1').scrollIntoView();
            cy.get('.sc-6i4pc6-2').click();
            cy.get('.sc-1pdb6es-2 > .gDfVgj').scrollIntoView();
            cy.get('#error').should('contain', 'Wpisz poprawny adres email.');
        })
       
   
    it('add review', ()=>{
        cy.closePopUp();
        xkom.getProduct().click();
        cy.get(':nth-child(5) > .sc-94cfiy-2').click()
        cy.get('.sc-1b6o3ri-6 > .sc-15ih3hi-0').click();
        cy.get('.sc-1yi0v8e-0 > .sc-3g60u5-0 > .sc-1ngc1lj-0 > :nth-child(5) > .sc-1tblmgq-1').click();
        cy.get(':nth-child(6) > .sc-1k5v2vw-0 > .sc-3ncbnj-0 > .sc-3ncbnj-3').type('Ola');
        cy.get(':nth-child(7) > .sc-1k5v2vw-0 > .sc-3ncbnj-0 > .sc-3ncbnj-3').type(pass[0].email);
        cy.get('.sc-1wwtgpq-0').type('Super sprzęt');
        cy.get(':nth-child(11) > .sc-15ih3hi-0').click();
        cy.get('.sc-fzqPZZ').should('contain', 'Twoja opinia została wysłana');

    })

})

  
