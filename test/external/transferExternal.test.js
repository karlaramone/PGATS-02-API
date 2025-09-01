//bibliotecas
const request = require('supertest');
const { expect } = require('chai');

//testes
describe('Transfer', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfers')
                .send({
                    remetente: "karla",
                    destinatario: "heloise",
                    valor: 200
                });

            expect(resposta.status).to.equal(400);  
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado');      
        });
        
    });

}); 