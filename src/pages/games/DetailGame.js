import React, {useContext, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { Col, Row, Typography } from "antd"
import {Link} from "react-router-dom"
import Chip from "@material-ui/core/Chip";
import { UserContext } from "../../context/UserContext"
const {Text, Title} = Typography

const DetailMovie = () => {
  let {id} = useParams()
  const [data, setData] = useState(null)
  const [user, ] = useContext(UserContext)
  
  useEffect(() => {
    if (data === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
      .then(res => {
        setData(res.data)
      })
    }
  }, [data, setData, id]);

  return (
        <>
        {
            data !== null &&
            <>  
              <div style={{display: "inline-flex", fontSize: "18px", width: "100%"}}>
                <img src={data.image_url} alt="movie" width="250px" height="350px" 
                style={{borderImage: "40px", marginRight: "20px"}}/>
                  <div style={{ width: "50%" }}>
                  <Title style={{textAlign: "center", fontSize: "30px"}}>
                        {data.name} ({data.release})
                  </Title>
                    <Row>
                      <Col span={6}><b>Genre</b></Col>
                      <Col span={1}>:</Col>
                      <Col span={17}><Text keyboard>{data.genre}</Text></Col>
                    </Row>
                    <Row>
                      <Col span={6}><b>Game Mode</b></Col>
                      <Col span={1}>:</Col>
                      <Col span={17}>
                      {data.singlePlayer === 1 ? (
                          <Chip size="small" label="Single Player" />
                        ) : null}{" "}
                        {data.multiplayer ? (
                          <Chip size="small" label="Multi Player" />
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6}><b>Platform</b></Col>
                      <Col span={1}>:</Col>
                      <Col span={17}>{data.platform}</Col>
                    </Row>
                    <br/>
                    <Row style={{float: "right"}}>
                      {<button style={{backgroundColor: "white", border: "none"}}>
                      <Link to={`/games`}>Back to List Games</Link>
                      </button>}
                    </Row>
                    <Row>
                      {user && <button style={{backgroundColor: "white", border: "none"}}>
                      <Link to={`/setting-game`}>Back to Setting Game</Link>
                      </button>}
                    </Row>
                  </div>
              </div>

            </>
        }
        </>
    )
}

export default DetailMovie