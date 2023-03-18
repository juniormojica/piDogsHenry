import s from "./Home.module.css"
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
const Home = () => {
    return (
        <div>
            <SearchBar />
            <Cards />

            <h3>Card de cada perro</h3>
        </div>
    )
}

export default Home;