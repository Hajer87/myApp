import { useSelector } from 'react-redux'
import AdminButton from './AdminButton'


import PasserCommandeButton from './PasserCommandeButton'
export const Header = (props) => {
  const user=useSelector((state)=>state.AuthReducer.user)

  return (

    <div>
      
    <header >
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                {/* <a href='#commande'
                  className='btn btn-custom btn-lg page-scroll'
                >
                Passer une commande
                </a>{' '} */}
               
                {(user && user.isAdmin )?
    <AdminButton/>:  <PasserCommandeButton/>} 
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    </div>
  )
}
