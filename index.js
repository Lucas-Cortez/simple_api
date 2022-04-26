const customExpress = require("./config/customExpress");
const connection = require("./infrastructure/connection");
const Tables = require("./infrastructure/tables");
const PORT = 8080;

console.clear();

const app = customExpress();

app.get("/", (req, res) => {
  res.send("Pagina principal");
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Banco de dados conectado!");

    Tables.init(connection);

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}...`);
    });
  }
});
