/// <reference types = "cypress"/>
var faker = require ('faker');

describe('Teste funcionalidade de produtos', () => {
    
    let token

    beforeEach(() => {
        cy.token('fulano@qa.com','teste').then(tkn => {token = tkn})
    });
    
    

    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',
        }).then((response) => {
            expect(response.body.produtos[0].descricao).to.equal('Mouse')
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(20)
        })
    });

    it('Adicionar Produtos', () => {
        let produto = faker.commerce.product()
        cy.cadastrarProduto(token, produto, 2500, "Notebook Ascer", 120)
       .then((response) => {
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            expect(response.status).to.equal(201)
        })
    });

    it('Deve retornar mensagem de produto já cadastrado', () => {
       cy.cadastrarProduto(token, "Ascer", 3700,"Notebook Ascer", 150)
        .then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Já existe produto com esse nome')
        })
    
    });
})