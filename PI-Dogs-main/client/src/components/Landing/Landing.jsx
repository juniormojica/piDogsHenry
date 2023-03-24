import s from "./Landing.module.css"
import { useNavigate } from "react-router-dom"


const Landing = () => {
    const navigate = useNavigate()


    const login = () => {
        navigate("/home")
    }
    return (<div className={s.landingContainer}>
        <h1>Henry Dogs</h1>
        <h1>AQUI VA LA LANDING / PAGINA PRINCIPAL</h1>
        <button onClick={login}>INGRESAR A HENRY DOGS</button>
    </div>)
}

export default Landing 