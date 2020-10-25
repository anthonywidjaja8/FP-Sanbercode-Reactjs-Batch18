import React, { useState, useEffect, createContext } from "react"
import axios from "axios"

export const GameContext = createContext()

export const GameProvider = props => {

    const [listGames, setListGames] =  useState(null)

    useEffect(() => {
        if (listGames === null){
          axios.get(`https://backendexample.sanbersy.com/api/data-game`)
          .then(res => {
              setListGames(res.data.map(el => { 
                return {
                    id: el.id, 
                    name: el.name, 
                    genre: el.genre, 
                    singlePlayer: el.singlePlayer, 
                    multiPlayer: el.multiPlayer, 
                    platform: el.platform, 
                    release: el.release, 
                    image_url: el.image_url
                }
            }))
          })
        }
      }, [listGames])

    const [input, setInput] = useState({
        name: "", 
        genre: "", 
        singlePlayer: 1, 
        multiPlayer: 0, 
        platform: "",
        release: "", 
        image_url: "", 
        id: null
    })

    return (
        <GameContext.Provider value={[listGames, setListGames, input, setInput]}>
            {props.children}
        </GameContext.Provider>
    )
} 