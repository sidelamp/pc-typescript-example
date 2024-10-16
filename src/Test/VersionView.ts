import { ScriptTypeBase } from "../types/ScriptTypeBase";
import { createScript, attrib } from "../utils/createScriptDecorator";

@createScript("versionView")
class VersionView extends ScriptTypeBase {
    @attrib()
    test: string;

    @attrib({ default: 100, min: 10, max: 100, step: 10, placeholder: ["hp", "hm"] })
    maxHP: number;

    @attrib()
    minHP: number;

    @attrib()
    direction: pc.Vec3;

    @attrib({ default: [.1, .5, .2, 1.0] })
    color: pc.Color;

    initialize() {
        console.log("the test is ", this);
    }
}

export default VersionView;