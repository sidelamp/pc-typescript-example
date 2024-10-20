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

@createScript("Player")
class Player extends ScriptBase {
  // attributes
  @attrib()
  public maxHP: number;

  @attrib({ min: 0 })
  public minHP: number;

  // methods
  onInitialize() {} // when obj init first time
  onDestroy() {} // when obj destroying
  onEnable() {} // when obj enabled
  onDisable() {} // when obj disabled
}

@createScript("somePopup")
class SomePopup extends PopupBase {
  onInitialize() {
    this.onInitialize();
  }
}

// default export at the end
export default Player;
```

Class inheritance

```ts
import { ScriptTypeBase } from "../types/ScriptTypeBase";
import { createScript, attrib } from "../utils/createScriptDecorator";

abstract class PopupBase extends ScriptBase {
  // attributes
  @attrib()
  isShow: boolean;

  // or u can use
  // @attrib({default: true, title: "show on initialize"})
  // isShow: boolean;

  // methods
  onInitialize() {// when obj init first time
    this.entity.enabled = this.isShow;
  }
  onDestroy() {} // when obj destroying
  onEnable() {} // when obj enabled
  onDisable() {} // when obj disabled

  public show(){
    this.entity.enabled = true;
  }

  public close(){
    this.entity.enabled = false;
  }
}

@createScript("somePopup")
class SomePopup extends PopupBase {
  onInitialize(){
    this.onInitialize();
  }
}

export SomePopup;
```

Use tween

```ts
// tween scale entity
this.entity
  .tween(this.entity.getLocalScale())
  .to({ x: 1.5, y: 1.5, z: 1.5 }, 0.25, pc.BackInOut)
  .start();

// tween width, height and opacity
let element = {
  width: 100,
  height: 100,
  opacity: .5
};

this.entity
  .tween(this.entity.element)
  .to(element, properties.duration, pc.Linear)
  .start();
```
