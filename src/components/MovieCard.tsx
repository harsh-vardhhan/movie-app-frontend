import React from 'react';
import { Card, Rate, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { MovieList } from '../types';


const { Meta } = Card;
const { Text } = Typography;

interface MovieCardProps {
    movie: MovieList;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const navigate = useNavigate();

    return (
        <Card
            className="movie-card"
            hoverable
            cover={
                movie.poster_path ? (
                    <img
                        alt={movie.title}
                        src={movie.poster_path}
                        style={{ height: 300, objectFit: 'cover' }}
                    />
                ) : null
            }
            onClick={() => navigate(`/movies/${movie.id}`)}
            variant="borderless"
            styles={{ body: { padding: '16px' } }}
        >
            <Meta
                title={<div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{movie.title}</div>}
                description={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text type="secondary" style={{ fontSize: 13 }}>{movie.release_year}</Text>
                            {movie.vote_average !== undefined && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Rate disabled defaultValue={movie.vote_average / 2} allowHalf style={{ fontSize: 12, color: '#fadb14' }} />
                                    <Text style={{ fontSize: 12, color: '#fadb14' }}>{movie.vote_average.toFixed(1)}</Text>
                                </div>
                            )}
                        </div>
                        <div style={{ marginTop: 4 }}>
                            {movie.genres.slice(0, 2).map((g) => (
                                <Tag key={g.id} color="rgba(255,255,255,0.1)" style={{ border: 'none', color: '#999', fontSize: 11, marginRight: 4 }}>
                                    {g.name}
                                </Tag>
                            ))}
                        </div>
                    </div>
                }
            />
        </Card>
    );
};
