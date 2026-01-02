import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Typography, Row, Col, Spin, Tag, Rate, Button, Divider, Avatar, List, Space } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { fetchMovieById } from '../api/endpoints';

const { Title, Text, Paragraph } = Typography;

export const MovieDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: movie, isLoading } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => fetchMovieById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Spin size="large" /></div>;
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24, border: 'none', background: 'transparent', color: '#fff', fontSize: 16 }}>
                Back
            </Button>

            <div style={{ background: '#1f1f1f', borderRadius: 16, padding: 32, border: '1px solid #303030' }}>
                <Row gutter={[48, 32]}>
                    <Col xs={24} md={10}>
                        {movie.poster_path && (
                            <img
                                alt={movie.title}
                                src={movie.poster_path}
                                style={{ width: '100%', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                            />
                        )}
                    </Col>
                    <Col xs={24} md={14}>
                        <Title level={1} style={{ fontSize: '2.5rem', marginBottom: 8 }}>{movie.title}</Title>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
                            {movie.release_year && (
                                <Tag color="blue" style={{ fontSize: 14, padding: '4px 8px' }}>{movie.release_year}</Tag>
                            )}
                            {movie.vote_average !== undefined && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Rate disabled defaultValue={movie.vote_average / 2} allowHalf style={{ color: '#fadb14' }} />
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fadb14' }}>{movie.vote_average.toFixed(1)}</Text>
                                </div>
                            )}
                        </div>

                        <Divider style={{ borderColor: '#444' }} />

                        <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>
                            {movie.overview}
                        </Paragraph>

                        <Divider style={{ borderColor: '#444' }} />

                        <div style={{ marginBottom: 16 }}>
                            <Text type="secondary" style={{ display: 'block', marginBottom: 8, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Genres</Text>
                            <Space size={[0, 8]} wrap>
                                {movie.genres.map((g) => (
                                    <Tag key={g.id} style={{ background: 'transparent', border: '1px solid #555', color: '#ccc' }}>{g.name}</Tag>
                                ))}
                            </Space>
                        </div>

                        <Title level={4} style={{ marginTop: 24, fontSize: 18 }}>Director</Title>
                        {movie.director && (
                            <div
                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: 8 }}
                                onClick={() => navigate(`/directors/${movie.director!.id}`)}
                            >
                                <Avatar size={48} icon={<UserOutlined />} src={movie.director.profile_path} />
                                <div style={{ marginLeft: 12 }}>
                                    <Text strong style={{ fontSize: 16 }}>{movie.director.name}</Text>
                                </div>
                            </div>
                        )}

                        <Title level={4} style={{ marginTop: 32, fontSize: 18 }}>Cast</Title>
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={movie.cast ? movie.cast.slice(0, 6) : []}
                            renderItem={(actor) => (
                                <List.Item>
                                    <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/actors/${actor.id}`)}>
                                        <Avatar size={64} src={actor.profile_path} icon={<UserOutlined />} style={{ marginBottom: 8, border: '2px solid #333' }} />
                                        <div style={{ fontSize: 14, fontWeight: 500 }}>{actor.name}</div>
                                        <Text type="secondary" style={{ fontSize: 12 }}>{actor.character}</Text>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
};
