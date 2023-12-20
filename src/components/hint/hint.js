import { Link } from 'react-router-dom';
import hintStyles from './hint.module.css';

function Hint({ paragraphText, path, linkText }) {
  <div className={hintStyles.container}>
    <p className={hintStyles.text}>{paragraphText}</p>
    <Link to={path} className={hintStyles.link}>{linkText}</Link>
  </div>
}

export default Hint;