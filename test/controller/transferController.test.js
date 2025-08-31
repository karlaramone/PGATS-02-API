//bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//aplicação
const app = require('../../app');

//Mock
const transferService = require('../../service/transferService');


//testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfers')
                .send({
                    remetente: "karla",
                    destinatario: "heloise",
                    valor: 200
                });

            expect(resposta.status).to.equal(400);  
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado');      
        });

        it('Usando mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            //Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error( 'Usuário não encontrado'));
           
            
            const resposta = await request(app)
                .post('/transfers')
                .send({
                    remetente: "karla",
                    destinatario: "heloise",
                    valor: 200
                });

            expect(resposta.status).to.equal(400);  
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado');  
            
            //Reseto o mock
            sinon.restore();
        });

        it('Usando mocks: Quando informo valores válidos eu tenho sucesso com 201', async () => {
            //Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({ 
                remetente: "karla",
                destinatario: "heloise",
                valor: 200,
                data: new Date().toISOString()
             });
           
            
            const resposta = await request(app)
                .post('/transfers')
                .send({
                    remetente: "karla",
                    destinatario: "heloise",
                    valor: 200
                });

            expect(resposta.status).to.equal(201);  
            expect(resposta.body).to.have.property('remetente', 'karla');  
            expect(resposta.body).to.have.property('destinatario', 'heloise');  
            expect(resposta.body).to.have.property('valor', 200); 
            
            //Reseto o mock
            sinon.restore();
        });
    })
})