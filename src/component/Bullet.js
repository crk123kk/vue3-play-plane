// 我方子弹
import {
  defineComponent,
  h,
  reactive,
  ref,
  toRefs,
  watch,
} from '@vue/runtime-core';
import bullet from '../../assets/bullet.png';

export default defineComponent({
  props: ['x', 'y'],
  setup(props, ctx) {
    const { x, y } = toRefs(props);
    return {
      x,
      y,
    };
  },
  render(ctx) {
    return h('Container', { x: ctx.x, y: ctx.y }, [
      h('Sprite', { texture: bullet }),
    ]);
  },
});
