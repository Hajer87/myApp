import React from 'react'
import { Container } from 'react-bootstrap'
import { BsXCircle } from 'react-icons/bs'
import '../../assets/style/ingredients.css'

import IngCard from './IngCard'

const IngredientsList = (props) => {

  const list = props.category.ingredient
  const toggle = () => {
    props.setOpen(false)
  }
  return (
    <Container id="#ingredients">
      <h2>Choisissez un ingredient</h2>
      {(props.open) ?
         <button style={{background: 'transparent', border: 'none' }} onClick={toggle}>
           <BsXCircle/>
         </button>
         : null}
      <div id='ingredients' className='listt'>
        {list.map((el) => <IngCard key={el._id} ingredient={el} setCart={props.setCart} />)}
      </div>
    </Container>
  )
}

export default IngredientsList
