import PropTypes from 'prop-types'

const style= {
  width: '60px',
  height: '60px',
  margin: 30
}

const Logo = ({ activeClassName }) => (
  <img className={activeClassName} style={style} src="../static/logo.png" />
)

Logo.propTypes = {
  activeClassName: PropTypes.string
}

export default Logo