import React from "react"
import { Layout } from 'antd';

import HeaderLayout from "./Header"
import SiderLayout from "./Sider"
import ContentLayout from "./Content";
import FooterLayout from "./Footer";
import { BrowserRouter } from "react-router-dom";

const Main = () => {
    return (
        <BrowserRouter>
            <Layout style={{minHeight: "100vh"}}>
                <HeaderLayout/>
                    <Layout>
                        <SiderLayout/>
                        <ContentLayout/>
                    </Layout>
                <FooterLayout/>
            </Layout>
        </BrowserRouter>
    )
}

export default Main