import React, { useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ServerURL, postDataAndImage } from "./FetchNodeServices";
import {isBlank} from './Checks';
import renderHTML from 'react-render-html';
import swal from "sweetalert";
import swalhtml from '@sweetalert/with-react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  input: {
    display: 'none',
  },
  image: {
   backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(0.1, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  otpfield: {
    width: "38px",
    marginRight: "10px",
    paddingLeft: " 12px",
    height: "40px",
  },
}));

export default function SignUpForm(props) {
  const classes = useStyles();
  
  const [image,setImage]=useState({bytes:'', file:'/noimage.webp'})
  const [name, setName] = useState(" ");
  const [email,setEmail]=useState(" ");
  const [password, setPassword] = useState("");

  const handleIcon=(event)=>{
    setImage({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})

}


const handleClick=async()=>{
   
    var error=false
    var msg="<div>"
    
    if(isBlank(image.bytes))
    {error=true
        msg+="<font color='#c0392b'><b>Please select image..</b></font><br>"
    }
    if(isBlank(name))
    {error=true
        msg+="<font color='#c0392b'><b>Name should not be blank..</b></font><br>"
    }
    if(isBlank(email))
    {error=true
      msg+="<font color='#c0392b'><b>Email Id should not be blank..</b></font><br>"
    }
    if(isBlank(password))
    {error=true
        msg+="<font color='#c0392b'><b>Password should not be blank..</b></font><br>"
    }
    
    msg+="</div>"

    if(error)
    {
        swalhtml(renderHTML(msg))
    }
else{

    var formData = new FormData()
    formData.append("image",image.bytes)
    formData.append("name",name)
    formData.append("email",email)
    formData.append("password",password)
    
    var config = {headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage('usersdetail/addnewdetail',formData, config)
    if(result)
    {
        swal({
            title: "Sign Up Successfully",
            icon: "success",
            dangerMode: true,
           })
           props.history.push({'pathname':'/admindashboard'})
    }

    
    
}
}


  return (
    <div>
      <div style={{ padding: 20 }}>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
           </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Typography component="h4">Please enter your details</Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6} style={{marginTop:70}}>
                    <span style={{fontSize:20,fontWeight:600}}>Upload picture</span>
                    <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                    <IconButton color="primary" component="span">
                    <PhotoCamera />
                    </IconButton>
                    </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',marginTop:70}}>
                    <Avatar variant="rounded" src={image.file} style={{width:60,height:60}}/>
                    </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fname"
                      name="name"
                      onChange={(event) => setName(event.target.value)}
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      onChange={(event) => setEmail(event.target.value)}
                      fullWidth
                      id="mail"
                      label="Email Id"
                      name="email"
                      autoComplete="mail"
                    />
                  </Grid>
            
                
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      onChange={(event) => setPassword(event.target.value)}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>

                  <Grid item xs={12}
                  style={{display:'flex', justifyContent:'center', 
                  alignItems:'center'}}>
                    <Button 
                    onClick={()=>handleClick()} 
                    fullWidth
                    variant="contained"
                     color="secondary">
                      Sign Up
                     </Button>
                    </Grid>

                    <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>

                
                </Grid>
              
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
