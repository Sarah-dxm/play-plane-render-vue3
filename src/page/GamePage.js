import {defineComponent,h,onMounted,onUnmounted,reactive} from '@vue/runtime-core';
import Map from '../components/Map';
import Plane from '../components/Plane';
import EnemyPlane from '../components/EnemyPlane';
import Bullet from '../components/Bullet';
import {game} from '../game';
import {hitTestObject} from '../utils';

export default defineComponent({
  setup(props,{emit}){
    //我方战机
    const {planeInfo} = usePlane();
    //敌方站机
    const {enemyPlaneInfo,moveEnemyPlane} = useEnemyPlane();
    //我方子弹
    const {bulletInfo,addBullet,moveBullte} = useBullet();
   // 战斗逻辑
    function handleTicker(){
      useFighting(moveEnemyPlane,moveBullte,planeInfo,enemyPlaneInfo,bulletInfo,emit);
    }
    //子弹碰撞逻辑
    const handleAttack = (args)=>{
      addBullet(args);
    }
    onMounted(()=>{
      game.ticker.add(handleTicker);
    })
    onUnmounted(()=>{
      game.ticker.remove(handleTicker);
    })

    return {
      planeInfo,
      bulletInfo,
      enemyPlaneInfo,
      handleAttack,
    }
    function usePlane(){//our plane
      const planeInfo = reactive({
        x:100,
        y:400,
        width:258,
        height:364,
      })
      const speed = 10;
      window.addEventListener('keydown',(e)=>{
        console.log(e.code)
        switch(e.code){
          case 'ArrowUp':
                planeInfo.y -=speed;
                break;
          case 'ArrowDown':
                planeInfo.y +=speed;
                break;
          case 'ArrowLeft':
                planeInfo.x -=speed;
                break;
          case 'ArrowRight':
                planeInfo.x +=speed;
        }
      })
      return {planeInfo};
    }
    function useBullet(){
      const bulletInfo = reactive([
      ]);
      const addBullet = (args)=>{
        bulletInfo.push({...args,width:61,height:99});
      }
      const moveBullte = ()=>{
        bulletInfo.forEach(item=>{
          item.y--;
        })
      }
      return {
        bulletInfo,
        addBullet,
        moveBullte,
      }
    }
    function useEnemyPlane(){ //enemy plane  
      const enemyPlaneInfo =  reactive([
        {x:30,y:10,width:308, height:207},
        // {x:100,y:100},
        // {x:200,y:200}
      ]);
      const moveEnemyPlane = function (){
        enemyPlaneInfo.forEach(item=>{
          item.y++;
        })
      }
      return {
        enemyPlaneInfo,
        moveEnemyPlane
      }
    }
    //战斗逻辑
    function useFighting(moveEnemyPlane,moveBullte,planeInfo,enemyPlaneInfo,bulletInfo,emit){
      //移动地方飞机
      moveEnemyPlane();
      //移动我方子弹
      moveBullte();
      enemyPlaneInfo.forEach(item=>{
        if(hitTestObject(item,planeInfo)){
          console.log('hit');
          emit('changePage','EndPage');
        }    
      })
      enemyPlaneInfo.forEach((item,index)=>{  
        bulletInfo.forEach((bulletItem,bulletIndex)=>{
            if(hitTestObject(item,bulletItem)){
              console.log('hit');
              enemyPlaneInfo.splice(index,1);
              bulletInfo.splice(bulletIndex,1);
            }
        })
      })
    }
  },
  render(ctx){
    const createBullet =()=>{
      const bulletComponents = []
      ctx.bulletInfo.forEach(item=>{
        bulletComponents.push(h(Bullet,{x:item.x,y:item.y}))
      })
      return bulletComponents;
    }
    const createEnemyPlane=()=>{
      const enemyPlane = []
      ctx.enemyPlaneInfo.forEach(item=>{
        enemyPlane.push(h(EnemyPlane,{x:item.x,y:item.y}));
      })
      return enemyPlane;
    }
    return h('Container',[
      h(Map),
      h(Plane,{
        x:ctx.planeInfo.x,
        y:ctx.planeInfo.y,
        onAttack:ctx.handleAttack,
      }),
      ...createEnemyPlane(),
      ...createBullet(),
    ]);
  }
})