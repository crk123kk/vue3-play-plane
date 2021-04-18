import { Application } from 'pixi.js';

// set up canvas
export const game = new Application({
  width: 750,
  height: 1080,
});

// console.log('game :>> ', game);

document.body.append(game.view);

export function getRootContainer() {
  return game.stage;
}
