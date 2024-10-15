import { AttributeSchema } from "../types/attributes";
import { ScriptTypeBase } from "../types/ScriptTypeBase";
import { createScript, attrib } from "../utils/createScriptDecorator";

@createScript("versionView")
class VersionView extends ScriptTypeBase {
    @attrib({ type: AttributeSchema.number, default: 100 })
    test: number;

    initialize() {
        console.log("the test is ", this.test);
    }
}

export default VersionView;