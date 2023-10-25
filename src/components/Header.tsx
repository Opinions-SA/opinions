import { Streaming } from '../interface/Streaming';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import '../styles/Header.css'

const imageUrl = import.meta.env.VITE_IMG;

interface HeaderProps {
    streaming: Streaming;
    onPreviousFilm: () => void;
    onNextFilm: () => void;
  }
  

  const Header = ({ streaming , onNextFilm, onPreviousFilm }: HeaderProps) => {
  return (
    <div className='stream-container'>
        <Link to={streaming ? `/${streaming.media_type}/${streaming.id}` : '#'}>
            {streaming && streaming.poster_path && (
              <img className="header-stream-image" src={imageUrl + streaming.poster_path} alt={streaming.title} />
            )}
        </Link>
          <div className='header-bottom-container'>
            <div className='header-botons'>
              <button onClick={onPreviousFilm}><AiOutlineArrowLeft/></button>
              <button onClick={onNextFilm}><AiOutlineArrowRight/></button>
            </div>
          </div>
    </div>
  )
}

export default Header