import {memo} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';
import { glossary } from '../../utils';

function Translator({token}) {
  const appLanguage = useSelector(state => state.application.appLanguage);
  const translatedToken = glossary[appLanguage].values[token];

  return <>
  { translatedToken ? translatedToken : token }
  </>
}

export default memo(Translator);
