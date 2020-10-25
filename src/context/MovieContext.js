import React, { useState, useEffect, createContext } from "react"
import axios from "axios"

export const MovieContext = createContext()

export const MovieProvider = props => {

    const [listMovies, setListMovies] =  useState(null)

    useEffect(() => {
        if (listMovies === null){
          axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
          .then(res => {
              setListMovies(res.data.map(el => { 
                return {
                    id: el.id, 
                    title: el.title, 
                    year: el.year, 
                    genre: el.genre, 
                    duration: el.duration, 
                    rating: el.rating, 
                    description: el.description, 
                    review: el.review,
                    image_url: el.image_url
                }
            }))
          })
        }
      }, [listMovies])

    const [input, setInput] = useState({
        title: "", 
        year: 2020, 
        duration: 120, 
        genre: "",
        rating: 0, 
        description: "", 
        review: "",
        image_url: "", 
        id: null
    })

    return (
        <MovieContext.Provider value={[listMovies, setListMovies, input, setInput]}>
            {props.children}
        </MovieContext.Provider>
    )
} 