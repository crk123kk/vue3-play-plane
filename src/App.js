// 根组件

import { computed, defineComponent, h, ref } from '@vue/runtime-core';
import EndPage from './page/EndPage';
import GamePage from './page/GamePage';
import StartPage from './page/StartPage';
// import GamePage from './page/GamePage';
// import Circle from './component/Circle';

export default defineComponent({
  setup() {
    // 改变string的时候，切换组件
    // ref创建响应式对象
    const currentPageName = ref('StartPage');
    // const currentPageName = ref('GamePage');
    // const currentPageName = ref('EndPage');

    // 通过计算属性来改变页面
    const currentPage = computed(() => {
      if (currentPageName.value === 'StartPage') {
        return StartPage;
      } else if (currentPageName.value === 'GamePage') {
        return GamePage;
      } else if (currentPageName.value === 'EndPage') {
        return EndPage;
      }
    });

    return {
      currentPage,
      currentPageName,
    };
  },
  render(ctx) {
    return h('Container', [
      h(ctx.currentPage, {
        onChangePage(page) {
          console.log('page :>> ', page);
          ctx.currentPageName = page;
        },
      }),
    ]);
    // return h('Container', [h(GamePage)]);
  },

  //   render() {
  //     // 创建vnode
  //     const vnode = h(
  //       'rect',
  //       { x: 100, y: 100 },
  //       '1111111111111222222222',
  //       //   h('circle', { x: 150, y: 150 })
  //       h(Circle)
  //     );
  //     console.log(vnode);
  //     // 一定要return
  //     return vnode;
  //   },
});
