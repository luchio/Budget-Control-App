import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import IconNewSpent from './img/nuevo-gasto.svg';
import { Modal } from './components/Modal';
import { generateId } from './helpers/generatetId';
import { ListSpent } from './components/ListSpent';
import { Filter } from './components/Filter';

function App() {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  );
  const [spentEditar, setSpentEditar] = useState({})

  const [filter, setFilter] = useState(null)
  const [expensesFilter, setExpensesFilter] = useState([])


  const handleNewSpent = () => {
    setModal(true);
    setSpentEditar({});
    setTimeout(() => {
        setAnimateModal(true)
    }, 500);

  }

  const saveSpent = (spent) => {

    if(spent.id){
      //update
      const spentUpdated = expenses.map( item => item.id === spent.id ? spent : item );
      setExpenses(spentUpdated);
      setSpentEditar({})
    } else {
      //new
      spent.id = generateId();
      spent.date = Date.now();
      setExpenses([...expenses,spent]);
    }


      setAnimateModal(false);
       
       setTimeout(() => {
           setModal(false);
        }, 500);
  }
  
  const deleteSpent = id => {
      const expensesUpdated = expenses.filter(item => item.id !==id);
      setExpenses(expensesUpdated);
  }

  useEffect(() => {
    if(Object.keys(spentEditar).length > 0){
      setModal(true);
      setTimeout(() => {
          setAnimateModal(true)
      }, 500);
    }
  }, [spentEditar])

  useEffect(() => {
    localStorage.setItem('budget',budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses',JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    
    if(filter){
      const expensesFilter = expenses.filter(item => item.category === filter)
      setExpensesFilter(expensesFilter)
    }
    
  }, [filter])
  
  

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0

    if(budgetLS > 0){
      setIsValidBudget(true)
    }
  }, [])

  
  
  

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
      expenses = {expenses}
      setExpenses={setExpenses}
      budget={budget} 
      setBudget={setBudget}
      isValidBudget={isValidBudget}
      setIsValidBudget={setIsValidBudget}/>
      {
        isValidBudget && 
        (<>
          <main>
              <Filter
              filter={filter} setFilter={setFilter}/>
              <ListSpent 
              expenses={expenses} 
              setSpentEditar={setSpentEditar} 
              deleteSpent={deleteSpent}
              filter={filter}
              expensesFilter={expensesFilter}/>
          </main>
          <div className='nuevo-gasto'>
            <img
            onClick={handleNewSpent} 
            src={IconNewSpent} 
            alt="Icono nuevo gasto" />
          </div>
        </>
        )
    
      }

      {
        modal && <Modal 
                setModal={setModal} 
                animateModal={animateModal} 
                setAnimateModal={setAnimateModal}
                saveSpent={saveSpent}
                spentEditar={spentEditar}
                setSpentEditar={setSpentEditar}/>
      }
      
    </div>
  )
}

export default App
