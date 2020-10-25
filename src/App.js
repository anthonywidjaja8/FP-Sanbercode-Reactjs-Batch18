import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Main from "./layout/Main"
import {UserProvider} from "./context/UserContext"
import {MovieProvider} from "./context/MovieContext"
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <UserProvider>
      <MovieProvider>
      <GameProvider>
        <Main/>
      </GameProvider>
      </MovieProvider>
    </UserProvider>
  )
}

export default App;
