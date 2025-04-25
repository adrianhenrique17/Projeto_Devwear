
type btnProps = {
  texto: string;
  type?: "button" | "submit" | "reset"; 
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

// botao especifico com type


const Botao = ({ texto, onClick, type = "button" }: btnProps) => {
  return (
    <div className="mt-4">
      <button
        className="btn btn-primary"
        onClick={onClick}
        type={type} 
      >
        {texto}
      </button>
    </div>
  );
};
export default Botao;
