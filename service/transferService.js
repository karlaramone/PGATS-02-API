const { users, transfers } = require('../model/db');

function transfer({ remetente, destinatario, valor }) {
  const userRemetente = users.find(u => u.username === remetente);
  const userDestinatario = users.find(u => u.username === destinatario);
  if (!userRemetente || !userDestinatario) throw new Error('Usuário não encontrado');
  if (userRemetente.saldo < valor) throw new Error('Saldo insuficiente');
  const isFavorecido = userRemetente.favorecidos.includes(destinatario);
  if (!isFavorecido && valor >= 5000) throw new Error('Transferência acima de R$ 5.000,00 só para favorecidos');
  userRemetente.saldo -= valor;
  userDestinatario.saldo += valor;
  const transferObj = { remetente, destinatario, valor, data: new Date() };
  transfers.push(transferObj);
  return transferObj;
}

function getTransfers() {
  return transfers;
}

module.exports = { transfer, getTransfers };
