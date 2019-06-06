describe('Input Form', () => {
  beforeEach(() => {
    cy.seedAndVisit([])
  })

  it('focuses input when application loads', () => {
    cy.focused()
      .should('have.class', 'new-todo')
  })

  it('accepts input', () => {
    const testInput = 'Buy some milk'
    cy.get('.new-todo')
      .type(testInput)
      .should('have.value', testInput)
  })

  context('Form submission',() => {
    beforeEach(() => cy.server())
    
    it('Adds a new Todo on submit', () => {
      const todo = 'Buy some milk'

      cy.route('POST', '/api/todos', {
        name: todo,
        isComplete: false,
        id: 1
      })

      cy.get('.new-todo')
        .type(todo)
        .type('{enter}')
        .should('have.value', '')
      
      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', todo)
    })

    it('Shows an error on a failed submission', () => {
      cy.route({
        url: '/api/todos',
        method: 'POST',
        status: 500,
        response: {}
      })

      cy.get('.new-todo')
        .type('something{enter}')
      
      cy.get('.todo-list li')
        .should('not.exist')

      cy.get('.error')
        .should('be.visible')
    })
  })
})