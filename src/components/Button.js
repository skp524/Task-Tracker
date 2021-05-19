import PropTypes from 'prop-types'

const Button = ({title,color,onClick}) => {
  return <button
  style={{backgroundColor:color}}
  onClick={onClick}
  className='btn'
  >
    {title}
  </button>
}
Button.defaultProps={
  color:'blue'
}
Button.propTypes={
  title:PropTypes.string,
  color:PropTypes.string,
  onClick:PropTypes.func,
}
export default Button;
