// SCRIPTZIN BASICO PARA VALIDAR CPF E PRINCIPALEMTE PAR A NECESSIDADE DO PUT DO USER

export const validateCPF = (cpf: string): boolean => {
  if (!cpf || typeof cpf !== "string") {
    return false; // Retorna falso se o CPF for inválido ou não for uma string
  }

  cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false; // Verifica se o CPF tem 11 dígitos e não é uma sequência repetida
  }

  let sum = 0;
  let remainder;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  // Validação do segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
};
