// No componente Botao, atualize o tipo btnProps
type btnProps = {
  texto: string;
  type?: "button" | "submit" | "reset"; // Adicione esta linha
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

// E no componente Botao, ajuste para usar o type
const Botao = ({ texto, onClick, type = "button" }: btnProps) => {
  return (
    <div className="mt-4">
      <button
        className="btn btn-primary"
        onClick={onClick}
        type={type} // Use a prop type aqui
      >
        {texto}
      </button>
    </div>
  );
};
export default Botao;
