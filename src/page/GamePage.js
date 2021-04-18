import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  reactive,
} from '@vue/runtime-core';

import mapImg from '../../assets/map.jpg';
import Bullet from '../component/Bullet';
import EnemyPlane from '../component/EnemyPlane';
import Map from '../component/Map';
import Plane from '../component/Plane';
import { game } from '../Game';
import { hitTestObject } from '../utils';

export default defineComponent({
  setup(props, { emit }) {
    // 我方飞机
    const { palneInfo } = useCreatePlane();

    // 敌方飞机
    const { enemyPlanes } = useCreateEnemyPlanes();

    // 我方子弹
    const { bullets, addBullet } = useCreateBullets();

    const onAttack = (bulletInfo) => {
      // bullets.push(bulletInfo);
      addBullet(bulletInfo);
    };

    useFighting(enemyPlanes, bullets, palneInfo, emit);

    return {
      bullets,
      onAttack,
      palneInfo,
      enemyPlanes,
    };
  },

  render(ctx) {
    // 创建敌方飞机
    const createEnemyPlanes = () => {
      return ctx.enemyPlanes.map((info) => {
        return h(EnemyPlane, { x: info.x, y: info.y });
      });
    };

    // 我方子弹
    const createBullets = () => {
      return ctx.bullets.map((info) => {
        return h(Bullet, { x: info.x, y: info.y });
      });
    };

    return h('Container', [
      h(Map),
      h(Plane, {
        x: ctx.palneInfo.x,
        y: ctx.palneInfo.y,
        onAttack: ctx.onAttack,
      }),
      ...createEnemyPlanes(),
      ...createBullets(),
    ]);
  },
});

function useFighting(enemyPlanes, bullets, palneInfo, emit) {
  const handleTicker = () => {
    // 敌机移动
    enemyPlanes.forEach((enemyInfo) => {
      enemyInfo.y++;
    });

    // 我方子弹移动
    bullets.forEach((bulletInfo) => {
      bulletInfo.y--;
    });

    // 碰撞检测
    // 我方飞机和敌机碰撞
    enemyPlanes.forEach((enemyInfo) => {
      if (hitTestObject(enemyInfo, palneInfo)) {
        // console.log('hit');
        emit('changePage', 'EndPage');
      }
    });

    // 我方子弹和敌机碰撞
    bullets.forEach((bulletInfo, bulletIndex) => {
      enemyPlanes.forEach((enemyInfo, enemyIndex) => {
        if (hitTestObject(enemyInfo, bulletInfo)) {
          console.log('hit bullt');
          // 我方子弹消失
          bullets.splice(bulletIndex, 1);
          // 敌机消失
          enemyPlanes.splice(enemyIndex, 1);
        }
      });
    });
  };

  onMounted(() => {
    // 帧循环，在循环结束之后需要销毁
    game.ticker.add(handleTicker);
  });

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });
}

function useCreateBullets() {
  const bullets = reactive([]);

  const addBullet = (info) => {
    bullets.push({ ...info, width: 61, height: 99 });
  };

  return {
    bullets,
    addBullet,
  };
}

function useCreateEnemyPlanes() {
  const enemyPlanes = reactive([
    {
      x: 50,
      y: 0,
      width: 308,
      height: 207,
    },
  ]);
  return {
    enemyPlanes,
  };
}

function useCreatePlane() {
  const palneInfo = reactive({ x: 150, y: 450, width: 258, height: 364 });
  const speed = 15;
  window.addEventListener('keydown', (e) => {
    console.log('e :>> ', e.code);
    switch (e.code) {
      case 'ArrowUp':
        palneInfo.y -= speed;
        break;
      case 'ArrowDown':
        palneInfo.y += speed;
        break;
      case 'ArrowLeft':
        palneInfo.x -= speed;
        break;
      case 'ArrowRight':
        palneInfo.x += speed;
        break;
    }
  });
  return {
    palneInfo,
  };
}
