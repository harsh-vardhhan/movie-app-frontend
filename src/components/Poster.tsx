import React, { useState } from 'react';
import { Typography } from 'antd';
import { PictureOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface PosterProps {
    src?: string;
    title: string;
    style?: React.CSSProperties;
    className?: string;
}

export const Poster: React.FC<PosterProps> = ({ src, title, style, className }) => {
    const [error, setError] = useState(false);

    // Generate a deterministic color based on the title
    const getColor = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
        return '#' + '00000'.substring(0, 6 - c.length) + c;
    };

    const backgroundColor = getColor(title);

    // Check if color is too light, if so use dark text, else light text
    // Simple heuristic: invert or just use white/black.
    // For simplicity, let's just use a dark overlay or similar.
    // Actually, let's just stick to a nice preset palette if dynamic is too risky, 
    // but random hex is fun.

    const styles: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: error || !src ? backgroundColor : 'transparent',
        flexDirection: 'column',
        padding: 8,
        textAlign: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        ...style,
    };

    if (!src || error) {
        return (
            <div style={styles} className={className}>
                {/* Darken the background a bit with a gradient for readability */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3))'
                }} />
                <PictureOutlined style={{ fontSize: 32, color: 'rgba(255,255,255,0.8)', marginBottom: 8, zIndex: 1 }} />
                <Text style={{ color: 'white', fontWeight: 'bold', zIndex: 1, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    {title}
                </Text>
            </div>
        );
    }

    return (
        <img
            alt={title}
            src={src}
            style={styles}
            className={className}
            onError={() => setError(true)}
        />
    );
};
