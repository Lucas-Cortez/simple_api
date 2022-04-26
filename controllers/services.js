const Attendance = require("../models/service");

module.exports = (app) => {
  app.get("/atendimento", (req, res) => {
    Attendance.list(res);
  });

  app.get("/atendimento/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Attendance.searchId(id, res);
  });

  app.post("/atendimento", (req, res) => {
    const service = req.body;

    Attendance.add(service, res);
  });

  app.patch("/atendimento/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;

    Attendance.alter(id, values, res);
  });

  app.delete("/atendimento/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Attendance.delete(id, res);
  });
};
