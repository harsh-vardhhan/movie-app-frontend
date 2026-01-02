import React, { useState } from 'react';
import { Typography, Row, Col, Spin, Pagination, Input, Select, Space } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies, fetchGenres } from '../api/endpoints';
import { MovieCard } from '../components/MovieCard';
// import { useDebounce } from '../hooks/useDebounce';

const { Title, Text } = Typography;
const { Search } = Input;

export const HomePage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState<string | undefined>(undefined);

    // Simple debounce via timeout if I don't want to create a hook yet, 
    // but building a hook is better.
    // For now I'll just search on Enter/Search click for simplicity unless I add the hook.
    // Let's assume standard behavior: search triggers on enter/click.

    const { data: moviesData, isLoading: isLoadingMovies } = useQuery({
        queryKey: ['movies', page, genre, search],
        queryFn: () => fetchMovies(page, genre, search),
    });

    const { data: genres } = useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres,
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleGenreChange = (value: string) => {
        setGenre(value);
        setPage(1);
    };

    // Helper to handle mixed API responses (Array vs Paginated Object)
    const movies = Array.isArray(moviesData) ? moviesData : (moviesData as any)?.data || [];
    const totalMovies = Array.isArray(moviesData) ? 0 : (moviesData as any)?.total || 0;

    return (
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
                <div>
                    <Title level={1} style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(90deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Discover
                    </Title>
                    <Text type="secondary">Explore various movies, actors, and directors.</Text>
                </div>

                <Space wrap size="middle">
                    <Select
                        placeholder="Genre"
                        allowClear
                        size="large"
                        style={{ width: 160 }}
                        onChange={handleGenreChange}
                        options={genres?.map(g => ({ label: g.name, value: g.name }))}
                        styles={{ popup: { root: { background: '#1f1f1f', border: '1px solid #303030' } } }}
                    />
                    <Search
                        placeholder="Search..."
                        onSearch={handleSearch}
                        size="large"
                        style={{ width: 300 }}
                        allowClear
                        enterButton
                    />
                </Space>
            </div>

            {isLoadingMovies ? (
                <div style={{ display: 'flex', justifyContent: 'center', height: 400, alignItems: 'center' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Row gutter={[24, 24]}>
                        {(movies as any[]).map((movie) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={movie.id}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>
                    {totalMovies > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                            {/* Note: The mock API response type said List[MovieList]. 
                             Does it have pagination metadata? 
                             The PaginatedResponse interface I wrote has it. 
                             But fetchMovies endpoints return Promise<MovieList[]> currently due to how I wrote it? 
                             Wait, I should check my endpoints.ts again.
                             */}
                            <Pagination
                                current={page}
                                onChange={setPage}
                                total={totalMovies}
                                pageSize={10} // Assuming 10, should read from API if possible
                                showSizeChanger={false}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
