import s from "./Form.module.css"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTemperaments } from "../../redux/actions"
import axios from "axios"
const Form = () => {
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)


    const [selecTemps, setSelecTemps] = useState([])
    const [localTemps, setLocalTemps] = useState([])
    const [tempId, setTempId] = useState([])

    const [form, setForm] = useState(
        {
            nombre: "",
            alturaMin: "",
            alturaMax: "",
            pesoMax: "",
            pesoMin: "",
            vida: "",
            imagen: "",



        })

    const [errors, setErrors] = useState(
        {
            // nombre: "",
            // alturaMin: "",
            // alturaMax: "",
            // pesoMax: "",
            // pesoMin: "",
            // vida: "",
            // imagen: "",

        })

    useEffect(() => {
        dispatch(getTemperaments())
    }, [])

    useEffect(() => {
        setLocalTemps(temperaments)
    }, [temperaments])

    useEffect(() => {
        const idTemp = temperaments
            .filter((temp) => selecTemps.includes(temp.name))
            .map((temp) => temp.id);
        setTempId(idTemp);

    }, [selecTemps]);


    const validation = (form) => {
        let errors = {};

        // NAME
        if (!form.nombre) {
            errors.nombre = "Escribe Un nombre";
        }

        if (!form.vida) {
            errors.vida = "Escribe la esperanza de vida "
        } else if (form.vida <= 0) {
            errors.vida = "No puede ser menor a 0"
        } else if (form.vida >= 28) {
            errors.vida = "Los perros no pueden vivir tantos años"
        }

        // WEIGHTS
        if (!form.pesoMin) {
            // weight min
            errors.pesoMin = "Escribe un peso minimo valido";
        } else if (form.pesoMin <= 0) {
            errors.pesoMin = "No se reciben valores negativos";
        }


        // if (form.pesoMin > form.pesoMax) {
        //     errors.pesoMin = "El peso Minimo No puede ser mayor al maximo"
        // }


        if (form.pesoMax < form.pesoMax) {
            errors.pesoMin = "El peso Maximo No puede ser menor al Minimo"
        }


        if (!form.pesoMax) {
            // weight max
            errors.pesoMax = "Escribe un peso maximo valido";
        } else if (form.pesoMax >= 170) {
            errors.pesoMax = "El valor tiene que ser menor a 2700";
        } else if (form.pesoMax <= 0) {
            errors.pesoMax = "No se reciben valores negativos";
        }
        // HEIGHTS
        if (!form.alturaMin) {
            // height min
            errors.alturaMin = "Escribe una altura minima valido";

        } else if ((Number(form.alturaMin)) <= 0) {
            errors.alturaMin = "No se reciben valores negativos";
        }
        if (!form.alturaMax) {
            // height max
            errors.alturaMax = "Escribe una altura maxima valida";
        } else if (form.alturaMax >= 2700) {
            errors.alturaMax = "El valor no puede ser mayor a 2700";
        } else if (form.alturaMax <= 0) {
            errors.alturaMax = "No se aceptan numeros negativos";
        }

        if (form.alturaMin > form.alturaMax) {
            errors.alturaMin = "La Altura Minima No puede ser mayor a la Altura Maxima"
        }


        if (form.alturaMax < form.alturaMin) {
            errors.alturaMaxa = "La altura  Maxima No puede ser menor a la altura Minima"
        }

        if (!(/\bhttps?:\/\/\S+\.(\S+)?(\?\S*)?\b/i).test(form.imagen)) {
            errors.imagen = "URL invalida"
        }
        return errors;


    }


    const handleChange = (event) => {
        const value = event.target.value;
        const property = event.target.name;

        setForm({
            ...form,
            [property]: value
        })

        setErrors(validation({
            ...form,
            [property]: value
        },))

    }

    const hadleSelectInput = (event) => {
        const value = event.target.value

        setSelecTemps([...selecTemps, value])

        const updatedTemperaments = localTemps.map((temp) => {
            if (temp.name === value) {
                return {
                    ...temp,
                    disabled: true
                };
            }
            return temp;
        });

        setLocalTemps(updatedTemperaments);
    }


    const handleDelete = (event) => {
        const clickForDelete = (event.target.textContent);

        const remainTemps = selecTemps.filter((temp) => temp !== clickForDelete)
        setSelecTemps(remainTemps)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (selecTemps.length === 0) {
            return alert("Selecciona los temperamentos")
        }

        console.log(errors);
        if (Object.values(errors).length === 0) {

            setForm({
                nombre: "",
                alturaMin: "",
                alturaMax: "",
                pesoMax: "",
                pesoMin: "",
                vida: "",
                imagen: "",
            })



            axios.post("http://localhost:3001/dogs", {
                name: form.nombre,
                height: `${form.alturaMin}-${form.alturaMax}`,
                weight: `${form.pesoMin}-${form.pesoMax}`,
                life_span: form.vida,
                created: true,
                image: form.imagen,
                temperament: tempId
            }).then((res) => console.log(res.data))
            alert("Datos completos")

        }
        else {
            console.log(form);
            alert("Debes corregir los errores")


        }


    }





    return (
        <div className={s.formContainer}>

            <form onSubmit={handleSubmit} action="" className={s.mainContainer}>
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
                        <select name="temps" onChange={hadleSelectInput} >
                            {localTemps.map((temp) => {
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
                {errors.temps && <span>{errors.temps}</span>}

                <button type="submit" className={s.button}>CREAR</button>
            </form>
        </div>
    )
}












export default Form