import { ScriptTypeBase } from "../types/ScriptTypeBase";
import { createScript, attrib } from "../utils/createScriptDecorator";

@createScript("versionView")
class VersionView extends ScriptTypeBase {
    @attrib({ type: "number", default: 100 })
    test: number;

    initialize() {
        console.log("hello! ", this.test);
    }

    postInitialize(): void {
        console.log("post");
    }
}

export default VersionView;