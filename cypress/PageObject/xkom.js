class ObjectPage{
    _acceptCookieBtn = '.sc-1p1bjrl-9';
    _settingsBtn = '.sc-1p1bjrl-8';
    _findProduct = '#recommendedSection > .sc-10tkls1-0 > .sc-10tkls1-3 > .sc-g64zc3-1 > .sc-chtkpc-0 > .sc-g64zc3-2 > .sc-g64zc3-3 > [style="width: 1761.78px; transition: all 350ms ease-out 0s; transform: translate3d(0px, 0px, 0px);"] > :nth-child(1) > :nth-child(1) > .sc-dwwvc2-1 > .sc-30n28d-3 > .sc-2ride2-0 > .sc-30n28d-5 > .sc-30n28d-12 > .sc-1h16fat-0 > .sc-16zrtke-0 > span';
    getAcceptCookiesBtn(){

        return cy.get(this._acceptCookieBtn);
    }
    getSettingsBtn (){
       
        return cy.get(this._settingsBtn);
    }
    getProduct (){
        return cy.get(this._findProduct);
    }

} export default ObjectPage ;