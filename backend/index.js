const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const PDFDocument = require("pdfkit");
const blobStream = require("blob-stream");
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("historic-pdf.db");
db.run(
  "CREATE TABLE  IF NOT EXISTS paf  ( id INTEGER PRIMARY KEY AUTOINCREMENT,lastname VARCHAR(255),firstname VARCHAR(255))"
);
const addQuery = (lastname,firstname) => {
  const query = "INSERT INTO paf (lastname, firstname) VALUES (?, ?)";
  db.run(query, [lastname, firstname]);
};
app.use(cors());

app.use(express.json());

app.post("/content-pdf", async (req, res) => {
  try {
    const { lastname, firstname, address, mail, number, content, object } =
      req.body;

    const doc = new PDFDocument();
    var stream = doc.pipe(blobStream());

    doc.fontSize(40).text("Lettre de motivation", 145, 20);

    // draw some text
    doc.fontSize(16).text(`${lastname}  ${firstname}`, 50, 80);
    doc.fontSize(16).text(`${address}`, 50, 110);
    doc.fontSize(16).text(`${mail}`, 50, 140);
    doc.fontSize(16).text(`${number}`, 50, 170);

    // some vector graphics
    doc.save();

    // and some justified text wrapped into columns
    doc
      .text(`Objet : ${object} `, 50, 250)
      .font("Times-Roman", 17)
      .moveDown()
      .text(`${content}`, {
        width: 412,
        align: "justify",
        indent: 30,
        height: 400,
        ellipsis: true,
      });

    await doc.pipe(
      fs.createWriteStream(path.join(__dirname, "lettermotivation.pdf"))
    );
    // end and display the document in the iframe to the right
    doc.end();
    
    await addQuery(lastname, firstname);
    console.log("success")

    const filestream = fs.createReadStream(
      path.join(__dirname, "lettermotivation.pdf")
    );
    filestream.on("open", () => {
      res.setHeader("content-Type", "application/pdf");
      filestream.pipe(res);
    });
  } catch (error) {
    console.log(error);
  }
});


app.listen(port, () => {
  console.log(`J'écoute au port ${port}`);
});
