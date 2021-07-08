import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Product from './Product';
import DisplayAllProduct from './DisplayAllProduct';

 export default function ListItems(props)
 {
     const handleClick=(v)=>{
         props.setComponent(v)
     }


     return(
         <div>
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Product" onClick={()=>handleClick(<Product/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Display Product" onClick={()=>handleClick(<DisplayAllProduct/>)} />
    </ListItem>

   </div>
</div>
);
}