// conexão com o banco de dados
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "calendar",
  },
});

module.exports = knex;