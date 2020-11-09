import {defineComponent,h,onMounted,onUnmounted,ref} from '@vue/runtime-core';
import mapImg from '../../assets/map.jpg';
import {game} from '../game.js';

export default defineComponent({
  setup(){
      // const 
      
      const viewHeight = game.renderer.screen.height;
      const mapY1 = ref(0);
      const mapY2 = ref(-viewHeight);
      function handleTicker(){
         mapY1.value+=5;
        mapY2.value+=5;
        if(mapY1.value>=viewHeight ){
          mapY1.value = -viewHeight;
        }
        if(mapY2.value>=viewHeight ){
          mapY2.value = -viewHeight;
        }
      }
      onMounted(()=>{
        game.ticker.add(handleTicker)
      })
      onUnmounted(()=>{
        game.ticker.remove(handleTicker)
      })
      return {
        mapY1,
        mapY2,
      }
  },
  render(ctx){
    return h('Container',[
      h('Sprite',{texture:mapImg,y:ctx.mapY1}),
      h('Sprite',{texture:mapImg,y:ctx.mapY2})
    ]);
  }
})