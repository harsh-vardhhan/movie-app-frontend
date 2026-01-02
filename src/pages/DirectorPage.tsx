import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Typography, Row, Col, Spin, Button, Divider, List, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { fetchDirectorById } from '../api/endpoints';


const { Title, Text, Paragraph } = Typography;

export const DirectorPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: director, isLoading } = useQuery({
        queryKey: ['director', id],
        queryFn: () => fetchDirectorById(id!),
        enabled: !!id,
    });

    if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}><Spin size="large" /></div>;
    if (!director) return <div>Director not found</div>;

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>Back</Button>
            <Row gutter={[32, 32]}>
                {director.profile_path ? (
                    <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                        <img
                            alt={director.name}
                            src={director.profile_path}
                            style={{ width: '100%', maxWidth: 300, borderRadius: 8 }}
                        />
                    </Col>
                ) : null}
                <Col xs={24} md={director.profile_path ? 16 : 24}>
                    <Title level={2}>{director.name}</Title>
                    {director.birthday && (
                        <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
                            Born: {director.birthday} {director.place_of_birth && `in ${director.place_of_birth}`}
                        </Text>
                    )}
                    <Divider />
                    <Title level={4}>Biography</Title>
                    <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}>
                        {director.biography || 'No biography available.'}
                    </Paragraph>

                    <Title level={4}>Filmography</Title>
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
                        dataSource={director.movies}
                        renderItem={(movie) => (
                            <List.Item>
                                <Card
                                    size="small"
                                    hoverable
                                    onClick={() => navigate(`/movies/${movie.id}`)}
                                    cover={
                                        movie.poster_path ? (
                                            <img
                                                alt={movie.title}
                                                src={movie.poster_path}
                                                style={{ height: 150, objectFit: 'cover' }}
                                            />
                                        ) : null
                                    }
                                >
                                    <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {movie.title}
                                    </div>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {movie.release_year}
                                    </Text>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    );
};
