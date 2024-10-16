import { ScriptTypeBase } from "../types/ScriptTypeBase";
import { createScript, attr } from "../utils/createScriptDecorator";

@createScript("versionView")
class VersionView extends ScriptTypeBase {
    @attr()
    test: string;

    @attr({ default: 100, min: 10, max: 100, step: 10, placeholder: ["hp", "hm"] })
    maxHP: number;

    @attr()
    minHP: number;

    initialize() {
        console.log("the test is ", this);
    }
}

export default VersionView;