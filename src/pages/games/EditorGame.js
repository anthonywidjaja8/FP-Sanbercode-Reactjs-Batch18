import React, { useContext, useEffect, useState } from "react"
import {GameContext} from "../../context/GameContext"
import axios from "axios"
import { UserContext } from "../../context/UserContext"
import { Redirect, useParams } from "react-router-dom"
import { Form, Input, Button, DatePicker, Typography, Checkbox, Row, Col } from 'antd';
import moment from "moment";
const {Title} = Typography

const EditorGame = () => {
    const [user] = useContext(UserContext)
    let {id} = useParams()
    const [data, setData] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [form] = Form.useForm()
    const [listGames, setListGames, , ] = useContext(GameContext)
    
    useEffect(() => {
        if (data === null && id !== null){
          axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
          .then(res => {
            let singleMultiChecked = []

            if(res.data.singlePlayer === 1) {
                singleMultiChecked.push('singlePlayer')
            }
            if(res.data.multiplayer === 1) {
                singleMultiChecked.push('multiplayer')
            }
            form.setFieldsValue({

                name: res.data.name,
                release: moment(res.data.release, 'YYYY'),
                genre: res.data.genre,
                platform: res.data.platform,
                singleMultiChecked: singleMultiChecked,
                image_url: res.data.image_url
            })
            setData(res.data)
          })
        }
      });

    const layout = {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 15,
        },
      };

    const tailFormItemLayout = {
        wrapperCol: {
            sm: {
                span: 8,
                offset: 11,
            },
        },
    };

    const onFinish = (values) => {
        let name = values.name
        let release = moment(values.release).year()
        let genre = values.genre
        let platform = values.platform
        let singlePlayer = 
        (values.singleMultiChecked[0] === "singlePlayer" 
        || values.singleMultiChecked[1] === "singlePlayer") ? 1 : 0
        let multiplayer = 
        (values.singleMultiChecked[0] === "multiplayer" 
        || values.singleMultiChecked[1] === "multiplayer") ? 1 : 0
        let image_url = values.image_url

        if (typeof id === 'undefined'){
            axios.post(`https://backendexample.sanbersy.com/api/data-game`, 
            {name, release, genre, platform, singlePlayer, multiplayer, image_url},
            {headers: {"Authorization" : `Bearer ${user.token}`}})
            .then(res => {
                setListGames([
                    ...listGames, 
                    { 
                        id: res.data.id, 
                        name, 
                        release,
                        genre,
                        platform,
                        singlePlayer,
                        multiplayer,
                        image_url
                    }
                ])
                setRedirect(true)
                alert("Successfully created game")
            })
            .catch(err => {
                alert("An error occured in the system")
            })
        } else {
            axios.put(`https://backendexample.sanbersy.com/api/data-game/${id}`, 
            {name, release, genre, platform, singlePlayer, multiplayer, image_url},
            {headers: {"Authorization" : `Bearer ${user.token}`}})
            .then(() => {
                let dataGame = listGames.find(el => el.id === parseInt(id))
                dataGame.name = name
                dataGame.release = release
                dataGame.genre = genre
                dataGame.platform = platform
                dataGame.singlePlayer = singlePlayer
                dataGame.multiplayer = multiplayer
                dataGame.image_url = image_url

                setListGames([...listGames])
                setRedirect(true)
                alert("Successfully edited game")
            })
            .catch(err => {
                alert("An error occured in the system")
            })
        }
    };

    const redirectPage = () => {
        if(redirect === true) {
            return <Redirect to="/setting-game"/>
        }
    }
    
    return(
        <>  
            {redirectPage()}
            <Title style={{textAlign: "center", fontSize: "30px"}}>
                {(typeof id === 'undefined') ? "Add Game" : "Edit Game"}
            </Title>
            <Form {...layout} form={form} name="editor-game" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                    {
                        required: true,
                        message: "Please input Name!"
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="release"
                    label="Release"
                    rules={[
                    {
                        required: true,
                        message: "Please input Release!"
                    },
                    ]}
                >
                    <DatePicker picker="year" inputReadOnly />
                </Form.Item>
                <Form.Item
                    name="genre"
                    label="Genre"
                    rules={[
                    {
                        required: true,
                        message: "Please input Year!"
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="platform"
                    label="Platform"
                    rules={[
                    {
                        required: true,
                        message: "Please input Platform!"
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="singleMultiChecked"
                    label="Game Mode"
                    rules={[
                    {
                        required: true,
                        message: "Please choose Game Mode!"
                    },
                    ]}
                >
                    <Checkbox.Group>
                        <Row>
                            <Col span={24}>
                                <Checkbox
                                    value="singlePlayer"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    Single Player
                                    </Checkbox>
                            </Col>
                            <Col span={24}>
                                <Checkbox
                                    value="multiplayer"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    Multi Player
                                    </Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                    
                </Form.Item>
                <Form.Item
                    name="image_url"
                    label="Image"
                    rules={[
                    {
                        required: true,
                        message: "Please input Image URL!"
                    },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="redirect">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
      </>
    )
}

export default EditorGame