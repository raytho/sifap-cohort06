const express = require("express");
const StadisticsService = require("../../services/stadisticsService");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const {
  uploadStadistics,
} = require("../../services/storage/profilePicturesUpload");
const csvStringifier = createCsvStringifier({
  header: [
    { id: "taxReceiptId", title: "taxReceiptId" },
    { id: "logo", title: "logo" },
    { id: "createdAt", title: "createdAt" },
    { id: "organizationName", title: "organizationName" },
    { id: "userFirstName", title: "userFirstName" },
    { id: "userLastName", title: "userLastName" },
    { id: "userFiscalId", title: "userFiscalId" },
    { id: "userDigitalSing", title: "userDigitalSing" },
    { id: "userPhoneNumber", title: "userPhoneNumber" },
    { id: "userEmail", title: "userEmail" },
    { id: "userAddress", title: "userAddress" },
    { id: "contactFisrtName", title: "contactFisrtName" },
    { id: "contactLastName", title: "contactLastName" },
    { id: "contactFiscalId", title: "contactFiscalId" },
    { id: "contactEmail", title: "contactEmail" },
    { id: "contactFiscalAct", title: "contactFiscalAct" },
    { id: "productName", title: "productName" },
    { id: "productDescription", title: "productDescription" },
    { id: "productQuantity", title: "productQuantity" },
    { id: "productPrice", title: "productPrice" },
    { id: "taxes", title: "taxes" },
    { id: "currency", title: "currency" },
    { id: "subtotal", title: "subtotal" },
    { id: "total", title: "total" },
    { id: "methodPayment", title: "methodPayment" },
    { id: "productId", title: "productId" },
    { id: "contactId", title: "contactId" },
    { id: "templateId", title: "templateId" },
  ],
});

function stadisticsApi(app) {
  const router = express.Router();
  app.use("/api/stadistics", router);

  const stadisticsService = new StadisticsService();

  router.get("/getAllTaxReceips", async (req, res, next) => {
    try {
      const response = await stadisticsService.getAllTaxReceips();
      if (response) {
        const csvFile = csvStringifier.stringifyRecords(response);
        const responseaws = await uploadStadistics(csvFile, "taxes");

        return res.status(200).send({
          data: responseaws,
          error: null,
        });
      } else {
        return res.status(500).send({
          data: null,
          error: "No data found",
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
      return res.status(500);
    }
  });

  router.get("/getTaxReceips/:id", async (req, res) => {
    try {
      const id = req.params;
      const response = await stadisticsService.getTaxReceipsById(id);
      if (response) {
        const csvFile = csvStringifier.stringifyRecords(response);
        const responseaws = await uploadStadistics(csvFile);

        return res.status(200).send({
          data: responseaws,
          error: null,
        });
      } else {
        return res.status(500).send({
          data: null,
          error: "No data found",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  });

  router.get("/getAllProducts", async (req, res, next) => {
    try {
      const response = await stadisticsService.getAllProducts();
      if (response) {
        const csvFile = csvStringifier.stringifyRecords(response);
        const responseaws = await uploadStadistics(csvFile, "products");

        return res.status(200).send({
          data: responseaws,
          error: null,
        });
      } else {
        return res.status(500).send({
          data: null,
          error: "No data found",
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
      return res.status(500);
    }
  });
}

module.exports = stadisticsApi;
