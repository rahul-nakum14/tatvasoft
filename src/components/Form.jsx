import { Button, FormHelperText, TextField, Typography } from '@mui/material'
import { ErrorMessage, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';




export default function Form1() {

  // const [userName, setUserName] = useState("")
  // const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const [userData, setUserData] = useState();

  const URL = "https://book-e-sell-node-api.vercel.app/api/user"

  const submitData = (values) => {
    // console.log("username: ", userName);
    // console.log("password: ", password);

    const payload = {
      firstName: values.username,
      lastName: "xyz",
      email: values.email,
      roleId: values.age,
      password: values.password
    }

    axios.post(URL, payload).then((res) => {
        console.log("data added sucessfully");
        if(res)
        {
        toast.success("Registration Sucsessful", { position: "bottom-right" });
        navigate("/")
        }
        
      })
      .catch(() => {
        toast.error("Invalid Details!!!", { position: "bottom-right" })
        console.log("error")
        // console.log(payload)
      })

      console.log(values);
  }

  const validationSchema = yup.object().shape({
    username: yup.string().required("UserName should not be empty!").min(4),
    email: yup.string().required("E-mail should not be empty!").email()
               .matches(/^\S*$/, "Whitespace is not allowed!"),
    age: yup.number().required("Age should not be empty!").positive().integer().min(18).max(100),
    password: yup.string().required("Password should not be empty!")
                 .matches(/^\S*$/, "Whitespace is not allowed!")
                 .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
           )
  })

  const getRequestData = async () => {

    await axios.get(`${URL}/all`).then((res) => {
        setUserData(res.data)
    }).catch(() => {
        console.log("Data not found");
    })

}

  useEffect(() => {getRequestData();}, [])
  
  console.log(userData)

 

  return (
    <div className='loginImg'>
    <Formik initialValues={{ username: '', age: '', email: '', password: '' }} onSubmit={(values) => { submitData(values) }}
      validationSchema={validationSchema}>
      {({values, setFieldValue, errors, handleBlur}) => {
        // console.log("values", values);
        // console.log("error", errors);
        return (
          <Form>
            <div className='formContainer'>
              <div className='loginBox'>
                <Typography variant='h4' sx={{color: "blue"}} >Register here!</Typography><br /><hr /><br />

                <TextField variant='standard' label='User-Name' className='text' name='username' size='small' value={values.username} onBlur={handleBlur} onChange={(e) => {setFieldValue("username", e.target.value) }} ></TextField>
                <FormHelperText error>
                  <ErrorMessage name='username'/>
                </FormHelperText><br />

                <TextField variant='standard' label='E-mail' className='text' name='email' size='small' value={values.email} onBlur={handleBlur} onChange={(e)=> setFieldValue("email", e.target.value)} ></TextField>
                <FormHelperText error>
                  <ErrorMessage name='email'/>
                </FormHelperText><br />


                <TextField variant='standard' label='Password' className='text' name='password' size='small' value={values.password} onBlur={handleBlur} onChange={(e)=> setFieldValue("password", e.target.value)}></TextField>
                <FormHelperText error>
                  <ErrorMessage name='password'/>
                </FormHelperText><br />

                <Button variant='contained' type='submit'>Submit</Button>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
    </div> 

  )
}

