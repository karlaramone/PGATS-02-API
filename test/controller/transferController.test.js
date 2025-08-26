const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../../app');


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
        });
    })
})