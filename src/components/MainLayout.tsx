import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const MainLayout: React.FC = () => {
    const location = useLocation();

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header className="glass-header" style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
                <Title level={3} style={{ color: 'white', margin: 0, marginRight: 24, background: 'linear-gradient(45deg, #1890ff, #00d2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    MovieDB
                </Title>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    style={{ background: 'transparent', borderBottom: 'none', minWidth: 200 }}
                    items={[
                        {
                            key: '/',
                            icon: <HomeOutlined />,
                            label: <Link to="/">Discover</Link>,
                        },
                    ]}
                />
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
