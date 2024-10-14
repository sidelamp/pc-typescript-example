import { TJsonAttributeSchemaProp, AttributeSchema } from "../types/attributes";
import { ScriptTypeBase } from "../types/ScriptTypeBase";
import { attrib, createScript } from "../utils/createScriptDecorator";

@createScript("second")
class Second extends ScriptTypeBase {
    @attrib(
        {
            type: AttributeSchema.json,
            schema: [
                {
                    name: "prop",
                    type: AttributeSchema.string,
                    default: ["first", "second", "thrid"],
                    array: true,
                },
                {
                    name: "prop2",
                    type: AttributeSchema.number,
                    default: 1
                }
            ]
        })
    property: TJsonAttributeSchemaProp;

    initialize(): void {
        console.log((this.property as any)["prop2"]);
    }
}

export default Second;