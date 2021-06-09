import {Link} from 'react-router-dom'

const Header = (props) => {
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'>
            {' '}
            <span className='sr-only'>Toggle navigation</span>
            {' '}
            <span className='icon-bar'></span>
            {' '}
            <span className='icon-bar'></span>
            {' '}
            <span className='icon-bar'></span>
            {' '}
          </button>
          <a className='navbar-brand page-scroll' href='#page-top'>Eat Healthy</a>
          {' '}
        </div>
        <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav  navbar-right'>
            
            <li>
              <Link to='/admin/commandes' className='page-scroll'>gestion des commandes</Link>
            </li>
            
            <li>
              <Link to='/admin/categorie' className='page-scroll'>gestion des Categories</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Header
