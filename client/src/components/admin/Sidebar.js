import React from 'react'
import {Link} from 'react-router-dom'

import {Button, Card} from 'react-bootstrap'


const Sidebar = () => {
  return (
    <div>



      <Button variant="primary" size="lg" block > <Link to='/admin/commandes'><h2>gestion des commandes</h2></Link></Button>
<Button variant="secondary" size="lg" block > <Link to='/admin/userlist'><h2>gestion des utilisateurs</h2></Link></Button>
<Button variant="primary" size="lg" block > <Link to='/admin/productlist'><h2>gestion des catégories et des ingredients</h2></Link></Button>
    </div>
  )
}

export default Sidebar



