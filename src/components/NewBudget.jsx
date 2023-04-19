import React, { useState } from 'react'
import { Message } from './Message'

export const NewBudget = ({budget,setBudget,setIsValidBudget}) => {

    const [message, setMessage] = useState(null)

    const handleBudget = (e) =>{
        setBudget(Number(e.target.value))
    }

    const handleSubmit = (e) =>{
        e.preventDefault(); 

        if( !budget || budget < 0){
            setMessage('El presupuesto no es válido');
            return;
        }
        setMessage(null);
        setIsValidBudget(true);
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handleSubmit} className='formulario'>
            <div className='campo'>
                <input 
                type="number"
                className='nuevo-presupuesto'
                placeholder='Añade tu Presupuesto' 
                value={budget}
                onChange={handleBudget}
                />
            </div>
            <input type="submit" value='Añadir'/>
            {message && <Message tipo={'error'}>{message}</Message>}
        </form>
    </div>
  )
}
