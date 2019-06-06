describe('Footer', () => {
  context('with a single todo', () => {
    it('displays a singular form of todo in count', () => {
      cy.seedAndVisit([{ id: 1, name: 'Buy Milk', isComplete: false }])
      cy.get('.todo-count')
        .should('contain', '1 todo left')
    })
  })

  context('with multiple todos', () => {
    it('displays a plural form of todo in count', () => {
      cy.seedAndVisit()
      cy.get('.todo-count')
        .should('contain', '3 todos left')
    })
  })
  })