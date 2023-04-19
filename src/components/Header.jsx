import React from 'react'
import { NewBudget } from './NewBudget'
import { ControlBudget } from './ControlBudget'

export const Header = ({budget,setBudget,isValidBudget,setIsValidBudget,expenses,setExpenses}) => {
  return (
    <header>
        <div className='header-p'>
            <h1><img width='40px' height='40px' src="../img/icons/money-bag.png" alt="" />Planificador de Gastos</h1>
        </div>

        {
          isValidBudget 
          ?(
            <ControlBudget
            setExpenses={setExpenses}
            expenses={expenses}
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}/>
          )
          : (
            <NewBudget 
            budget={budget} 
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}/>
          )
        }
      
        
    </header>
  )
}
