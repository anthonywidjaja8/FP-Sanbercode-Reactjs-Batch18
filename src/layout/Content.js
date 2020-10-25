import React, { useContext } from "react"
import { Layout } from 'antd';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ChangePassword from "../pages/ChangePassword"
import ListMovies from "../pages/movies/ListMovies";
import DetailMovie from "../pages/movies/DetailMovie";
import ListGames from "../pages/games/ListGames";
import DetailGame from "../pages/games/DetailGame";
import EditorMovie from "../pages/movies/EditorMovie"
import EditorGame from "../pages/games/EditorGame";
import TableMovies from "../pages/movies/TableMovies";
import TableGames from "../pages/games/TableGames";
const { Content } = Layout;

const ContentLayout = () => {
    const [user] = useContext(UserContext)
    
    const LoginRoute = ({user, ...props }) =>
    user ? <Redirect to="/" /> : <Route {...props} />;

    return (
        <Layout style={{ padding: '24px 24px 0 24px' }}>
        <Content id="content">
            <Switch>
                <Route exact path="/" component={Home}/>

                <Route exact path="/movies" component={ListMovies}/>
                <Route exact path="/movies/:id" component={DetailMovie}/>
                
                <Route exact path="/games" component={ListGames}/>
                <Route exact path="/games/:id" component={DetailGame}/>
                
                {user && <Route exact path="/add-movie" component={EditorMovie}/>}
                {user && <Route exact path="/edit-movie/:id" component={EditorMovie}/>}
                {user && <Route exact path="/setting-movie" component={TableMovies}/>}
                
                {user && <Route exact path="/add-game" component={EditorGame}/>}
                {user && <Route exact path="/edit-game/:id" component={EditorGame}/>}
                {user && <Route exact path="/setting-game" component={TableGames}/>}
                
                <LoginRoute exact path="/login" user={user} component={Login}/>
                <LoginRoute exact path="/register" user={user} component={Register}/>
                <Route exact path="/change-password" component={ChangePassword}/>
            </Switch>
        </Content>
    </Layout>
    )
}

export default ContentLayout