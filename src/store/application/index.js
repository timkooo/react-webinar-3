import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Application extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      appLanguage: 'EN'
    }
  }

  setAppLanguage(lang) {
    this.setState({
      ...this.getState(),
      appLanguage: lang
    })
  }
}

export default Application;
