import { defineComponent, h } from '@vue/runtime-core';

import startPageImg from '../../assets/start_page.jpg';
import startBtnImg from '../../assets/startBtn.png';

export default defineComponent({
  setup(props, ctx) {
    // 没有this，用ctx代替
    // 作为vue3的入口函数
    const onClick = () => {
      // console.log('click');
      ctx.emit('changePage', 'GamePage');
    };
    return {
      onClick,
    };
  },
  render(ctx) {
    // 背景图片
    // <div><img src="imgPath" /></div>
    // pixi.js

    return h('Container', [
      h('Sprite', { texture: startPageImg }),
      h('Sprite', {
        texture: startBtnImg,
        x: 215,
        y: 530,
        interactive: true,
        onClick: ctx.onClick,
      }),
    ]);
  },
});
