# Playcanvas typescript example

Forum post - https://forum.playcanvas.com/t/example-template-project-with-typescript/25272

## Setup

- Install dependencies `npm i`
- Copy `.pcconfig` to your home directory e.g.
  - windows - `C:/Users/<username>`
  - macos - `/Users/<username>`
- Copy `pcconfig.example.json` and rename to `pcconfig.json`. This file is needed to configure playcanvas-sync to sync script files to correct playcanvas project.
- In `pcconfig.json` using [playcanvas-sync guide](https://github.com/playcanvas/playcanvas-sync#config-variables) fill this environment variables
  - `PLAYCANVAS_API_KEY`
  - `PLAYCANVAS_BRANCH_ID`
  - `PLAYCANVAS_PROJECT_ID`

## npm scripts

| Command                 | Description                      |
| ----------------------- | -------------------------------- |
| `npm run build:debug`   | Development build                |
| `npm run build:release` | Production build                 |
| `npm run push`          | `push` to playcanvas.com project |

## Conventions

Scripts preferable structure

```ts
import { ScriptTypeBase } from "../types/ScriptTypeBase";
import { createScript, attrib } from "../utils/createScriptDecorator";

// consts here
const defaultAmmoCount = 30;

@createScript("shooting")
class Shooting extends ScriptTypeBase {
  // attributes
  @attrib({ default: true })
  autoReload: boolean;

  @attrib()
  fireButton: number;

  @attrib({
    default: 1,
    min: 0.01,
    description: "Reload time in seconds",
    placeholder: "sec",
  })
  reloadTime: number;

  // local properties
  isReloading: boolean = false;

  // methods
  onInitialize() {} // when obj init first time
  onDestroy() {} // when obj destroying
  onEnable() {} // when obj enabled
  onDisable() {} // when obj disabled
}

// default export at the end
export default Shooting;
```
