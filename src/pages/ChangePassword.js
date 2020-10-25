import React, { useContext } from "react"
import {UserContext} from "../context/UserContext"
import axios from "axios"
import { Form, Input, Button, Typography } from 'antd';
const {Title} = Typography

const ChangePassword = () =>{
  const [user] = useContext(UserContext)
  const [form] = Form.useForm()

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

  const onFinish = (values) => {
    let current_password = values.current_password
    let new_password = values.new_password
    let new_confirm_password = values.new_confirm_password
    
    axios.post("https://backendexample.sanbersy.com/api/change-password", 
    {current_password, new_password, new_confirm_password},
    {headers: {"Authorization" : `Bearer ${user.token}`}})
    .then(res => {
          form.setFieldsValue({
            current_password: "",
            new_password: "",
            new_confirm_password: ""
          })
          alert("Successfully changed Password")
        }
      ).catch((err)=>{
        alert(err)
      })
  }

  return(
    <>
        <Title style={{textAlign: "center", fontSize: "30px"}}>
            Change Password
        </Title>
        <Form
        {...layout}
        name="change-password"
        onFinish={onFinish}
        >
            <Form.Item
            name="current_password"
            label="Current Password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
            hasFeedback
        >
            <Input.Password />
        </Form.Item>

            <Form.Item
                name="new_password"
                label="New Password"
                rules={[
                {
                    required: true,
                    message: 'Please input new Password!',
                },
                {
                    min: 6,
                    message: 'The password must be at least 6 characters!'
                }
                ]}
            >
                <Input.Password />
            </Form.Item>
            
            <Form.Item
            name="new_confirm_password"
            label="Confirm Password"
            dependencies={['new_password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Please confirm new Password!',
            },
            ({ getFieldValue }) => ({
                validator(rule, value) {
                if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
                },
            }),
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

export default ChangePassword