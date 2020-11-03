const PDFDocument = require("pdfkit");
const fetch = require("fetch-base64");

function fetchRemoteImage(url){
  return fetch.remote(url);
}

async function createInvoice(invoice) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  await generateHeader(doc, invoice);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

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
  doc.fillColor("#444444").fontSize(20).text("Cliente", 50, 180);

  generateHr(doc, 210);

  const customerInformationTop = 230;

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

  generateHr(doc, 280);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
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
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.products.length; i++) {
    const item = invoice.products[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      item.unit,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
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

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Importe total",
    "",
    formatCurrency(invoice.total + invoice.taxes)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Este documento es NO una representación impresa de un CFDI..",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  unit,
  lineTotal
) {
  doc
    .fontSize(9)
    .text(item, 50, y)
    .text(description, 130, y)
    .text(unitCost, 250, y, { width: 90, align: "center" })
    .text(quantity, 330, y, { width: 90, align: "center" })
    .text(unit, 400, y, { width: 90, align: "center" })
    .text(lineTotal, 500, y, { align: "center" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}


module.exports = {
  createInvoice,
};
