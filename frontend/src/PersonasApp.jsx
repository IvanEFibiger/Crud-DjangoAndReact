import { useState, useEffect } from 'react';
export const PersonasAPP = () => {
    const [personas, setPersonas] = useState([])
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [edad, setEdad] = useState('')
    const [nacionalidad, setNacionalidad] = useState('')
    const [email, setEmail] = useState('')
    const [direccion, setDireccion] = useState('')
    const [idEdit, setIdEdit] = useState(null)
    const [persona, setPersona] = useState(null)
    const csrftoken = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];
    const [mostrarDetalle, setMostrarDetalle] = useState(false);  


    useEffect(() =>{
        cargarPersonas();
    }, [])

    const cargarPersonas = () => {
        fetch('/personas/')
        .then((response) =>response.json())
        .then((data) =>setPersonas(data))
    }

    const mostrarPersona = (id) => {
        fetch(`/personas/${id}/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la persona');
            }
            return response.json();
        })
        .then((data) => {
            setPersona(data);
            setMostrarDetalle(true);  
        })
        .catch((error) => {
            console.error("Hubo un problema con la petición:", error);
        });
    }
    

    const crearPersona = () => {
        fetch('/personas/crear/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrftoken,
            },
            body: new URLSearchParams({nombre, apellido, edad, nacionalidad, email, direccion}),
        }).then(()=>{
            setNombre('')
            setApellido('')
            setEdad('')
            setNacionalidad('')
            setEmail('')
            setDireccion('')
            cargarPersonas()
        })
    }

    const editarPersona = () => {
        fetch(`/personas/editar/${idEdit}/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrftoken,
            },
            body: new URLSearchParams({nombre, apellido, edad, nacionalidad, email, direccion}),
        }).then(()=>{
            setNombre('')
            setApellido('')
            setEdad('')
            setNacionalidad('')
            setEmail('')
            setDireccion('')
            setIdEdit(null)
            cargarPersonas()
        })
    }


    const eliminarPersona = (id) => {
        fetch(`/personas/eliminar/${id}/`)
        .then(()=>cargarPersonas())
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        if(idEdit) {
            editarPersona()
        }else {
            crearPersona()
        }
    }


  return (
    <div className='container'>
        <h1>CRUD PERSONA CON DJANGO + REACT</h1>
        {/* Formulario para crear o editar persona */}
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input
                    type='text'
                    placeholder='Nombre'
                    className="form-control"
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Apellido'
                    className="form-control"
                    value={apellido}
                    onChange={(e)=>setApellido(e.target.value)}
                    required
                />
                <input
                    type='number'
                    placeholder='Edad'
                    className="form-control"
                    value={edad}
                    onChange={(e)=>setEdad(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Nacionalidad'
                    className="form-control"
                    value={nacionalidad}
                    onChange={(e)=>setNacionalidad(e.target.value)}
                    required
                />
                <input
                    type='email'
                    placeholder='Email'
                    className="form-control"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Direccción'
                    className="form-control"
                    value={direccion}
                    onChange={(e)=>setDireccion(e.target.value)}
                    required
                />
                <button type='submit' className="btn btn-primary">{idEdit ? 'Editar' : 'Crear'}</button>
            </div>
        </form>

        {/* Lista de personas */}

    <table className="table table-striped">
        <thead>
            <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Edad</th>
            <th scope="col">Nacionalidad</th>
            <th scope="col">Email</th>
            <th scope="col">Dirección</th>
            <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            {personas.map((persona) => (
            <tr key={persona.id}>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
                <td>{persona.edad}</td>
                <td>{persona.nacionalidad}</td>
                <td>{persona.email}</td>
                <td>{persona.direccion}</td>
                <td>
                    <div className='d-flex gap-2'>
                        <button
                            onClick={() => {
                            setIdEdit(persona.id);
                            setNombre(persona.nombre);
                            setApellido(persona.apellido);
                            setEdad(persona.edad);
                            setNacionalidad(persona.nacionalidad);
                            setEmail(persona.email);
                            setDireccion(persona.direccion);
                            }}
                            className="btn btn-primary btn-sm"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => eliminarPersona(persona.id)}
                            className="btn btn-danger btn-sm mx-2"
                        >
                            Eliminar
                        </button>
                        <button
                            onClick={() => mostrarPersona(persona.id)}
                            className="btn btn-info btn-sm"
                        >
                            Mostrar
                        </button>
                    </div>
                </td>
            </tr>
            ))}
        </tbody>
    </table>


            {/* Mostrar una sola persona  */}  
            {mostrarDetalle && persona && (
                <div className='card'>
                    <div className='card-body'>
                    <h2 className='card-title'>Detalle de {persona.nombre} {persona.apellido}</h2>
                    <p className='card-text'>Nombre: {persona.nombre}</p>
                    <p className='card-text'>Apellido: {persona.apellido}</p>
                    <p className='card-text'>Edad: {persona.edad}</p>
                    <p className='card-text'>Nacionalidad: {persona.nacionalidad}</p>
                    <p className='card-text'>Email: {persona.email}</p>
                    <p className='card-text'>Dirección: {persona.direccion}</p>
                    </div>
                </div>
            )}
    </div>
  )
}
