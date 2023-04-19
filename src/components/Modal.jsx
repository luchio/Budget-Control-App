import { useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm'
import CloseBtn from '../img/cerrar.svg'
import { Message } from './Message';

const initialForm = {
    name: '',
    amount: '',
    category: '',
}

export const Modal = ({setModal,animateModal,setAnimateModal,saveSpent,spentEditar,setSpentEditar}) => {

    const {name,amount,category, onInputChange,onResetForm,setFormState} = useForm(initialForm);
    const [message, setMessage] = useState(null)
    const [id, setId] = useState(null)
    const [date, setDate] = useState(null)

   const handleCloseModal = () =>{
       setSpentEditar({})
       setAnimateModal(false);
       
       setTimeout(() => {
           setModal(false);
        }, 500);

   } 

   const handleSubmit = (e) =>{
        e.preventDefault();
        if([name,amount,category].includes('')){
            setMessage('Todos los campos son obligatorios');
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        }
        saveSpent({name,amount:Number(amount),category,id,date})
   }

   useEffect(() => {
    if(Object.keys(spentEditar).length > 0){
        setFormState(spentEditar);
        setId(spentEditar.id);
        setDate(spentEditar.date);
      } 
   }, [])
   
  return (
   <div className="modal">
        <div className="cerrar-modal">
            <img src={CloseBtn} alt="Cerrar Modal" onClick={handleCloseModal} />
        </div>

        <form onSubmit={handleSubmit} className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}>
            <legend>{spentEditar.name ? "Editar Gasto" : "Nuevo Gasto"}</legend>

            {message && <Message tipo={'error'}>{message}</Message>}

            <div className='campo'>
                <label htmlFor="name">Nombre del Gasto</label>
                <input 
                id='name'
                name='name'
                type="text"
                onChange={onInputChange}
                value={name}
                placeholder='Agrega el nombre del Gasto' />
            </div>
            <div className='campo'>
                <label htmlFor="amount">Cantidad del Gasto</label>
                <input 
                id='amount'
                name='amount'
                type="number"
                onChange={onInputChange}
                value={amount}
                placeholder='Agrega la cantidad del Gasto, ej: 300' />
            </div>
            <div className='campo'>
                <label htmlFor="category">Categoria</label>
                <select 
                id="category" 
                name='category' 
                onChange={onInputChange}
                value={category}>
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastosVarios">Gastos Varios</option>
                    <option value="hobbies">Hobbies</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input type="submit" value={spentEditar.name ? "Editar Gasto" : "Agregar Gasto"} />
        </form>
   </div>
  )
}
