// __tests__/emailRegex.test.ts
import { EMAIL_REGEX } from "../../models/UserModel";

describe("Validação de e-mail com regex", () => {
  it("deve validar e-mails corretos", () => {
    const emailsValidos = [
      "usuario@email.com",
      "user.name@dominio.co",
      "user123@empresa.net",
    ];

    emailsValidos.forEach((email) => {
      expect(EMAIL_REGEX.test(email)).toBe(true);
    });
  });

  it("deve rejeitar e-mails inválidos", () => {
    const emailsInvalidos = [
      "usuario@.com",
      "usuario@com",
      "usuario.com",
      "@email.com",
    ];

    emailsInvalidos.forEach((email) => {
      expect(EMAIL_REGEX.test(email)).toBe(false);
    });
  });
});
