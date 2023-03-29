import s from "./Home.module.css"
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import TempFilter from "../TempFilter/TempFilter";
import Welcome from "../Welcome/Welcome";
const Home = () => {
    return (
        <div className={s.homeContainer}>
            <Welcome />
            <TempFilter />

            <SearchBar />

            <div className={s.tittleContainer}>
                <h2 className={s.tittle}>TODOS LOS PERROS</h2>
            </div>

            <Cards />


        </div>
    )
}

export default Home;