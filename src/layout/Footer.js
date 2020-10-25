import React from "react"
import { Layout } from 'antd';
const { Footer } = Layout;

class FooterLayout extends React.Component {
    render() {
        return (
            <Footer style={{textAlign: "center"}}>Copyright &copy; 2020 by Anthony Widjaja</Footer>
        )
    }
}

export default FooterLayout