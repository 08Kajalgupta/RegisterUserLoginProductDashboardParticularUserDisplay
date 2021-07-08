import React,{useState} from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import swalhtml from '@sweetalert/with-react';
import swal from 'sweetalert';
import Paper from '@material-ui/core/Paper';
import {ServerURL, postDataAndImage} from './FetchNodeServices';
import {isBlank} from './Checks';
import renderHTML from 'react-render-html';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
     
    },
    subdiv:{
        padding:20,
        marginTop:20,
        width:800,
        background:'#fff'
    },
    input: {
        display: 'none',
      },

  }));     


export default function Product(props)
{
const classes = useStyles();
const [image,setImage]=useState({bytes:'', file:'/noimage.webp'})
const [title,setTitle]=useState('')
const [description,setDescription]=useState('')
const [price,setPrice]=useState('')
//const [id,setId]=useState('')

const handleIcon=(event)=>{
    setImage({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})

}


const handleClick=async()=>{
   
    var error=false
    var msg="<div>"
    
    if(isBlank(image.bytes))
    {error=true
        msg+="<font color='#c0392b'><b>Please select product image..</b></font><br>"
    }
    if(isBlank(title))
    {error=true
        msg+="<font color='#c0392b'><b>Product Title should not be blank..</b></font><br>"
    }
    if(isBlank(description))
    {error=true
        msg+="<font color='#c0392b'><b>Description should not be blank..</b></font><br>" 
    }
    if(isBlank(price))
    {error=true
        msg+="<font color='#c0392b'><b>Price should not be blank..</b></font><br>"
    }
    
    msg+="</div>"

    if(error)
    {
        swalhtml(renderHTML(msg))
    }
else{

    var formData = new FormData()
    //formData.append("id",id)
    formData.append("image",image.bytes)
    formData.append("title",title)
    formData.append("description",description)
    formData.append("price",price)
    
    var config = {headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage('product/addnewproduct',formData, config)
    if(result)
    {
        swal({
            title: "Product Submitted Successfully",
            icon: "success",
            dangerMode: true,
           })
    }
}
}

    return (
        <div className={classes.root}>
            <Paper elevation={2}>
            <div className={classes.subdiv}>
                <Grid container spacing={1} >
                    <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <div style={{fontSize:23, fontWeight:650, letterSpacing:2, padding:18}}>
                            Product Interface

                        </div>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                    <span style={{fontSize:15,fontWeight:400}}>Upload Product Image</span>
                    <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                    <IconButton color="primary" component="span">
                    <PhotoCamera />
                    </IconButton>
                    </label>
                    </Grid>

                    <Grid item xs={12} sm={2} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Avatar variant="rounded" src={image.file} style={{width:60,height:60}}/>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField label="Product Title" onChange={(event)=>setTitle(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField label="Product Price" onChange={(event)=>setPrice(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField label="Description" onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>
      
                    <Grid item xs={12} sm={3} style={{display:'flex', justifyContent:'center', alignItems:'center',marginTop:18,marginLeft:250}}>
                    <Button onClick={()=>handleClick()} fullWidth variant="contained" color="secondary" style={{borderRadius:'32px',padding:10,fontSize:18,fontWeight:'bold',width:150}}>Submit</Button>
                    </Grid>


                </Grid>
            </div>
            </Paper>



        </div>

    )
}