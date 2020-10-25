import React, { useContext } from "react"
import { Layout, Menu } from 'antd';
import { 
    UserOutlined, 
    LoginOutlined,
    UnlockOutlined,
    LogoutOutlined,
    PlaySquareOutlined,
    UnorderedListOutlined,
    FormOutlined, 
    RocketOutlined } from '@ant-design/icons';
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderLayout = () => {
    const [user, setUser] = useContext(UserContext)

    const handleLogout = () =>{
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <Sider width={200} id="sider" style={{ position: 'fixed', zIndex: "2", height: "100%" }}>
        {
            <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
                {!user && <Menu.Item key="1" icon={<LoginOutlined />}>
                    <Link to="/login">Login</Link>
                </Menu.Item>}
                {user && <Menu.Item key="2" icon={<UnlockOutlined />}>
                    <Link to="/change-password">Change Password</Link>
                </Menu.Item>}
                {user && <Menu.Item key="3" icon={<LogoutOutlined />}>
                    <Link onClick={handleLogout}>Logout</Link>
                </Menu.Item>}
            </SubMenu>
            <SubMenu key="sub2" icon={<PlaySquareOutlined />} title="Movies">
                <Menu.Item key="4" icon={<UnorderedListOutlined />}>
                    <Link to="/movies">List Movies</Link>
                </Menu.Item>
                {user && <Menu.Item key="5" icon={<FormOutlined />}>
                    <Link to="/setting-movie">Setting Movie</Link>
                </Menu.Item>}
            </SubMenu>
            <SubMenu key="sub3" icon={<RocketOutlined />} title="Games">
                <Menu.Item key="6" icon={<UnorderedListOutlined />}>
                    <Link to="/games">List Games</Link>
                </Menu.Item>
                {user && <Menu.Item key="7" icon={<FormOutlined />}>
                    <Link to="/setting-game">Setting Game</Link>
                </Menu.Item>}
            </SubMenu>
            </Menu>
        }
    </Sider>
    )
}

export default SiderLayout