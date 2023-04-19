import React, { useEffect, useState } from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const ControlBudget = ({budget,expenses,setExpenses,setBudget,setIsValidBudget}) => {
    
    const [available, setAvailable] = useState(0);
    const [spent, setSpent] = useState(0)
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
      
        const totalSpent = expenses.reduce( (total, item) => item.amount + total,0);
        console.log(totalSpent);
        const totalAvailable = budget - totalSpent;

        const newPercentage = (((budget-totalAvailable)/budget)*100).toFixed(2)
        setPercentage(newPercentage);
        setSpent(totalSpent);
        setAvailable(totalAvailable);
      
    }, [expenses])
    

    
    const formatAmount = (amount) =>{
        return amount.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        });
    }

    const resetBudget = () =>{
        const result = confirm('¿Deseas resetear el presupuesto?');

        if(result){
            setExpenses([])
            setBudget(0)
            setIsValidBudget(false);
        }
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
            styles={buildStyles({
                pathColor: percentage > 100 ? '#DC2626' : "#519c1e",
                trailColor: "#F5F5F5",
                textColor: percentage > 100 ? '#DC2626' : "#519c1e"
            })}
            
            value={percentage}
            text={`${percentage} %`}/>
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={resetBudget}>
                Resetear Presupuesto
            </button>
            <p>
                <span>Presupuesto: </span> {`${formatAmount(budget)}`}
            </p>
            <p className={`${available < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {`${formatAmount(available)}`}
            </p>
            <p>
                <span>Gastado: </span> {`${formatAmount(spent)}`}
            </p>
        </div>
    </div>
  )
}
