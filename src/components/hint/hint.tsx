import { Link } from 'react-router-dom';
import hintStyles from './hint.module.css';
import { FC } from 'react';

interface IHint {
  paragraphText: string;
  linkPath: string;
  linkText: string;
  needIndent: boolean;
}

const Hint: FC<IHint> = ({ paragraphText, linkPath, linkText, needIndent }) => {
  return (
    <div className={`${hintStyles.container}${needIndent ? " mb-4" : ""}`}>
      <p className={`${hintStyles.text} text text_type_main-default mr-2`}>{paragraphText}</p>
      <Link to={linkPath} className={`${hintStyles.link} text text_type_main-default`}>{linkText}</Link>
    </div>
  )
}

export default Hint;