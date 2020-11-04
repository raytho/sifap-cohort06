/* eslint-disable no-unused-vars */
const express = require("express");
const passport = require("passport");
const UsersService = require("../../services/usersService");
const {
  upload,
  deleteLastImg,
} = require("../../services/storage/profilePicturesUpload");
const multer = require("multer");

// jwt stategy
require("../../utils/auth/strategies/jwt");
const twoFactorAuth = require("../../utils/auth/strategies/twoFactorAuth");
const validationHandler = require("../../utils/middleware/validationHandler");
const fiscalDataSchema = require("../../utils/schemas/fiscalData");

function userView(app) {
  const router = express.Router();
  app.use("/api/user", router);

  const usersService = new UsersService();

  router.get("/settings/send-qr", async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      try {
        if (error || !user) {
          res.status(500).json({
            message: "No autorizado",
          });
        } else {
          twoFactorAuth.generateQr().then((qrCode) => {
            res.status(200).json({
              message: qrCode,
            });
          });
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.get("/data/user-info", async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      try {
        if (error || !user) {
          res.status(500).json({
            message: "No autorizado",
          });
        } else {
          const userData = await usersService.getUserByMail(user);
          const twoFactorToNumber = user.twoFactorActive == 1 ? true : false;
          res.status(200).json({
            message: {
              Phone: userData.phoneNumber,
              FirstName: userData.firstName,
              LastName: userData.lastName,
              City: userData.city,
              State: userData.state,
              Country: userData.country,
              FiscalId: userData.fiscalId,
              Role: userData.role,
              FiscalAct: userData.fiscalAct,
              twoFactorActive: twoFactorToNumber,
            },
          });
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post("/tax-receipt", async (req, res, next) => {
    validationHandler(fiscalDataSchema),
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      try {
        if (error || !user) {
          res.status(500).json({
            message: "No autorizado",
          });
        } else {
          const { userId } = user;
          const userData = req.body;
          const cf = userData.cf;
          const cfName = userData.cfName;
          const increment = userData.increment;
          const fiscalData = await usersService.upsertFiscalData(
            userData,
            userId
          );
          if (fiscalData) {
            res.status(200).json({
              message: {
                country: user.country,
                ...userData,
                cf,
                cfName,
                increment,
                status: "Usuario configurado",
              },
            });
          } else {
            res.status(500).json({
              message: "Error al realizar la configuración del usuario",
            });
          }
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post("/tax-identifier", async (req, res, next) => {
    validationHandler(fiscalDataSchema),
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      try {
        if (error || !user) {
          res.status(500).json({
            message: "No autorizado",
          });
        } else {
          const { userId } = user;
          const userData = req.body;
          const { firstName, lastName, dateOfBirth, country } = userData;
          const updatedUserData = await usersService.updateUserData(
            userData,
            userId
          );
          const fiscalData = await usersService.upsertFiscalData(
            userData,
            userId
          );
          if (fiscalData && updatedUserData) {
            res.status(200).json({
              message: {
                firstName,
                lastName,
                dateOfBirth,
                country,
                ...userData,
                status: "Usuario configurado",
              },
            });
          } else {
            res.status(500).json({
              message: "Error al realizar la configuración del usuario",
            });
          }
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.put("/data/profile", async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      const userProfileData = req.body;
      try {
        if (error || !user) {
          res.status(500).json({
            message: "No autorizado",
          });
        } else {
          const updateUser = await usersService.updateUserProfile(
            userProfileData,
            user.userId
          );

          if (updateUser) {
            const userData = await usersService.getUserByMail(user);
            const twoFactorToNumber = user.twoFactorActive == 1 ? true : false;
            const formatTime = formatUTCTime(userData.dateOfBirth);

            res.status(200).json({
              data: {
                message: {
                  status: "Saved",
                  phoneNumber: userData.phoneNumber,
                  firstName: userData.firstName,
                  city: userData.city,
                  state: userData.state,
                  country: userProfileData.country,
                  fiscalId: userProfileData.fiscalId,
                  companyName: userProfileData.companyName,
                  dateOfBirth: formatTime,
                  FiscalAct: userData.fiscalAct,
                  twoFactorActive: twoFactorToNumber,
                  profile_picture_url: userData.profile_picture_url,
                },
              },
              error: null,
            });
          } else {
            res.status(500).json({
              message: "No fue posible actualizar",
            });
          }
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post("/data/profile-image", async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      try {
        if (error || !user) {
          res.status(500).json({
            message: "No autorizado",
          });
        } else {
          const singleUpload = upload.single("image");

          singleUpload(req, res, async function (err) {
            if (req.fileValidationError) {
              return res.status(500).json({
                error: req.fileValidationError,
              });
            } else if (!req.file) {
              return res.status(500).json({
                error: "Error al subir el archivo",
                uploaded: false,
              });
            } else if (err instanceof multer.MulterError) {
              return res.status(500).json({
                error: err,
              });
            } else if (err) {
              return res.status(500).json({
                error: err,
              });
            }
            const DEFAULT_IMG_URL =
              "https://sifap-profile-pictures.s3.us-east-2.amazonaws.com/default-user.png";

            const lastImgUrl = user.profile_picture_url;

            if (lastImgUrl !== DEFAULT_IMG_URL) {
              const fileNameToDelete = lastImgUrl.split("/").slice(-1)[0];
              deleteLastImg(fileNameToDelete, function (err) {
                if (err) {
                  return next(err);
                }
              });
            }
            const imgUrl = req.file.location;
            const updatedProfileImgUrl = await usersService.insertUserProfileUrl(
              imgUrl,
              user.userId
            );
            if (updatedProfileImgUrl) {
              res.status(201).json({
                message: "Imagen publicada correctamente",
                profile_picture_url: imgUrl,
                uploaded: true,
              });
            } else {
              res.status(500).json({
                message: "No fue posible actualizar",
                uploaded: true,
              });
            }
          });
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.get("/clients", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      if (error || !user) {
        res.status(500).json({
          message: "Unauthorized",
        });
      } else {
        try {
          await usersService.getUserClients(user.userId, res);
        } catch (error) {
          res.status(500).json({ message: "Internal Error" });
        }
      }
    })(req, res, next);
  });

  router.get("/clients/:id", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      if (error || !user) {
        res.status(500).json({
          message: "Unauthorized",
        });
      } else {
        try {
          const { id } = req.params;
          await usersService.getClient(id, res);
        } catch (error) {
          res.status(500).json({ message: "Internal Error" });
        }
      }
    })(req, res, next);
  });

  router.post("/clients", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      if (error || !user) {
        res.status(500).json({
          message: "Unauthorized",
        });
      } else {
        try {
          const clientData = req.body;
          await usersService.upsertClients(user.userId, clientData, res);
        } catch (error) {
          res.status(500).json({ message: "Internal Error" });
        }
      }
    })(req, res, next);
  });

  router.put("/clients/:id", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      if (error || !user) {
        res.status(500).json({
          message: "Unauthorized",
        });
      } else {
        try {
          const { id } = req.params;
          const clientData = req.body;
          await usersService.updateClient(id, clientData, res);
        } catch (error) {
          res.status(500).json({ message: "Internal Error" });
        }
      }
    })(req, res, next);
  });

  router.delete("/clients/:id", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      if (error || !user) {
        res.status(500).json({
          message: "Unauthorized",
        });
      } else {
        try {
          const { id } = req.params;
          await usersService.deleteClient(id, res);
        } catch (error) {
          res.status(500).json({ message: "Internal Error" });
        }
      }
    })(req, res, next);
  });

  router.post("/invoices", async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      try {
        if (error || !user) {
          res.status(500).json({
            message: "No autorizado",
          });
        } else {
          const invoiceInputData = req.body;
          const userData = user;

          switch (user.country) {
<<<<<<< Updated upstream
          case "MEX":
            usersService.generateInvoceMx(invoiceInputData, userData, res);
            break;
          case "COL":
            usersService.generateInvoceCol(invoiceInputData, userData, res);
            break;
          case "DOM":
            usersService.generateInvoceRd(invoiceInputData, userData, res);
            break;
          default:
            usersService.sendInvalidResponse(res);
=======
            case "MEX":
              response = await usersService.generateInvoceMx(
                invoiceInputData,
                userData,
                res
              );
              break;
            case "COL":
              return usersService.generateInvoceCol(
                invoiceInputData,
                userData,
                res
              );
            case "DOM":
              return usersService.generateInvoceRd(
                invoiceInputData,
                userData,
                res
              );
            default:
              usersService.sendInvalidResponse(res);
>>>>>>> Stashed changes
          }
        }
      } catch (err) {
        console.log(err);
        next(error);
      }
    })(req, res, next);
  });
}

const formatUTCTime = (date) => {
  const day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  const years = date.getUTCFullYear();
  const newDate = `${years}-${month}-${day}`;
  return newDate;
};

module.exports = userView;
