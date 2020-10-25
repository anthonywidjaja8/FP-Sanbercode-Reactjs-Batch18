import React, { useContext, useEffect, useState } from "react"
import { Button, Table, Typography, Input, Row, Col, AutoComplete } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { GameContext } from "../../context/GameContext";
const {Title} = Typography

const TableGames = () => {
  const [user] = useContext(UserContext)
  const [listGames, setListGames, , ] = useContext(GameContext)
  const [data, setData] = useState(null)

  const [filterRelease, setFilterRelease] = useState([])
  const [filterGenre, setFilterGenre] = useState([])
  const [filterPlatform, setFilterPlatform] = useState([])

  useEffect(() => {
    if (data === null) {
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                let dataRelease = []
                let dataGenre = []
                let dataPlatform = []
                let splitData = []

                setData(res.data.map(item => {
                    dataRelease = [...dataRelease, item.release]

                    splitData = item.genre ? item.genre.split(', ') : ""
                    dataGenre = [...dataGenre, ...splitData]

                    splitData = item.platform ? item.platform.split(', ') : ""
                    dataPlatform = [...dataPlatform, ...splitData]

                    return {
                        id: item.id,
                        name: item.name,
                        release: item.release,
                        genre: item.genre,
                        platform: item.platform,
                        singlePlayer: item.singlePlayer,
                        multiplayer: item.multiplayer,
                        image_url: item.image_url
                    }
                }))

                dataRelease = Array.from(new Set(dataRelease)).sort()
                dataGenre = Array.from(new Set(dataGenre)).sort()
                dataPlatform = Array.from(new Set(dataPlatform)).sort()

                setFilterRelease(dataRelease.map(item => {return { text: item, value: item } }))
                setFilterGenre(dataGenre.map(item => {return { text: item, value: item } }))
                setFilterPlatform(dataPlatform.map(item => {return { text: item, value: item } }))
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => [...name.substr(0, 15),..."..."],
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Release',
      dataIndex: 'release',
      key: 'release',
      filters: [...filterRelease],
      onFilter: (value, record) => record.release === value,
      sorter: (a, b) => a.release - b.release,
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
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      filters: [...filterPlatform],
      onFilter: (value, record) => record.platform.toLowerCase().indexOf(value.toLowerCase()) !== -1,
      sorter: (a, b) => a.platform.localeCompare(b.platform),
    },
    {
      title: 'Single Player',
      dataIndex: 'singlePlayer',
      key: 'singlePlayer',
      render: (singlePlayer) => (singlePlayer === 1) ? "Yes" : "No",
      filters: [
        {text: "Yes", value: 1},
        {text: "No", value: 0}
      ],
      onFilter: (value, record) => record.singlePlayer === value,
      sorter: (a, b) => a.singlePlayer - b.singlePlayer,
    },
    {
      title: 'Multi Player',
      dataIndex: 'multiplayer',
      key: 'multiplayer',
      render: (multiplayer) => (multiplayer === 1) ? "Yes" : "No",
      filters: [
        {text: "Yes", value: 1},
        {text: "No", value: 0}
      ],
      onFilter: (value, record) => record.multiplayer === value,
      sorter: (a, b) => a.multiplayer - b.multiplayer,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: (id) => (
        <>
          <Button type="primary" size="small" style={{backgroundColor: "orange"}}>
            <Link to={`/games/${id}`}>
              Detail
            </Link>
          </Button>
          <Button type="primary" size="small" style={{backgroundColor: "blue"}}>
            <Link to={`/edit-game/${id}`}>
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
    let idDataGame = parseInt(id)
    let newListGames = listGames.filter(el => el.id !== idDataGame)

    axios.delete(`https://backendexample.sanbersy.com/api/data-game/${idDataGame}`,
    {headers: {"Authorization" : `Bearer ${user.token}`}})
    .then(res => {
        setData([...newListGames])
        setListGames([...newListGames])
        alert("The game has been deleted")
    }).catch(res => {
      alert("This game can't be deleted")
    })
  }

  const handleSearch = (value) => {
    axios.get(`https://backendexample.sanbersy.com/api/data-game`)
    .then(res => {
      let resGames = res.data.map(el => { 
        return {
          id: el.id, 
          name: el.name, 
          release: el.release,
          genre: el.genre,
          platform: el.platform,
          singlePlayer: el.singlePlayer,
          multiplayer: el.multiplayer,
          image_url: el.image_url
        }
      })
      let filteredGames = resGames.filter(x => x.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
      setData([...filteredGames])
    })
  }
  
  return (
    <>
    <Row>
      <Col span={10}>
          <AutoComplete onSearch={handleSearch}>
            <Input size="medium" placeholder="Game name..."/>
          </AutoComplete>
      </Col>
      <Col span={4}>
        <Title style={{textAlign: "center", fontSize: "30px"}}>
          List Games
        </Title>
      </Col>
      <Col span={10}>
        <Button type="primary" shape="round" style={{float: "right"}}>
          <Link to={`/add-game`}>
            + Add New Game
          </Link>
        </Button>
      </Col>
    </Row>
    <Table columns={columns} dataSource={data} pagination={{pageSize: 5}}/>
    </>
  )
}

export default TableGames