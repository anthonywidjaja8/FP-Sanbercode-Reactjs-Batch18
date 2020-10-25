import React, { useContext } from "react"
import { MovieContext } from "../../context/MovieContext"
import { List, Card } from "antd"
import { Link } from "react-router-dom"
const {Meta} = Card

const ListMovies = () => {
    const [listMovies, , ,] = useContext(MovieContext)

    return(
        <>
        {
            listMovies !== null &&                
            <List
                grid={{ gutter: 20, column: 4 }}
                dataSource={listMovies}
                renderItem={item => (
                    <List.Item>
                        <Card hoverable
                            cover={<img alt={item.id} src={item.image_url} width="150px" height="300px" />}>
                                <Meta title={item.title}/>
                                <br/>
                                <div>
                                    {item.year}
                                    {<button style={{backgroundColor: "white", border: "none", float: "right"}}>
                                    <Link to={`/movies/${item.id}`}>View More</Link>
                                    </button>}
                                </div>
                        </Card>
                    </List.Item>
                )}
            />
        }
        </>
    )
}

export default ListMovies 