const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const config = require("../../../config");

const otpauth_url = config.otpAuthUrl;

const generateQr = () => {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(otpauth_url, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const generateTotpToken = (secret) => {
  return speakeasy.totp({
    secret: secret,
    window: 10 // specified in seconds
  });
};

const verify = (secret, token) => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: "ascii",
    token: token,
  });
};

const verifyMailToken = (secret, token) => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: "ascii",
    token: token,
    window: 10,
  });
};

module.exports = {
  generateQr,
  generateTotpToken,
  verify,
  verifyMailToken,
};
