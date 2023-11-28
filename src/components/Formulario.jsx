import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    // Hooks
    const [ nombre, setNombre ] = useState('');
    const [ propietario, setPropietario ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ fecha, setFecha ] = useState('');
    const [ sintomas, setSintomas ] = useState('');

    const [ error, setError ] = useState(false);

    // Effects
    useEffect(() => {
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]);

    // Variables/constants
    // Functions
    const generarId = () => {
        const fecha = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2)
        return random + fecha;
    }

    const handleSubmit = evt => {
        evt.preventDefault();

        // Validación del formulario
        if([ nombre, propietario, email, fecha, sintomas ].includes('')) {
            setError(true);
            return;
        }
        setError(false);

        // Objeto de pacientes
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        if(paciente.id) {
            // Editando el registro
            objetoPaciente.id = paciente.id;
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
            console.log(pacientesActualizados)

            setPacientes(pacientesActualizados);
            setPaciente({});
        }
        else {
            // Nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }

        // Reiniciar el form
        setNombre("");
        setPropietario("");
        setEmail("");
        setFecha("");
        setSintomas("");
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                >
                    {
                        error && <Error><p>Todos los cambios son obligatorios</p></Error>
                    }
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="nombreMascota"
                    >
                            Nombre Mascota
                    </label>
                    <input
                        id="nombreMascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={evt => setNombre(evt.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="nombrePropietario"
                    >
                            Nombre Propietario
                    </label>
                    <input
                        id="nombrePropietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={evt => setPropietario(evt.target.value)}
                    />
                </div>
                
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="email"
                    >
                            Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email Contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="alta"
                    >
                            Alta
                    </label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={evt => setFecha(evt.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="sintomas"
                    >
                            Síntomas
                    </label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los síntomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={evt => setSintomas(evt.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={paciente.id ? 'Editar paciente' : "Agregar paciente"}
                />
            </form>
        </div>
    )
}
export default Formulario