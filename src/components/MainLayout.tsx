import React from 'react';
import { Layout, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const MainLayout: React.FC = () => {

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header className="glass-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <Title level={3} style={{ color: 'white', margin: 0, background: 'linear-gradient(45deg, #1890ff, #00d2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }}>
                        MovieDB
                    </Title>
                </Link>
            </Header>
            <Content style={{ padding: '24px', marginTop: 0 }}>
                <div className="site-layout-content" style={{ minHeight: 380 }}>
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                MovieDB Created with Bun + Vite + Antd
            </Footer>
        </Layout>
    );
};
