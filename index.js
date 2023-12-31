const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authorization } = require("./services/authorization");
// const { authorization } = require("./services/authorization");

const TOKEN = "eccd804f-9eea-43c9-8950-6e12073eccf0";

const PORT = process.env.PORT || 3001;

const server = express();

server.use(cors());

server.use(express.json());

server.get("/", (req, res) => {
  return res.json({
    message: "API Mock - App saúde!!!😉",
    auth: {
      url: "https://api-products-dh-next.vercel.app/auth",
      method: "POST",
      body: {
        email: "example@example.com",
        password: "123",
      },
    },
    info: {
      rotas_privadas: {
        msg: "Para as rotas privadas enviar o atributo `Authorization` com o token do usuário junto ao header da requisição",
      },
    },
  });
});

//auth
server.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  const token = jwt.sign(
    {
      expiresIn: "365d",
    },
    TOKEN
  );

  if (!email || !password) {
    return res
      .status(403)
      .json({ message: "Email and password values are required" });
  }

  if (email === "admin@admin.com" && password === "123456") {
    return res.status(200).json({
      name: "Jhon Doe",
      email,
      token,
      phone: "+55 21 99999-9999",
      picture:
        "https://igd-wp-uploads-pluginaws.s3.amazonaws.com/wp-content/uploads/2016/05/30105213/Qual-e%CC%81-o-Perfil-do-Empreendedor.jpg",
    });
  }

  return res.status(400).json({ message: "Invalid email or password" });
});

server.post("/register", async (req, res) => {
  const { email, name, phone, password } = req.body;

  const token = jwt.sign(
    {
      expiresIn: "365d",
    },
    TOKEN
  );

  if (!email || !password) {
    return res
      .status(403)
      .json({ message: "Email, name, phone and password values are required" });
  }

  return res.status(200).json({
    name: name,
    email: email,
    token,
    phone: "+55 21 99999-9999",
    picture:
      "https://igd-wp-uploads-pluginaws.s3.amazonaws.com/wp-content/uploads/2016/05/30105213/Qual-e%CC%81-o-Perfil-do-Empreendedor.jpg",
  });
});

server.get("/activities", authorization, async (req, res) => {
  const activities = [
    {
      id: 1,
      title: "Nova consulta adicionada",
      description: "2 horas atrás",
    },
    {
      id: 2,
      title: "Google Drive",
      description: "Yesterday",
    },
    {
      id: 3,
      title: "Resultado disponível",
      description: "1 Semana atrás",
    },
  ];

  setTimeout(() => {
    return res.json(activities);
  }, 2500);
});

server.get("/my-cards", authorization, async (req, res) => {
  const userCards = [
    {
      type: "visa",
      number: "4*** **** ****4 2708",
      title: "Visa",
    },
    {
      type: "visa",
      number: "4*** **** ****4 2708",
      title: "Visa",
    },
    {
      type: "visa",
      number: "4*** **** ****4 2708",
      title: "Visa",
    },
    {
      type: "mastercard",
      number: "5*** **** ****2 5236",
      title: "MasterCard",
    },
  ];

  setTimeout(() => {
    return res.json(userCards);
  }, 2500);
});

server.get("/favorites", authorization, async (req, res) => {
  const favorites = [
    {
      id: 1,
      title: "Prontuários",
      icon: "",
    },
    {
      id: 2,
      title: "Exames",
      icon: "",
    },
    {
      id: 3,
      title: "Histórico",
      icon: "",
    },
    {
      id: 4,
      title: "Prontuários",
      icon: "",
    },
    {
      id: 5,
      title: "Exames",
      icon: "",
    },
    {
      id: 6,
      title: "Histórico",
      icon: "",
    },
    {
      id: 7,
      title: "Histórico",
      icon: "",
    },
    {
      id: 8,
      title: "Histórico",
      icon: "",
    },
    {
      id: 9,
      title: "Histórico",
      icon: "",
    },
  ];

  setTimeout(() => {
    return res.json(favorites);
  }, 2500);
});

server.listen(PORT, () =>
  console.log("Servidor iniciado em http://localhost:" + PORT)
);
