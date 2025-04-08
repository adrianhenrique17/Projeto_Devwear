// SCRIPTZIN BASICO PARA VALIDAR CPF E PRINCIPALEMTE PAR A NECESSIDADE DO PUT DO USER

export const validateCPF = (cpf: string): boolean => {
  if (!cpf || typeof cpf !== "string") {
    return false; 
  }

  cpf = cpf.replace(/[^\d]+/g, ""); 

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false; 
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  
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
