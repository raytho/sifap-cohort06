const express = require("express");
const CountryService = require("../../services/countryService");

function countriesApi(app) {
  const router = express.Router();
  app.use("/api/countries", router);

  const countryService = new CountryService();

  router.get("/", async (req, res) => {
    try {
      const response = await countryService.getCountries();
      return res.status(200).send({
        data: response,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  });

  router.post("/", async (req, res, next) => {
    const { body: country } = req;
    try {
      await countryService.createCountry({ country });
      res.status(201).json({
        data: "User created",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = countriesApi;
