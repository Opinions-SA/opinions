import { useEffect, useState } from 'react';
import { Streaming } from '../../interface/Streaming';
import { Link } from 'react-router-dom';

import './Header.css';

const baseUrl = import.meta.env.VITE_IMG;

interface HeaderProps {
  streaming: Streaming[];
}

const Header = ({ streaming }: HeaderProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % streaming.length);
    }, 10000);

    return () => clearInterval(intervalId); // Limpar o intervalo quando o componente é desmontado
  }, [streaming]);

  if (streaming.length === 0) {
    return <p>Carregando...</p>;
  }

  const currentImage = streaming[currentImageIndex];

  return (
    <div className='stream-container' style={{ width: '100%', maxHeight: '800px', objectFit: 'cover' }}>
      <Link to={currentImage ? `/${currentImage.media_type}/${currentImage.id}` : '#'}>
        {currentImage && currentImage.backdrop_path && (
          <img
            className="header-stream-image"
            src={`${baseUrl}${currentImage.backdrop_path}`}
            alt={currentImage.title}
            style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }}
          />
        )}
      </Link>
    </div>
  );
};

export default Header;