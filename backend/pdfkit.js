const PDFDocument = require("pdfkit");
const blobStream = require("blob-stream");

const doc = new PDFDocument();
var stream = doc.pipe(blobStream());

doc.fontSize(40).text('Lettre de motivation',145,20);

// draw some text
doc.fontSize(16).text("Nom Prénom", 50, 80);
doc.fontSize(16).text("Adresse", 50, 110);
doc.fontSize(16).text("Numéro", 50, 140);
doc.fontSize(16).text("E-mail", 50, 170);

// some vector graphics
doc.save();

// and some justified text wrapped into columns
doc.text("Objet : ", 50, 250).font("Times-Roman", 15).moveDown().text(lorem, {
  width: 412,
  align: "justify",
  indent: 30,
  height: 400,
  ellipsis: true,
});

// end and display the document in the iframe to the right
doc.end();
stream.on("finish", function () {
  iframe.src = stream.toBlobURL("application/pdf");
});