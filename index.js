const express = require("express");
const app = express();
var fs = require("fs");
const ruta_archivo = "text.txt";
require("newrelic");

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

app.get("/test/:linea", function (req, res) {
  var linea = req.params.linea;
  escribir(linea, res);
});

function escribir(linea, res) {
  fs.writeFile(ruta_archivo, `Linea ${linea}\n`, function (error) {
    if (error) {
      return res.status(400).send("Error");
    } else {
      fs.readFile(ruta_archivo, function leer(error, datos) {
        if (error) {
          return res.status(400).send("Error");
        } else {
          return res.status(200).json(`${datos.toString()}`);
        }
      });
    }
  });
}
