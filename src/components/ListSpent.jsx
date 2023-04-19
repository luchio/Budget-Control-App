import React from 'react'
import { Spent } from './Spent'

export const ListSpent = ({expenses,setSpentEditar,deleteSpent,filter,expensesFilter}) => {
  return (
    <div className='listado-gastos contenedor'>


        {
            filter ? ( 
                <>
                    <h2>{expensesFilter.length ? 'Gastos' : 'No hay gastos en esta categoria' }</h2>
                    {
                        expensesFilter.map( item => (
                            <Spent
                            key={item.id}
                            spent={item}
                            setSpentEditar={setSpentEditar}
                            deleteSpent={deleteSpent}/>
                        ))
                    }
                </>
            ) 
            :
            (
                <>
                    <h2>{expenses.length ? 'Gastos' : 'No hay gastos aún' }</h2>
                    {
                        expenses.map( item => (
                            <Spent
                            key={item.id}
                            spent={item}
                            setSpentEditar={setSpentEditar}
                            deleteSpent={deleteSpent}/>
                        ))
                    }
                </>
            )
        }
    </div>
  )
}
