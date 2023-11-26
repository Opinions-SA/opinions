import  backOpinions  from '../../../public/OPINIONS.png';

import "./Header.css";

const Header = () => {

  return (
    <div className='stream-container'>
        <img src={backOpinions} style={{ width: '100%', height: 'auto' }}/>
    </div>
  );
};

export default Header;
