import { SENHA_REGEX } from "../../models/UserModel";

describe("Validação de senha forte", () => {
  test("deve validar senha com maiúsculas, minúsculas, número e caractere especial", () => {
    const senhaForte = "Senha123@";
    expect(SENHA_REGEX.test(senhaForte)).toBe(true);
  });

  test("deve rejeitar senha sem caractere especial", () => {
    const senha = "Senha123";
    expect(SENHA_REGEX.test(senha)).toBe(false);
  });

  test("deve rejeitar senha com menos de 8 caracteres", () => {
    const senha = "S1@a";
    expect(SENHA_REGEX.test(senha)).toBe(false);
  });
});
