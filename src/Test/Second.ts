import { TJsonAttributeSchemaProp } from "../types/attributes";
import { ScriptTypeBase } from "../types/ScriptTypeBase";
import { attrib, createScript } from "../utils/createScriptDecorator";

@createScript("second")
class Second extends ScriptTypeBase {
    @attrib(
        {
            type: "json",
            schema: [
                {
                    name: "prop",
                    type: "string",
                    default: ["first", "second", "thrid"],
                    array: true,
                },
                {
                    name: "prop2",
                    type: "number",
                    default: 1
                }
            ]
        })
    property: TJsonAttributeSchemaProp;

    initialize(): void {
        console.log((this.property as any)["prop"]);
    }
}

export default Second;