// src/utils.js

const verifyCaptcha = async (captchaToken, expectedAction) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    const { success, score, action } = data;

    if (success && score >= 0.5 && action === expectedAction) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Erreur lors de la validation reCAPTCHA :", error);
    return false;
  }
};

module.exports = {
  verifyCaptcha,
};
