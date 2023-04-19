import React from 'react'

export const Filter = ({filter,setFilter}) => {

    const handleFilter = (e) =>{
        setFilter(e.target.value)
    }

  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label> Filtrar Gastos</label>
                <select value={filter} onChange={handleFilter}>
                    <option value="">-- Toda las categorias --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastosVarios">Gastos Varios</option>
                    <option value="hobbies">Hobbies</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}
