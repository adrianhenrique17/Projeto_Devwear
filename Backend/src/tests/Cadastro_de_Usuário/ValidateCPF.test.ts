import { validateCPF } from "../../utils/validateCPF";

describe("Validação de CPF", () => {
  test("deve retornar true para CPF válido", () => {
    const cpfValido = "529.982.247-25"; // CPF real válido
    expect(validateCPF(cpfValido)).toBe(true);
  });

  test("deve retornar false para CPF com todos os dígitos iguais", () => {
    const cpfInvalido = "111.111.111-11";
    expect(validateCPF(cpfInvalido)).toBe(false);
  });

  test("deve retornar false para CPF com formato incorreto", () => {
    const cpfInvalido = "123456789";
    expect(validateCPF(cpfInvalido)).toBe(false);
  });
});
