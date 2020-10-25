import React, { useContext, useEffect, useState } from "react"
import {MovieContext} from "../../context/MovieContext"
import axios from "axios"
import { UserContext } from "../../context/UserContext"
import { Redirect, useParams } from "react-router-dom"
import { Form, Input, Button, Typography, DatePicker, Rate, Slider } from 'antd';
import TextArea from "antd/lib/input/TextArea"
import moment from "moment";
const {Title} = Typography

const EditorMovie = () => {
    const [user] = useContext(UserContext)
    let {id} = useParams()
    const [data, setData] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [form] = Form.useForm()
    const [listMovies, setListMovies, , ] = useContext(MovieContext)
    
    useEffect(() => {
        if (data === null && id !== null){
          axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
          .then(res => {
            form.setFieldsValue({
                title: res.data.title,
                year: moment(res.data.year, 'YYYY'),
                genre: res.data.genre,
                duration: res.data.duration,
                rating: res.data.rating,
                description: res.data.description,
                review: res.data.review,
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
        let title = values.title
        let year = moment(values.year).year()
        let genre = values.genre
        let duration = values.duration
        let rating = values.rating
        let description = values.description
        let review = values.review
        let image_url = values.image_url
       
        if (typeof id === 'undefined'){
            axios.post(`https://backendexample.sanbersy.com/api/data-movie`, 
            {title, year, genre, duration, rating, description, review, image_url},
            {headers: {"Authorization" : `Bearer ${user.token}`}})
            .then(res => {
                setListMovies([
                    ...listMovies, 
                    { 
                        id: res.data.id, 
                        title, 
                        year,
                        genre,
                        duration,
                        rating,
                        description,
                        review,
                        image_url
                    }
                ])
                setRedirect(true)
                alert("Successfully created movie")
            }).catch(err => {
                alert("An error occured in the system")
            })
        } else {
            axios.put(`https://backendexample.sanbersy.com/api/data-movie/${id}`, 
            {title, year, genre, duration, rating, description, review, image_url},
            {headers: {"Authorization" : `Bearer ${user.token}`}})
            .then(() => {
                let dataMovie = listMovies.find(el => el.id === parseInt(id))
                dataMovie.title = title
                dataMovie.year = year
                dataMovie.genre = genre
                dataMovie.duration = duration
                dataMovie.rating = rating
                dataMovie.description = description
                dataMovie.review = review
                dataMovie.image_url = image_url

                setListMovies([...listMovies])
                setRedirect(true)
                alert("Successfully edited movie")
            })
            .catch(err => {
                alert("An error occured in the system")
            })
        }
    };

    const redirectPage = () => {
        if(redirect === true) {
            return <Redirect to="/setting-movie"/>
        }
    }
      
    return(
        <>
            {redirectPage()}
            <Title style={{textAlign: "center", fontSize: "30px"}}>
                {(typeof id === 'undefined') ? "Add Movie" : "Edit Movie"}
            </Title>
            <Form {...layout} form={form} name="editor-movie" onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                    {
                        required: true,
                        message: "Please input Title!"
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="year"
                    label="Year"
                    rules={[
                    {
                        required: true,
                        message: "Please input Year!"
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
                        message: "Please input Genre!"
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="duration"
                    label="Duration (minutes)"
                >
                    <Slider defaultValue={0} min={0} max={120}
                    marks={{
                        0: '0',
                        30: '30',
                        60: '60',
                        90: '90',
                        120: '120'
                    }}
                    />
                </Form.Item>
                <Form.Item
                    name="rating"
                    label="Rating"
                    rules={[
                    {
                        required: true,
                        message: "Please input Rating!"
                    },
                    ]}
                >
                    <Rate allowClear={false} count={10}/>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                    {
                        required: true,
                        message: "Please input Description!"
                    },
                    ]}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    name="review"
                    label="Review"
                    rules={[
                    {
                        required: true,
                        message: "Please input Review!"
                    },
                    ]}
                >
                    <Input />
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

export default EditorMovie 