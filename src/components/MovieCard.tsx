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
            styles={{ body: { padding: '16px', background: 'transparent' } }}
        >
            <Meta
                title={
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {movie.title}
                    </div>
                }
                description={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>{movie.release_year}</Text>
                            {movie.vote_average !== undefined && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(250, 219, 20, 0.1)', padding: '2px 6px', borderRadius: 4 }}>
                                    <Rate disabled defaultValue={1} count={1} style={{ fontSize: 13, color: '#fadb14' }} />
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#fadb14' }}>{movie.vote_average.toFixed(1)}</Text>
                                </div>
                            )}
                        </div>
                        <div style={{ marginTop: 2, height: 22, overflow: 'hidden' }}>
                            {movie.genres.slice(0, 2).map((g) => (
                                <Tag key={g.id} bordered={false} style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: 11, marginRight: 6 }}>
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
