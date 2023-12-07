import {memo} from "react";
import './style.css';
import { glossary } from '../../utils';
import useSelector from '../../store/use-selector';
import useStore from "../../store/use-store";

function LangSwitcher() {
  const store = useStore();
  const appLanguage = useSelector(state => state.application.appLanguage);

  const handleLanguageChange = (evt) => {
    const { value } = evt.target;
    store.actions.application.setAppLanguage(value);
  }

  return (
    <select name="language" onChange={(evt) => handleLanguageChange(evt)} value={appLanguage}>
      {Object.keys(glossary).map((key) => (
        <option key={key} value={key}>{glossary[key].name}</option>
      ))}
    </select>
  )
}

export default memo(LangSwitcher);
