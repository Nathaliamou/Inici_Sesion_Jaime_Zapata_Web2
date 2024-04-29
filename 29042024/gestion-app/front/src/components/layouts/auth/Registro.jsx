//import { usuarios } from "../../database/dataBase.jsx"; //esto ya no funciona, ya no es un archivo local sino de un servidor.
//se puede borrar.
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // viene de react roter dom
import Swal from 'Sweetalert2';
import axios from "axios";
import "./Login.css";
let urlUsuarios = "http://localhost:3000/user";
const Registro = () => {
  const [getUsuario, setUsuario] = useState("");
  const [getContrasena, setContrasena] = useState("");
  const [getCorreo, setCorreo] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const redireccion = useNavigate();


  //estamos trayendo peticion tipo get
  async function getUsuarios() {
    let resultado = await axios.get(urlUsuarios);
    console.log(resultado.data);
    setUsuarios(resultado.data);
  }
  useEffect(() => {
    getUsuarios();
  }, []);

  //codigo buscar
  function buscarUsuario() {
    return usuarios.some((usuario) => usuario.user === getUsuario);
  }
  // codigo agregar
  async function agregarUsuario() {
    let usuario = {
      user: getUsuario,
      contrasena: getContrasena,
      correo: getCorreo,
    };
    //await usuarios.push(usuario);
    //axios.post para crear
    await axios.post(urlUsuarios, usuario);
  }
  //codigo registrar
  const registrarUsuario = () => {
    if (buscarUsuario()) {
      //console.log("Usuario ya existe en la base de datos...");
      Swal.fire({
        title: "Error", //si el usuario existe
        text: "Usuario ya existe en la base de datos...",
        icon: "error"
      });
    } else {
      agregarUsuario();
      console.log(usuarios);
      redireccion("/");
    }
  };
  return (
    <form>
      <div className="container fadeInAnimation">
        <h2>Iniciar Sesión</h2>
        <div className="input-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUsuario(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setContrasena(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Correo:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setCorreo(e.target.value);
            }}
          />
        </div>
        <section className="botones">
          <button onClick={registrarUsuario} type="button" className="btn">
            Crear Cuenta
          </button>
        </section>
      </div>
    </form>
  );
};
export default Registro;
