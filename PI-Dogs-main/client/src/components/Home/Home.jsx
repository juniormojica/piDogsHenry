import s from "./Home.module.css"
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import TempFilter from "../TempFilter/TempFilter";

const Home = () => {
    return (
        <div className={s.homeContainer}>
            <TempFilter />

            <SearchBar />


            <h2 className={s.tittle}>TODOS LOS PERROS</h2>
            <Cards />


        </div>
    )
}

export default Home;