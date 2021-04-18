import { defineComponent, h, ref } from '@vue/runtime-core';
import mapImg from '../../assets/map.jpg';
import { game } from '../Game';

export default defineComponent({
  setup(props, ctx) {
    const viewHeight = 1080;
    const mapY1 = ref(0);
    const mapY2 = ref(-viewHeight);

    // pixi.js自己带有的事件轮询，比单纯的使用interval来的好
    const speed = 5;
    game.ticker.add(() => {
      mapY1.value += speed;
      mapY2.value += speed;

      if (mapY1.value >= viewHeight) {
        mapY1.value = -viewHeight;
      }
      if (mapY2.value >= viewHeight) {
        mapY2.value = -viewHeight;
      }
    });

    return {
      mapY1,
      mapY2,
    };
  },
  render(ctx) {
    return h('Container', [
      h('Sprite', { texture: mapImg, y: ctx.mapY1 }),
      h('Sprite', { texture: mapImg, y: ctx.mapY2 }),
    ]);
  },
});
