describe('testing constructor', function() {
  it('should drag and drop ingredient', function() {
    cy.visit('http://localhost:3000');
    cy.get('[class^=ingredient_ingredient__]').first().trigger('mousedown');
    cy.get('[class^=burger-constructor_list__]').first().trigger('mouseup');
  });
});
