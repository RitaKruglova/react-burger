function moveIngredient(draggableIngredient, dropTarget) {
  cy.get(`@${draggableIngredient}`)
    .trigger('dragstart')
  cy.get(`@${dropTarget}`)
    .trigger('drop')
}

describe('testing constructor', function() {
  it('should drag and drop ingredient', function() {
    cy.visit('http://localhost:3000');

    cy.get('.counter__num').should('not.exist');
    cy.get('[class^=ingredient_ingredient__]').first().as('bun')
    cy.get('[class^=burger-constructor_list__]').first().as('dropTarget');
    moveIngredient('bun', 'dropTarget');
    cy.get('[class^=ingredient_ingredient__]').eq(2).as('sauce');
    moveIngredient('sauce', 'dropTarget');
    cy.get('[class^=ingredient_ingredient__]').eq(6).as('filling');
    moveIngredient('filling', 'dropTarget');

    cy.get('@bun').find('.counter__num').should('have.text', '2');
    cy.get('@sauce').find('.counter__num').should('have.text', '1');
    cy.get('@filling').find('.counter__num').should('have.text', '1');
    cy.get('@dropTarget').contains('Краторная булка N-200i (верх)');
    cy.get('@dropTarget').contains('Соус Spicy-X');
    cy.get('@dropTarget').contains('Биокотлета из марсианской Магнолии');
    cy.get('@dropTarget').contains('Краторная булка N-200i (низ)');

    cy.get('.button.button_type_primary.button_size_medium').as('orderButton').trigger('click');
    cy.get('.text.input__textfield.text_type_main-default').as('inputs').first().type('yuno404@mail.ru');
    cy.get('@inputs').last().type('12345678');
    // cy.get('.button.button_type_primary.button_size_medium.mt-6.mb-20').trigger('submit');
    cy.get('[class^=form_form__]').submit().wait(1000);
    cy.intercept('POST', '/api/orders').as('orderRequest');
    cy.get('@orderButton').trigger('click');
    cy.wait('@orderRequest').then((interception) => {
      assert.isNotNull(interception.response.body, 'Order request has a response');
    });
    cy.contains('идентификатор заказа');
  });
});
