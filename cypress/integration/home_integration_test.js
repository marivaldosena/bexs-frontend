describe('Home', function () {
  it('Visit Home', function () {
    cy.visit('http://localhost:3000')
  })

  it('Sidebar is hidden', function () {
    cy
      .get('#slide-out')
      .should('not.be.visible')
  })

  it('Click menu to show sidebar', function () {
    cy
      .get('#slide-out')
      .should('not.be.visible')

    cy
      .get('li a[data-testid="open-sidebar"]')
      .click()

    cy
      .get('#slide-out')
      .should('be.visible')
  })

  it('Sidebar menu options', function () {
    cy
      .get('ul[data-testid="slide-out"]')
      .find('li')
      .should('have.length', 5)
      .should('contain', 'Home')
      .should('contain', 'My LinkedIn')
      .should('contain', 'My Github')
      .should('contain', 'About Bexs')
      .should('contain', 'Test Info')

    cy
      .get('.sidenav-overlay')
      .click()
  })

  it('Create a question', function () {
    cy
      .get('ul[data-testid="question-options"] li[data-testid="create-question"]')
      .click()

    cy
      .get('form[data-testid="question-form"] input[data-testid="question-form-user"]')
      .type('bexs-user@email.com', { force: true })

    cy
      .get('form[data-testid="question-form"] textarea[data-testid="question-form-text"]')
      .type('What is Bexs?', { force: true })

    cy
      .get('form[data-testid="question-form"] button[data-testid="create-question-button"]')
      .click()

    cy
      .get('div[data-testid="question-list"]')
      .find('li[data-testtype="question-item"]')
      .should('contain', 'What is Bexs?')
  })

  it('Search a question', function () {
    cy
      .get('ul[data-testid="question-options"] li[data-testid="question-search"]')
      .click()

    cy
      .get('form[data-testid="question-search-form"] input[data-testid="question-search"]')
      .type('What is Bexs?', { force: true })
      .type('.', { force: true })

    cy
      .get('form[data-testid="question-search-form"] input[data-testid="question-search"]')
      .clear()
  })

  it('Ordering and filtering questions', function () {
    cy
      .get('ul[data-testid="question-options"] li[data-testid="question-sort-and-filter"]')
      .click()

    cy
      .get('ul[data-testid="question-options"] form[data-testid="order-and-filter-form"]')
      .find('select[data-testid="sorting-questions"]')
      .select('AZ', { force: true })
      .select('ZA', { force: true })
      .select('DtAsc', { force: true })
      .select('DtDesc', { force: true })
      .select('answerAsc', { force: true })
      .select('answerDesc', { force: true })

    cy
      .get('ul[data-testid="question-options"] form[data-testid="order-and-filter-form"]')
      .find('input[data-testid="showUnansweredQuestions"]')
      .check({ force: true })
      .uncheck({ force: true })

    cy
      .get('ul[data-testid="question-options"] form[data-testid="order-and-filter-form"]')
      .find('select[data-testid="sorting-questions"]')
      .select('AZ', { force: true })
  })
})