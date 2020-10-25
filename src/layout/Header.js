import React, { useContext } from "react"
import { Layout, Menu } from 'antd';
import logo from "../resources/img/logo.png"
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { HomeOutlined, 
    PlaySquareOutlined, 
    RocketOutlined, 
    LoginOutlined,
    UserAddOutlined, 
    LogoutOutlined
} from '@ant-design/icons';
const { Header } = Layout;

const HeaderLayout = () => {
    const [user, setUser] = useContext(UserContext)
    const handleLogout = () =>{
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <Header className="header" style={{ position: 'fixed', zIndex: "100", width: "100%"}}>
            <img className="logo" alt="logo" src={logo}/>
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1" icon={<HomeOutlined/>}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<PlaySquareOutlined/>}>
                    <Link to="/movies">Movies</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<RocketOutlined/>}>
                    <Link to="/games">Games</Link>
                </Menu.Item>
                { user === null &&
                    <Menu.Item key="4" icon={<UserAddOutlined/>} style={{float:"right"}}>
                        <Link to="/register">Register</Link>
                    </Menu.Item>
                }
                { user === null &&           
                    <Menu.Item key="5" icon={<LoginOutlined/>} style={{float:"right"}}>
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                }
                { user && 
                    <Menu.Item key="6" icon={<LogoutOutlined/>} style={{float:"right"}}>
                        <Link to="/login" onClick={handleLogout}>Logout</Link>
                    </Menu.Item>
                }
            </Menu>
        </Header>
    )
}

export default HeaderLayout