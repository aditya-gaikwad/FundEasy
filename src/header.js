import React,{useEffect} from 'react';
import {Card,Menu,Button} from 'semantic-ui-react';
import factory from '../ethereum/factory.js';
import {Link} from '../routes.js';
function Header(){
  return (<Menu style={{marginTop:10}}>
     <Link route='/'>
     <a className='item'>FundEasy</a>
     </Link>


     <Menu.Menu position='right'>
     <Link route='/'>
     <a className='item'>Campaigns</a>
     </Link>
     <Link route='/Campiagns/new'>
        <Button icon='add 'className='item'/>
     </Link>

     </Menu.Menu>
   </Menu>
 );
}
export default Header;
