import { createRenderer } from '@vue/runtime-core';
import { Container, Graphics, Sprite, Text, Texture } from 'pixi.js';

const renderer = createRenderer({
  createElement(type) {
    // console.log(type);

    let element;
    // if (type === 'rect') {
    //   element = new Graphics();
    //   element.beginFill(0xff0000);
    //   element.drawRect(0, 0, 500, 500);
    //   element.endFill();
    // } else if (type === 'circle') {
    //   element = new Graphics();
    //   element.beginFill(0xffff00);
    //   element.drawCircle(0, 0, 50);
    //   element.endFill();
    // }
    switch (type) {
      case 'Container':
        element = new Container();
        break;
      case 'Sprite':
        element = new Sprite();
        break;
    }

    return element;
  },

  setElementText(node, text) {
    const cText = new Text(text);
    node.addChild(cText);
  },

  createText(text) {
    return new Text(text);
  },

  patchProp(el, key, preValue, nextValue) {
    switch (key) {
      case 'texture':
        el.texture = Texture.from(nextValue);
        break;
      case 'onClick':
        el.on('pointertap', nextValue);
        break;
      default:
        el[key] = nextValue;
        break;
    }
  },

  insert(el, parent) {
    // console.log('el :>> ', el);
    // console.log('parent :>> ', parent);
    parent.addChild(el);
  },

  // 处理注释
  createComment() {},
  //获取父节点
  parentNode() {},
  // 获取兄弟节点
  nextSibling() {},
  //删除节点时调用
  remove(el) {
    const parent = el.parent;
    if (parent) {
      parent.removeChild(el);
    }
  },
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
