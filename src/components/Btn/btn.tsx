// slr, faz automático
type btnProps = {
  texto: string;
};

const Botao = ({ texto }: btnProps) => {
  return (
    <div className="mt-4">
      <button className="btn btn-primary">{texto}</button>
    </div>
  );
};

export default Botao;
