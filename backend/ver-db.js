// Mostra o conteúdo do banco nexus.db no terminal.
// Como usar:  node ver-db.js
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'nexus.db');

initSqlJs().then(SQL => {
  if (!fs.existsSync(DB_PATH)) {
    console.log('Banco nao encontrado. Rode "node server.js" pelo menos uma vez para cria-lo.');
    return;
  }

  const db = new SQL.Database(fs.readFileSync(DB_PATH));

  // Pega todas as tabelas automaticamente
  const tabelas = db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
  if (!tabelas[0]) {
    console.log('O banco esta vazio (nenhuma tabela).');
    return;
  }

  tabelas[0].values.forEach(([nome]) => {
    console.log('\n===== ' + nome.toUpperCase() + ' =====');
    const r = db.exec('SELECT * FROM ' + nome);
    if (!r[0]) {
      console.log('(vazia)');
      return;
    }
    console.table(
      r[0].values.map(linha => {
        const obj = {};
        r[0].columns.forEach((col, i) => { obj[col] = linha[i]; });
        return obj;
      })
    );
  });
});