import {
  defineComponent,
  h,
  reactive,
  ref,
  toRefs,
  watch,
} from '@vue/runtime-core';
import planeImg from '../../assets/plane.png';

export default defineComponent({
  props: ['x', 'y'],
  setup(props, { emit }) {
    // console.log('props :>> ', props);
    // 方案一
    // props是一个只读的响应式对象，因此我们可以通过重建一个响应式对象来实现位置的变化
    // const point = reactive({ x: props.x, y: props.y });

    // watch(props, (value) => {
    //   // console.log('value :>> ', value);
    //   point.x = value.x;
    //   point.y = value.y;
    // });

    // return {
    //   point,
    // };

    // 方案二：响应式丢失的问题，props得到的x,y是一个普通的值，而不再是响应式的值，所以没办法做到响应式
    // 可以通过toRefs的方式将这些值响应式
    const { x, y } = toRefs(props);

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        console.log('attack');
        emit('attack', {
          x: x.value + 100,
          y: y.value,
        });
      }
    });

    return {
      x,
      y,
    };
  },
  // render(ctx) {
  //   return h('Container', { x: ctx.point.x, y: ctx.point.y }, [
  //     h('Sprite', { texture: planeImg }),
  //   ]);
  // },
  render(ctx) {
    return h('Container', { x: ctx.x, y: ctx.y }, [
      h('Sprite', { texture: planeImg }),
    ]);
  },
});
