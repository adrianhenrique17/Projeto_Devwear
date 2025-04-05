import Dropdown from "react-bootstrap/Dropdown";

//react-bootstrap

function ButtonDrop() {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">Perfil</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/EditarPerfil">Editar</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ButtonDrop;
