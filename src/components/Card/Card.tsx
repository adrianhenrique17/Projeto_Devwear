type CardProps = {
  texto: string;
};

// slr, faz automático
const Card = ({ texto }: CardProps) => {
  return <div>{texto}</div>;
};

export default Card;
