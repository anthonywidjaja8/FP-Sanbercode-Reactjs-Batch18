import React, { useContext, useEffect, useState } from "react"
import { Button, Table, Typography, Input, Row, Col, AutoComplete } from 'antd';
import {MovieContext} from "../../context/MovieContext"
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
const {Title} = Typography

const TableMovies = () => {
  const [user] = useContext(UserContext)
  const [listMovies, setListMovies, , ] = useContext(MovieContext)
  const [data, setData] = useState(null)

  const [filterYear, setFilterYear] = useState([])
  const [filterGenre, setFilterGenre] = useState([])
  const [filterDuration, setFilterDuration] = useState([])
  const [filterRating, setFilterRating] = useState([])

  useEffect(() => {
    if (data === null) {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                let dataYear = []
                let dataGenre = []
                let dataDuration = []
                let dataRating = []
                let splitData = []

                setData(res.data.map(item => {
                    dataYear = [...dataYear, item.year]

                    splitData = item.genre ? item.genre.split(', ') : ""
                    dataGenre = [...dataGenre, ...splitData]

                    dataDuration = [...dataDuration, item.duration]

                    dataRating = [...dataRating, item.rating]

                    return {
                        id: item.id,
                        title: item.title,
                        year: item.year,
                        duration: item.duration,
                        genre: item.genre,
                        rating: item.rating,
                        description: item.description,
                        review: item.review,
                        image_url: item.image_url
                    }
                }))

                dataYear = Array.from(new Set(dataYear)).sort()
                dataGenre = Array.from(new Set(dataGenre)).sort()
                dataDuration = Array.from(new Set(dataDuration)).sort()
                dataRating = Array.from(new Set(dataRating)).sort()

                setFilterYear(dataYear.map(item => {return { text: item, value: item } }))
                setFilterGenre(dataGenre.map(item => {return { text: item, value: item } }))
                setFilterDuration(dataDuration.map(item => {return { text: item, value: item } }))
                setFilterRating(dataRating.map(item => {return { text: item, value: item } }))
            })
    }
  }, [data])

  const columns = [
    {
      title: 'Poster',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (image_url) => <img alt="poster" src={image_url} width="60px" height="90px" />
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title) => [...title.substr(0, 15),..."..."],
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      filters: [...filterYear],
      onFilter: (value, record) => record.year === value,
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      filters: [...filterGenre],
      onFilter: (value, record) => record.genre.toLowerCase().indexOf(value.toLowerCase()) !== -1,
      sorter: (a, b) => a.genre.localeCompare(b.genre),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration) => `${duration} minutes`,
      filters: [...filterDuration],
      onFilter: (value, record) => record.duration === value,
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => 
        <>
        <Rating
          name="read-only"
          defaultValue={1}
          max={1}
          readOnly
        />{rating}
        </>,
      filters: [...filterRating],
      onFilter: (value, record) => record.rating === value,
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => description ? [...description.substr(0, 25),..."..."] : "",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: 'Review',
      dataIndex: 'review',
      key: 'review',
      render: (review) => [...review.substr(0, 15),..."..."],
      sorter: (a, b) => a.review.localeCompare(b.review),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: (id) => (
        <>
          <Button type="primary" size="small" style={{backgroundColor: "orange"}}>
            <Link to={`/movies/${id}`}>
              Detail
            </Link>
          </Button>
          <Button type="primary" size="small" style={{backgroundColor: "blue"}}>
            <Link to={`/edit-movie/${id}`}>
              Edit
            </Link>
          </Button>
          <Button type="primary" size="small" style={{backgroundColor: "red"}} 
          onClick={() => handleDelete(id)} value="x">
              Delete
          </Button>
        </>
      ),
    },
  ];

  const handleDelete = (id) => {
    let idDataMovie = parseInt(id)
    let newDaftarMovie = listMovies.filter(el => el.id !== idDataMovie)

    axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${idDataMovie}`,
    {headers: {"Authorization" : `Bearer ${user.token}`}})
    .then(res => {
        setData([...newDaftarMovie])
        setListMovies([...newDaftarMovie])
        alert("The movie has been deleted")
    }).catch(err => {
      alert("This movie can't be deleted")
    })
  }

  const handleSearch = (value) => {
    axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
    .then(res => {
      let resMovies = res.data.map(el => { 
        return {
          id: el.id, 
          title: el.title, 
          description: el.description,
          year: el.year,
          duration: el.duration,
          genre: el.genre,
          rating: el.rating,
          review: el.review,
          image_url: el.image_url
        }
      })
      let filteredMovies = resMovies.filter(x=> x.title.toLowerCase().indexOf(value.toLowerCase()) !== -1)
      setData([...filteredMovies])
    })
  }
  
  return (
    <>
    <Row>
      <Col span={10}>
          <AutoComplete onSearch={handleSearch}>
            <Input size="medium" placeholder="Movie name..." />
          </AutoComplete>
      </Col>
      <Col span={4}>
        <Title style={{textAlign: "center", fontSize: "30px"}}>
          List Movies
        </Title>
      </Col>
      <Col span={10}>
        <Button type="primary" shape="round" style={{float: "right"}}>
          <Link to={`/add-movie`}>
            + Add New Movie
          </Link>
        </Button>
      </Col>
    </Row>
    <Table columns={columns} dataSource={data} pagination={{pageSize: 5}}/>
    </>
  )
}

export default TableMovies