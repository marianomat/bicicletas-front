import { React, useState } from "react";
import "./register.css";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    await register({ name, email, password, password_confirmation: passwordConfirmation })
 
    setPassword('')
    setPasswordConfirmation('')
  }

  async function register(data) {
    return axios.post('auth/register', data)
      .then(() => {
        navigate('/home')
      })
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
  }

  return (
    <div>
      <Navbar />
      <div className="main-register">
        <h1 className="h1-register">REGISTRO DE USUARIO</h1>
        <form
          className="form-size"
          onSubmit={console.log("Contraseña actualizada correctamente")}
        >
          <div className="div-form">
            <label className="label-form">Email</label>
            <input
              className="input-form"
              type="email"
              placeholder="Ingrese su email"
              value={ email }
              onChange={ event => setEmail(event.target.value) }
            />
          </div>
          <div className="div-form">
            <label className="label-form">Nombre</label>
            <input
              className="input-form"
              type="text"
              placeholder="Ingrese su nombre"
              value={ name }
              onChange={ event => setName(event.target.value) }
            />
          </div>
          <div className="div-form">
            <label className="label-form">Contraseña</label>
            <input
              className="input-form"
              type="password"
              placeholder="Ingrese contraseña"
              value={ password }
              onChange={ event => setPassword(event.target.value) }
            />
          </div>
          <div className="div-form">
            <label className="label-form">Confirmar contraseña</label>
            <input
              className="input-form"
              type="password"
              placeholder="Confirmar contraseña"
              value={ passwordConfirmation }
              onChange={ event => setPasswordConfirmation(event.target.value) }
            />
          </div>
          <button className="button-form" type="submit">
            CREAR USUARIO
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
