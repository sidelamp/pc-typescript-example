import { TJsonAttributeSchemaProp } from "../types/attributes";
import { ScriptTypeBase } from "../types/ScriptTypeBase";
import { attrib, createScript } from "../utils/createScriptDecorator";

@createScript("second")
class Second extends ScriptTypeBase {
    @attrib({
        type: "json",
        schema: [
            {
                name: "kek",
                type: "string",
                default: "loh",
            }]
    })
    property: TJsonAttributeSchemaProp;

    initialize(): void {
        console.log(this.property);
    }
}

export default Second;