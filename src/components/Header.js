import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import Button from './Button';

const Header =({title,onClick,showAddTask})=> {
  const location=useLocation();
  return (
    <div className='header'>
   <h1  >{title} </h1>
  {location.pathname==='/' &&
   <Button title={showAddTask?"Close":"Add"} color={showAddTask?"red":"green"} onClick={onClick}/>  
  } </div>
  )
}
Header.defaultProps={
  title:"Task Tracker"
}
Header.propTypes={
  title:PropTypes.string.isRequired
}

export default Header;
