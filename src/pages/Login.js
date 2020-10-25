import React, { useContext } from "react"
import {UserContext} from "../context/UserContext"
import axios from "axios"
import { Form, Input, Button, Typography } from 'antd';
const {Title} = Typography

const Login = () =>{
  const [, setUser] = useContext(UserContext)

  const onFinish = (values) =>{
    axios.post("https://backendexample.sanbersy.com/api/user-login", {
      email: values.email, 
      password: values.password
    }).then(
      (res)=>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
      }
    ).catch((err)=>{
      alert("Email is not registered or wrong password")
    })
  }

  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 10,
    },
  };
  
  const tailLayout = {
    wrapperCol: {
        sm: {
            span: 8,
            offset: 11,
        },
    },
  };

  return(
    <>
      <Title style={{textAlign: "center", fontSize: "30px"}}>
          Login
      </Title>
      <Form
      {...layout}
      name="login"
      onFinish={onFinish}
      >
          <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid Email!',
            },
            {
                required: true,
                message: 'Please input your Email!',
            },
          ]}
          >
          <Input />
          </Form.Item>

          <Form.Item
          name="password"
          label="Password"
          rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
          ]}
          >
          <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                  Submit
              </Button>
          </Form.Item>
      </Form>
    </>
  )
}

export default Login