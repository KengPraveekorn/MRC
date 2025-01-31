const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const mysql = require("mysql");
const ConnectDB = require("./Config/db");
// const { readdirSyn } = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "40mb" }));

app.get("/user_tb", (req, res) => {
  ConnectDB.query("SELECT * FROM user_tb ORDER BY iduser_tb DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/create", (req, res) => {
  const code_user = req.body.code_user;
  const name_user = req.body.name_user;
  // const times = req.body.times;
  const Text = req.body.Text;
  const report = req.body.report;
  ConnectDB.query(
    "INSERT INTO user_tb (code_user, name_user,  Text, report) VALUES (?,?,?,?)",
    [code_user, name_user, Text, report],
    (err, results) => {
      if (err) {
        res.json({ status: "error", message: err });

        return;
      }

      res.json({ status: "Ok" });
    }
  );
});





app.put("/update", (req, res) => {
  const iduser_tb = req.body.iduser_tb;
  const code_user = req.body.code_user;
  const name_user = req.body.name_user;
  const report = req.body.report;
  const Text = req.body.Text;
  const times = req.body.times;
  ConnectDB.query("UPDATE mt900db.user_tb SET `code_user` = ? ,`name_user` = ? ,`report` = ? , `Text` = ? WHERE `iduser_tb` = ?",
    [code_user, name_user, report, Text, iduser_tb],
    (err, result) => {

      if(err){
        res.json({status: "error", message:err})

        return;
      }
      res.json(result);
    }
  );
});




// app.put("/update", (req, res) => {
//   const iduser_tb = req.body.idduser_tb;
//   const code_user = req.body.code_user;
//   const name_user = req.body.name_user;
//   const report = req.body.report;
//   const Text = req.body.Text
//   ConnectDB.query("UPDATE user_tb SET code_user = ? name_user = ? report = ? Text = ? WHERE iduser_tb = ? ", [code_user, name_user, report, Text, iduser_tb], (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   })
// });

app.delete('/delete/:iduser_tb', (req, res) => {
  const iduser_tb = req.params.iduser_tb;
  ConnectDB.query("DELETE FROM user_tb WHERE iduser_tb = ?", iduser_tb, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//routes
// readdirSyn("./Routes").map((r) => {
//   app.use("/api", require("./Routes" + r));
// });

const port = 5000;
app.listen(port, () => {
  console.log("Server is runing " + port);
});
