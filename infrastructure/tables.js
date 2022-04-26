class Tables {
  init(connection) {
    this.connection = connection;
    this.createService();
  }

  createService() {
    const sql_query = `
        CREATE TABLE IF NOT EXISTS Atendimentos (
            id INT NOT NULL AUTO_INCREMENT,
            cliente VARCHAR(50) NOT NULL,
            pet VARCHAR(20),
            servico VARCHAR(20) NOT NULL,
            status VARCHAR(20) NOT NULL,
            observacoes TEXT,
            data DATETIME NOT NULL, 
            data_criacao DATETIME NOT NULL,
            PRIMARY KEY (id)
        );
    `;

    this.connection.query(sql_query, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Tabela atendimento criada com sucesso");
      }
    });
  }
}

module.exports = new Tables();
