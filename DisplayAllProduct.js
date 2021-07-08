import React,{useState, useEffect} from "react";
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import swalhtml from '@sweetalert/with-react';
import swal from 'sweetalert';
import {ServerURL, postDataAndImage, getData, postData} from './FetchNodeServices';
import {isBlank} from './Checks';
import renderHTML from 'react-render-html';
import { makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
 
},
subdiv:{
    padding:20,
    marginTop:90,
    width:700,
    background:'#fff',
    outline:'10px solid pink',
},
input: {
    display: 'none',
  },

}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function DisplayAllProduct(props)
{ 
  const [list, setList]=useState()
  const classes = useStyles();
 // var id = props.tid

  ///////////////////////////////////////////Edit Form/////////////////////////////////////////////////////////

const [productId,setProductId]=useState('')
const [image,setImage]=useState({bytes:'', file:'/noimage.webp'})
const [title,setTitle]=useState('')
const [description,setDescription]=useState('')
const [price,setPrice]=useState('')
const [iconSaveCancel,setIconSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])

const handleIcon=(event)=>{
  setImage({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  setIconSaveCancel(true)

}

const fetchAllProduct= async () => {
  var user=JSON.parse(localStorage.getItem('user'))
  var body = {id:user.id}
  //alert(user.id)

          var result = await postData("usersdetail/displayproductbysignup",body);
          setList(result);
          
        };

        useEffect(function(){
          fetchAllProduct()
        },[])


const handledelete=async()=>{
  var body = {productid:productId}
  var result = await postData('product/deleteproduct',body);

  if(result)
  {
      swal({
          title: "Product Deleted Successfully",
          icon: "success",
          dangerMode: true,
         })
  }
  else
  {
    swal({
      title: "Fail to Delete Record",
      icon: "success",
      dangerMode: true,
     })
  }
}

const handleClick=async()=>{
 
  var msg="<div>"
  if(isBlank(title))
  {error=true
      msg+="<font color='#c0392b'><b>Title should not be blank..</b></font><br>"
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
  var error=false
  if(error)
  {console.log(error)
      swalhtml(renderHTML(msg))
  }
  else
  {
  var body = {"productid":productId,"title":title,"description":description,"price":price};
  var result = await postData('product/editproductdata', body);
  }
  if(result)
  {
    
      swal({
          title: "Product Updated Successfully",
          icon: "success",
          dangerMode: true,
         })
  }
}


const handleCancelIcon=()=>{
  setIconSaveCancel(false)
  setImage({bytes:'',file:`${ServerURL}/images/${getRowData.image}`})
}

const handleClickSaveIcon=async()=>{

  var formData = new FormData()
  formData.append("productid",productId)
  formData.append("image",image.bytes)
  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('product/editimage',formData, config)
  if(result)
  {
      swal({
          title: "Image Upadated Successfully",
          icon: "success",
          dangerMode: true,
         });
         setIconSaveCancel(false)
  }

}


const editFormView=()=>{
  return (
    <div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={1} >
                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div style={{fontSize:23, fontWeight:650, letterSpacing:2, padding:18}}>
                        Product Interface
                    </div>
                    </Grid>

                    <Grid xs={12} sm={1}></Grid>

                <Grid item xs={12} sm={7}>
                <span style={{fontSize:15,fontWeight:400}}>Edit Product Image</span>
                <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                <IconButton color="primary" component="span">
                <PhotoCamera />
                </IconButton>
                </label>
                </Grid>

                <Grid item xs={12} sm={4} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                <Avatar variant="rounded" src={image.file} style={{width:60,height:60}}  style={{width:100,height:100}}/>
                {iconSaveCancel?<span><Button color="secondary" onClick={()=>handleClickSaveIcon()}>Save</Button><Button color="secondary" onClick={()=>handleCancelIcon()}>Cancel</Button></span>:<></>}
                </Grid>
              

                <Grid item xs={12} sm={4}>
                    <TextField label="Title" value={title} onChange={(event)=>setTitle(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField label="Price" value={price} onChange={(event)=>setPrice(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField label="Description" value={description} onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

      
            </Grid>
        </div>



    </div>

)


}

  /////////////////////////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////Edit Dialog///////////////////////////////////////////
 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData)
    setOpen(true);
    setProductId(rowData.productid);
    setImage({bytes:"",file:`${ServerURL}/images/${rowData.image}`})
    setTitle(rowData.title)
    setDescription(rowData.description)
    setPrice(rowData.price)

  };

  const handleClose = () => {
    setOpen(false);
    fetchAllProduct()
  };

  const showEditDialog=()=>{
    return (
      <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit/Delete Product
              </Typography>
              <Button autoFocus color="inherit" onClick={()=>handleClick()}>
                Update
              </Button>
              <Button autoFocus color="inherit" onClick={handledelete}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>
          {editFormView()}
        </Dialog>
      </div>
    );

  }

  ///////////////////////////////////////////////////////////////////////////////////////

function DisplayAll() {
    return (
      <div>
      <MaterialTable
        title=""
        columns={[
         // { title: 'Id', field: 'productid' },
         { title: 'Image', field: 'image',
         render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.image}`} style={{borderRadius:10}} width='50' height='50'/></div>)
         },
          { title: 'Title', field: 'title' },
          { title: 'Description', field: 'description' },
          { title: 'Price', field: 'price'},
          
        ]}
      
        data={list}

        options={{
          search: true,
          searchFieldVariant:'outlined',
          searchFieldAlignment:'left',
          actionsColumnIndex:-1,
          searchFieldStyle:{borderRadius:'20px',border:'1px solid #a4b0be',width:'95%',height:42},
          headerStyle:{fontWeight:700,fontSize:19,padding:20,background:'red',color:'#FFF'},
        }}
        

        actions={[
          {
            icon: () =>  <span><RefreshIcon color="primary"/></span>,
           onClick: () => {
           fetchAllProduct();
           },
           isFreeAction: true,
           tooltip: 'Refresh',
         },

          {

            icon: 'editoutlined',
            tooltip: 'Edit Product',
            
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }
  return(<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    <div style={{marginTop:50, padding:5, width:900,backgroundColor:"#FFF",justifyContent:'center',alignContent:'center',alignItem:'center',flexDirection:'column'}}>
    <div style={{fontSize: 22,fontWeight:700,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:2,fontSize:30, padding:20}}>Product List</div>
      {DisplayAll()}
    </div>
  </div>)
}

