describe('Question and Related Answers', function () {
  it('Visit Home', function () {
    cy.visit('http://localhost:3000')
  })

  it('See a specific question', function () {
    cy
      .get('ul[data-testid="question-options"] form[data-testid="order-and-filter-form"]')
      .find('select[data-testid="sorting-questions"]')
      .select('AZ', { force: true })

    cy
      .get('div[data-testid="question-list"]')
      .find('li[data-testtype="question-item"]')
      .its('length')
      .should('be.gte', 1)

    cy
      .get('div[data-testid="question-list"]')
      .find('li[data-testtype="question-item"]').first()
      .click()
  })

  it('Check question text', function () {
    cy
      .get('li[data-testid="question-header"]')
      .should($questionHeader => {
        expect($questionHeader[0].textContent.length).to.be.greaterThan(3);
      })
  })

  it('Answer a question', function () {
    cy
      .get('ul[data-testid="answer-options"]')
      .find('li[data-testid="answer-question"]')
      .click()

    cy
      .get('form[data-testid="answer-form"]')
      .find('input[data-testid="answer-form-user"]')
      .type('bexs-user@email.com', { force: true })

    cy
      .get('form[data-testid="answer-form"]')
      .find('textarea[data-testid="answer-form-text"]')
      .type('A payment bank.', { force: true })

    cy
      .get('form[data-testid="answer-form"]')
      .find('button[data-testid="answer-form-button"]')
      .click()
  })

  it('Sort and filter answers', function () {
    cy
      .get('ul[data-testid="answer-options"]')
      .find('li[data-testid="answer-sort-and-filter"]')
      .click()

    cy
      .get('ul[data-testid="answer-options"] form[data-testid="order-and-filter-form"]')
      .find('select[data-testid="sort-answers"]')
      .select('AZ', { force: true })
      .select('ZA', { force: true })
      .select('DtAsc', { force: true })
      .select('DtDesc', { force: true })
  })

  it('Check answers', function () {
    cy
      .get('ul[data-testid="answers"]')
      .find('li[data-testtype="answer-item"]')
      .its('length')
      .should('be.gte', 1)

    cy
      .get('ul[data-testid="answers"]')
      .find('li[data-testtype="answer-item"]')
      .should('contain', 'A payment bank.')
  })
})