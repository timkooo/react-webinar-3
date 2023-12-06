import {memo} from "react";
import PropTypes from "prop-types";
import Translator from "../translator";
import './style.css';

function Head({title}) {
  return (
    <div className='Head'>
      <h1><Translator token={title}/></h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
