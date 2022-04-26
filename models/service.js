const connection = require("../infrastructure/connection");
const moment = require("moment");

class Attendance {
  add(attendance, res) {
    const creationDate = moment().format("YYYY-MM-DD HH:mm:ss");
    const date = moment(attendance.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");

    const dateIsValid = moment(date).isSameOrAfter(creationDate);
    const clientIsValid = attendance.cliente.length >= 5;

    const validations = [
      {
        name: "data",
        message: "Data deve ser maior ou igual a data atual",
        valid: dateIsValid,
      },
      {
        name: "cliente",
        message: "Cliente deve ter no minimo 5 letras",
        valid: clientIsValid,
      },
    ];

    const errors = validations.filter((field) => !field.valid);
    const hasError = !!errors.length;

    if (hasError) {
      res.status(400).json(errors);
    } else {
      const attendanceDated = { ...attendance, creationDate, date };
      const sql_query = "INSERT INTO atendimentos SET ?";

      connection.query(sql_query, attendanceDated, (err, result) => {
        if (err) {
          res.status(400).json(err);
          console.log(err);
        } else {
          res.status(201).json(result);
          console.log(result);
        }
      });
    }
  }

  list(res) {
    const sql_query = "SELECT * FROM atendimentos";

    connection.query(sql_query, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }

  searchId(id, res) {
    const sql_query = "SELECT * FROM atendimentos WHERE id = ?";

    connection.query(sql_query, id, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }

  alter(id, values, res) {
    if (values.data) {
      values.data = moment(values.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");
    }

    const sql_query = "UPDATE atendimentos SET ? WHERE id = ?;";

    connection.query(sql_query, [values, id], (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }

  delete(id, res) {
    const sql_query = "DELETE FROM atendimentos WHERE id = ?";

    connection.query(sql_query, id, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }
}

module.exports = new Attendance();
