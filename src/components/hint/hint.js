import { Link } from 'react-router-dom';
import hintStyles from './hint.module.css';
import PropTypes from 'prop-types';

function Hint({ paragraphText, linkPath, linkText, needIndent }) {
  return (
    <div className={`${hintStyles.container}${needIndent ? " mb-4" : ""}`}>
      <p className={`${hintStyles.text} text text_type_main-default mr-2`}>{paragraphText}</p>
      <Link to={linkPath} className={`${hintStyles.link} text text_type_main-default`}>{linkText}</Link>
    </div>
  )
}

Hint.propTypes = {
  paragraphText: PropTypes.string.isRequired,
  linkPath: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  needIndent: PropTypes.bool.isRequired
}

export default Hint;