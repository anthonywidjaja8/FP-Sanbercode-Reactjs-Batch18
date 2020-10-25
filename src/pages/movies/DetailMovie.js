import React, {useContext, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { Col, Row, Typography } from "antd"
import Rating from "@material-ui/lab/Rating"
import {Link} from "react-router-dom"
import { UserContext } from "../../context/UserContext"
const {Text, Title} = Typography

const DetailMovie = () => {
  let {id} = useParams()
  const [data, setData] = useState(null)
  const [user, ] = useContext(UserContext)
  
  useEffect(() => {
    if (data === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
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
                    {data.title} {data.year}
                  </Title>  
                    <Row>
                      <Col span={6}><b>Genre</b></Col>
                      <Col span={1}>:</Col>
                      <Col span={17}><Text keyboard>{data.genre}</Text></Col>
                    </Row>
                    <Row>
                      <Col span={6}><b>Duration</b></Col>
                      <Col span={1}>:</Col>
                      <Col span={17}>{data.duration} minutes</Col>
                    </Row>
                    <Row>
                      <Col span={6}><b>Rating</b></Col>
                      <Col span={1}>:</Col>
                      <Col span={17}><Rating
                        name="read-only"
                        value={data.rating ? data.rating : 0}
                        max={10}
                        readOnly
                      />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6}><b>Description</b></Col>
                      <Col span={1}>:</Col>
                      <Col span={17}>{data.description}</Col>
                    </Row>
                    <Row>
                      <Col span={6}><b>Review</b></Col>
                      <Col span={1}>:</Col>
                      <Col span={17}><i>{data.review}</i></Col>
                    </Row>
                    <br/>
                    <Row style={{float: "right"}}>
                      {<button style={{backgroundColor: "white", border: "none"}}>
                      <Link to={`/movies`}>Back to List Movies</Link>
                      </button>}
                    </Row>
                    <Row>
                      {user && <button style={{backgroundColor: "white", border: "none"}}>
                      <Link to={`/setting-movie`}>Back to Setting Movie</Link>
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