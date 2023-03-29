
import s from "./Welcome.module.css"
import perroWelcome from "../../../src/assets/perroWelcome.png"

const Welcome = () => {

    return (
        <div className={s.welcomeContainer}>
            <figure className={s.welcomeImgContainer}>
                <img src={perroWelcome} alt="" />
            </figure>

            <div className={s.welcomeGreetingContainter}>
                <p>¡Bienvenido a nuestra aplicación de perros en React! Aquí podrás buscar,
                    filtrar y crear perfiles para tus amigos peludos favoritos. También podrás
                    ver sus características y temperamentos para encontrar el compañero perfecto
                    para ti. ¡Diviértete explorando el mundo de los perros con nuestra aplicación!</p>
            </div>
        </div>
    )
}

export default Welcome