import React from 'react'
import { formatDate } from '../helpers/formatDate';
import IconoCasa from '../img/icono_casa.svg';
import IconoAhorro from '../img/icono_ahorro.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGasto from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';
import {LeadingActions,SwipeableList,SwipeableListItem,SwipeAction,TrailingActions} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
const dictionaryIcon = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastosVarios: IconoGasto,
    hobbies: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

export const Spent = ({spent,setSpentEditar,deleteSpent}) => {

    const {category,amount,name,id,date} = spent;

    const leadingActions = () =>(
        <LeadingActions>
            <SwipeAction onClick={()=>setSpentEditar(spent)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () =>(
        <TrailingActions>
            <SwipeAction onClick={() =>deleteSpent(id)} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
   <SwipeableList>
    {/* Para que funcione el scroll se le debe pasar leadingActions parte delantera para arrastrar
    y se le asigna una funcion a ejecutar cuando arrastre. TrailingActions es la parte de atras osea dercha a izquierda */}
        <SwipeableListItem leadingActions={leadingActions()}trailingActions={trailingActions()}>
            <div className='gasto sombra'>
            <div className='contenido-gasto'>
                    <img src={dictionaryIcon[category]} alt="Icono" />
                    <div className='descripcion-gasto'>
                        <p className='categoria'>{category}</p>
                        <p className='nombre-gasto'>{name}</p>
                        <p className='fecha-gasto'>
                            Agregado:
                            <span>{formatDate(date)}</span>
                        </p>
                    </div>
                </div>
                <p className='cantidad-gasto'>${amount}</p>
            </div>
        </SwipeableListItem>
   </SwipeableList>
  )
}
