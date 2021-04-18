import { defineComponent, h } from '@vue/runtime-core';
export default defineComponent({
  render() {
    const vnode = h('circle', { x: 150, y: 250 });
    return vnode;
  },
});
