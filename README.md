# Projeto_Devwear
Repositório para envio do projeto do 3° periodo, projeto que envolve as aulas de back-end, front-end e programação intermediária.

# Instalação do Projeto
Os requisitos para execução do projeto, são: Ter o Dbeaver (Ou DB de preferencia), Xammp para inicializar o MySql, Postman ( fazer teste das rotas do back). Inicializar os dois projetos
backend e front end em Ide's sepadas. Instalação dos pacotes - NPM INSTALL em ambos e NPM RUN DEV para iniciar o projeto. no Backend provavelmente ao iniciar ele gere um erro no node modules, mas vc só precisa alterar um valor para STRING e ele
iniciará.
O projeto foi realizado com sequelize então as tabelas vão ser criadas automáticamente no banco - o banco deve conter o nome Shop_db.



# Estrutura do backend
src/
│
├── config/        # Configurações do projeto
├── controllers/   # Controladores da aplicação
├── middlewares/   # Middlewares personalizados
├── models/        # Modelos das tabelas do banco
├── routes/        # Definição de rotas
├── utils/         # Funções utilitárias
└── index.ts       # Arquivo principal da aplicação

# Estrutura do FrontEnd

src/
│
├── api/           # Conexão com API
├── assets/        # Imagens e recursos visuais
├── componentes/   # Componentes reutilizáveis
├── context/       # Contextos globais (ex: autenticação)
├── pages/         # Páginas do projeto
├── styles/        # Estilos globais
├── App.tsx        # Componente principal da aplicação
├── App.css        # Estilo principal
├── main/          # Entrada da aplicação
└── product/       # Pasta específica do produto ou feature


O projeto ao todo usa várias dependecias, tendo sua linguagem principal O Typescript.

# Dependencias

Backend - 
"dependencies": {
@types/bcrypt": "^5.0.2",
bcrypt": "^5.1.1",
cors": "^2.8.5",
dotenv": "^16.4.7",
express": "^4.21.2",
express-validator": "^7.2.1",
jsonwebtoken": "^9.0.2",
ms": "^2.1.3",
mysql2": "^3.13.0",
sequelize": "^6.37.6"




FrontEnd
@types/react": "^18.3.20",
@types/react-dom": "^18.3.5",
@types/react-input-mask": "^3.0.6",
@vitejs/plugin-react": "^4.3.4",
eslint": "^9.21.0",
eslint-plugin-react-hooks": "^5.1.0",
eslint-plugin-react-refresh": "^0.4.19",
typescript": "~5.7.2",
typescript-eslint": "^8.24.1",
vite": "^6.2.0"


#FIGMA do layout inicial do projeto
Teve várias alterações mas o esqueleto segue o do figma

https://www.figma.com/design/90FtIBJ0zk4cplbx5G8jPf/Untitled?node-id=0-1&t=JtIzSC1c8G1UERhv-1


#SEGUE ABAIXO O EXEMPLO DO VISUAL DO SITE

