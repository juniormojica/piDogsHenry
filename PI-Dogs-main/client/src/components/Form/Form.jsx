import s from "./Form.module.css"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTemperaments } from "../../redux/actions"
const Form = () => {
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)


    const [selecTemps, setSelecTemps] = useState([])
    const [tempId, setTempId] = useState([])

    const [form, setForm] = useState(
        {
            nombre: "",
            alturaMin: "",
            alturaMax: "",
            pesoMax: "",
            pesoMin: "",
            vida: "",
            imagen: ""
        })

    const [errors, setErrors] = useState(
        {
            nombre: "",
            alturaMin: "",
            alturaMax: "",
            pesoMax: "",
            pesoMin: "",
            vida: "",
            imagen: ""
        })

    useEffect(() => {
        dispatch(getTemperaments())
    }, [])

    useEffect(() => {
        const idTemp = temperaments
            .filter((temp) => selecTemps.includes(temp.name))
            .map((temp) => temp.id);
        setTempId(idTemp);

    }, [selecTemps]);


    const validation = (form) => {
        const newErrors = {}
        function validarURL(url) {
            var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            return regex.test(url);
        }



        newErrors.nombre = (!form.nombre) ? "Escribe un nombre" : ""
        newErrors.alturaMin = (!form.alturaMin) ? "Escribe un numero" : ""
        newErrors.alturaMax = (!form.alturaMax) ? "Escribe un numero" : ""

        newErrors.alturaMin = (!isNaN(Number(form.alturaMin))) ? "Debe ser un numero" : ""
        newErrors.alturaMax = (!isNaN(Number(form.alturaMax))) ? "Debe ser un numero" : ""




        newErrors.pesoMin = (isNaN(Number(form.peso))) ? "El peso debeser un Numero" : ""
        newErrors.pesoMin = (form.pesoMin < 0) ? "El peso no puede ser negativo" : ""



        newErrors.pesoMax = (isNaN(Number(form.pesoMax))) ? "El peso debeser un Numero" : ""
        newErrors.pesoMax = (form.pesoMax > 170) ? "El peso no puede ser mayor a 170" : ""


        newErrors.alturaMax = (form.alturaMax > 2700) ? "No puede medir mas de 2500cm" : ""
        newErrors.alturaMin = (form.alturaMin < 0) ? "Tu perro No puede medir 0" : ""

        newErrors.vida = (form.vida <= 0) ? "Debe ser un numero mayor a 0" : ""

        newErrors.vida = (form.vida > 29) ? "El perro mas viejo del mundo vivío 29 años" : ""

        newErrors.imagen = (validarURL(form.imagen) ? "" : "URL invalida compita")

        setErrors({ ...errors, ...newErrors })


    }


    const handleChange = (event) => {
        const value = event.target.value;
        const property = event.target.name;
        validation({
            ...form,
            [property]: value
        },)
        setForm({
            ...form,
            [property]: value
        })




    }

    const hadleSelectInput = (event) => {
        const value = event.target.value

        setSelecTemps([...selecTemps, value])


    }

    const handleDelete = (event) => {
        const clickForDelete = (event.target.textContent);

        const remainTemps = selecTemps.filter((temp) => temp !== clickForDelete)
        setSelecTemps(remainTemps)
    }

    console.log(tempId);

    return (
        <div className={s.formContainer}>

            <form action="" className={s.mainContainer}>
                <div>
                    <h2>Aquí podras crear tu mascota</h2>
                </div>
                <div className={s.fieldContainer}>
                    <label htmlFor="" className={s.label} >Nombre:</label>
                    <input

                        onChange={handleChange}
                        value={form.nombre}
                        name="nombre"
                        className={`${s.input} input-field`}
                        type="text" />

                </div>
                {errors.nombre && <span>{errors.nombre}</span>}
                <div className={s.fieldContainer}>
                    <label htmlFor="" className={s.label} >Años de Vida:</label>
                    <input
                        onChange={handleChange}
                        value={form.vida}
                        name="vida"
                        className={`${s.input} input-field`}
                        type="number" />

                </div>

                {errors.vida && <span>{errors.vida}</span>}

                <div className={s.fieldContainer}>
                    <label htmlFor="" className={s.label} >URL de Imagen</label>
                    <input
                        onChange={handleChange}
                        value={form.image}
                        name="imagen"
                        className={`${s.input} input-field`}
                        type="text" />

                </div>
                {errors.imagen && <span>{errors.imagen}</span>}

                <div className={s.fieldContainer}>

                    <div className={`${s.alturaContainer} ${s.left} ${s.marginTop}`}>
                        <label htmlFor="" className={s.label} >Altura Minima:</label>
                        <input
                            placeholder="Altura Minima"
                            onChange={handleChange}
                            value={form.alturaMin}
                            name="alturaMin"
                            className={`${s.input} input-field`}
                            type="number" />
                        {errors.alturaMin && <span>{errors.alturaMin}</span>}
                    </div>


                    <div className={`${s.alturaContainer} ${s.right} ${s.marginTop}`}>
                        <label htmlFor="" className={s.label} >Altura Maxima:</label>
                        <input
                            placeholder="Altura Maxima"
                            onChange={handleChange}
                            value={form.alturaMax}
                            name="alturaMax"
                            className={`${s.input} input-field`}
                            type="number" />
                        {errors.alturaMax && <span>{errors.alturaMax}</span>}
                    </div>






                </div>

                <div className={s.fieldContainer}>

                    <div className={`${s.pesoContainer} ${s.left} ${s.marginTop}`}>
                        <label htmlFor="" className={s.label} >Peso Minimo:</label>
                        <input
                            placeholder="Peso Minimo"
                            onChange={handleChange}
                            value={form.pesoMin}
                            name="pesoMin"
                            className={`${s.input} input-field`}
                            type="number" />
                        {errors.pesoMin && <span>{errors.pesoMin}</span>}

                    </div>

                    <div className={`${s.pesoContainer} ${s.right} ${s.marginTop}`}>
                        <label htmlFor="" className={s.label} >Peso Maximo:</label>
                        <input
                            placeholder="Peso Maximo"
                            onChange={handleChange}
                            value={form.pesoMax}
                            name="pesoMax"
                            className={`${s.input} input-field`}
                            type="number" />
                        {errors.pesoMax && <span>{errors.pesoMax}</span>}
                    </div>

                </div>
                <div>
                    <h3>Selecciona Uno O Varios temperamentos</h3>
                    {temperaments && (
                        <select name="temperaments" onChange={hadleSelectInput} >
                            {temperaments.map((temp) => {
                                return <option key={temp.id} value={temp.name}>{temp.name}</option>
                            })}
                        </select>
                    )}
                </div>

                <div>
                    <h2>Temperamentos Seleccionados</h2>
                    <div className={s.temps}>
                        {selecTemps && selecTemps.map((temp) => {
                            return (

                                <li onClick={handleDelete} key={temp}>{temp}</li>
                            )
                        })}
                    </div>
                </div>

                <button type="submit" className={s.button}>CREAR</button>
            </form>
        </div>
    )
}












export default Form