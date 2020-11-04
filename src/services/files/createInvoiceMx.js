const PDFDocument = require("pdfkit");
const fetch = require("fetch-base64");

async function createInvoice(invoice) {
  let doc = new PDFDocument({ size: "A4", margin: 40});
  await generateHeader(doc, invoice);
  generateCustomerInformation(doc, invoice);

  generateInvoiceTable(doc, invoice);
 
 
  generateFooter(doc, invoice);

  doc.end();
  return doc;
}

async function generateHeader(doc, invoice) {
  const img = await fetchRemoteImage(invoice.logoUrl);
  doc
    .image(img[1], 60, 50, { width: 50 })
    .fillColor("#444444")
    .fontSize(15)
    .text(invoice.emitter.name.toUpperCase(), 0, 50, { align: "center" })
    .fontSize(10)
    .text(invoice.emitter.fiscalId, 0, 65, { align: "center" })
    .fontSize(9)
    .text(invoice.emitter.address, 0, 70, { align: "center" })
    .fontSize(14)
    .text(`Factura ${invoice.folio}`, 200, 50, { align: "right" })
    .fontSize(9)
    .text("Folio Fiscal (UUID)", 200, 65, { align: "right" })
    .text(invoice.fiscalFolio, 200, 75, { align: "right" })
    .text("Número de serie del certificado del SAT", 200, 85, { align: "right" })
    .text(invoice.satCertNumber, 200, 95, { align: "right" })
    .text("Número de serie del certificado del Emisor", 200, 105, { align: "right" })
    .text(invoice.serialNumberCertEmiter, 200, 115, { align: "right" })
    .text("Fecha de certificación", 200, 125, { align: "right" })
    .text(invoice.dateOfCertification, 200, 135, { align: "right" })
    .text("RFC del proveedor de certificación", 200, 145, { align: "right" })
    .text(invoice.certProvider, 200, 155, { align: "right" })
    .text("Fecha y hora de emisión del CFDI", 200, 165, { align: "right" })
    .text(invoice.createdAt, 200, 175, { align: "right" })
    .text("Lugar de expedición", 200, 185, { align: "right" })
    .text(invoice.expeditionPlace, 200, 195, { align: "right" })
    
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(12).text("Cliente", 50, 195);

  generateHr(doc, 210);

  const customerInformationTop = 215;

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("Nombre:", 50, customerInformationTop)
    .font("Helvetica")
    .text(invoice.client.name, 130, customerInformationTop)
    .font("Helvetica-Bold")
    .text("RFC:", 50, customerInformationTop + 15)
    .font("Helvetica")
    .text(invoice.client.fiscalId, 130, customerInformationTop + 15)
    .font("Helvetica-Bold")
    .text("Dirección:", 50, customerInformationTop + 30)
    .font("Helvetica")
    .text(invoice.client.address, 130, customerInformationTop + 30)
    
    .moveDown();

  generateHr(doc, 260);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  let invoiceTableTop = axisY(300, doc);

  doc.font("Helvetica-Bold")
    .fontSize(9);
  
  generateTableRow(
    doc,
    invoiceTableTop,
    "ID",
    "Descripción",
    "Precio Unitario",
    "Cantidad",
    "Unidad",
    "Importe"
  );
  generateHr(doc, axisY(10, doc));
  doc.font("Helvetica");

  for (i = 0; i < invoice.products.length; i++) {
    const item = invoice.products[i];
    const position = invoiceTableTop + (i + 1) * 20;
    if (position >= 690) {
      doc.addPage();
      invoiceTableTop = 0;
    }

    generateTableRow(
      doc,
      position,
      item.id,
      item.product,
      formatCurrency(item.price),
      item.quantity,
      item.unit,
      formatCurrency(item.price * item.quantity)
    );

    generateHr(doc, position + 10);
  }

  let subtotalPosition = invoiceTableTop + (i + 1) * 20;
  
  if (subtotalPosition > 800 ){
    doc.addPage();
    subtotalPosition = 30;
  }
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Impuesto 16%",
    "",
    formatCurrency(invoice.taxes)
  );

  const duePosition = paidToDatePosition + 20;
  axisY(duePosition - axisY(0, doc), doc);
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Importe total",
    "",
    formatCurrency(invoice.total)
  );
  doc.font("Helvetica");

}

function generateFooter(doc, invoice) {
  console.log(axisY(0, doc));
  if (axisY(0, doc) < 585) {
    axisY(10, doc);
  } else if(axisY(0, doc) > 700){
    axisY(100, doc);
  }
  else {
    axisY(30, doc);
  }

  doc
    .fontSize(8)
    .font("Helvetica-Bold")
    .text("Importe con letra:", 50, axisY(20, doc))
    .font("Helvetica")
    .text(invoice.totalWithLetter, 150, axisY(0, doc))
    .font("Helvetica-Bold")
    .text("Tipo de comprobante:", 50, axisY(10, doc))
    .font("Helvetica")
    .text("I - Ingreso", 150, axisY(0, doc))
    .font("Helvetica-Bold")
    .text("Método de pago:", 50, axisY(10, doc))
    .font("Helvetica")
    .text(invoice.paymentMethod, 150, axisY(0, doc))
    .font("Helvetica-Bold")
    .text("Forma de pago:", 50, axisY(10, doc))
    .font("Helvetica")
    .text(invoice.wayToPay, 150, axisY(0, doc))
    .font("Helvetica-Bold")
    .text("SELLO DIGITAL DEL CFDI:", 150, axisY(10, doc))
    .font("Helvetica")
    .fontSize(6)
    .text(invoice.digitalSingCfdi, 150, axisY(10, doc))
    .fontSize(8)
    .font("Helvetica-Bold")
    .text("SELLO DIGITAL DEL SAT:", 150, axisY(30, doc))
    .font("Helvetica")
    .fontSize(6)
    .text(invoice.satDigitalSign, 150, axisY(10, doc))
    .fontSize(8)
    .font("Helvetica-Bold")
    .text("CADENA ORIGINAL DEL COMPLEMENTO DE CERTIFICACIÓN DIGITAL DEL SAT:", 150, axisY(30, doc))
    .font("Helvetica")
    .fontSize(6)
    .text(invoice.originalChain, 150, axisY(10, doc))
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(
      "Este documento es NO una representación impresa de un CFDI..",
      150, axisY(50, doc)
    );
}

function generateTableRow(
  doc,
  y,
  id,
  product,
  unitCost,
  quantity,
  unit,
  lineTotal
) {
  doc
    .fontSize(9)
    .text(id, 50, y)
    .text(product, 130, y,)
    .text(unitCost, 250, y, { width: 90, align: "center"})
    .text(quantity, 330, y, { width: 90, align: "center"})
    .text(unit, 400, y, { width: 90, align: "center" })
    .text(lineTotal, 500, y, { align: "center" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(amount) {
  return "$" + (amount).toFixed(2);
}

function addYAxe() {
  let i = 0;
  const add = (amount, doc) => {
    if (i >= 750) {
      doc.addPage();
      i = 0;
      return i += amount;
    } else {
      return i += amount;
    }
  };
  return add;
}

const axisY = addYAxe();

function fetchRemoteImage(url){
  return fetch.remote(url);
}

module.exports = {
  createInvoice,
};
