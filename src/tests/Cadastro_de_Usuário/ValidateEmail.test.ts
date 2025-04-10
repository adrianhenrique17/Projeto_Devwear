import { EMAIL_REGEX } from "../../models/UserModel";

describe("Validação de e-mail", () => {
  test("deve validar um e-mail válido", () => {
    const emailValido = "usuario@dominio.com";
    expect(EMAIL_REGEX.test(emailValido)).toBe(true);
  });

  test("deve rejeitar e-mail sem domínio de topo", () => {
    const emailInvalido = "usuario@dominio";
    expect(EMAIL_REGEX.test(emailInvalido)).toBe(false);
  });

  test("deve rejeitar e-mail com formato inválido", () => {
    const emailInvalido = "usuario.com";
    expect(EMAIL_REGEX.test(emailInvalido)).toBe(false);
  });
});
