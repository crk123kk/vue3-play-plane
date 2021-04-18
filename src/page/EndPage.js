import { defineComponent, h } from '@vue/runtime-core';

import endPageImg from '../../assets/end_page.jpg';
import restartBtnImg from '../../assets/restartBtn.png';

export default defineComponent({
  setup(props, ctx) {
    const onClick = () => {
      ctx.emit('changePage', 'GamePage');
    };
    return {
      onClick,
    };
  },
  render(ctx) {
    return h('Container', [
      h('Sprite', { texture: endPageImg }),
      h('Sprite', {
        texture: restartBtnImg,
        x: 215,
        y: 530,
        interactive: true,
        onClick: ctx.onClick,
      }),
    ]);
  },
});
