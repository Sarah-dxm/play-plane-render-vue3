import {defineComponent,h} from '@vue/runtime-core';
import EnemyPlaneImg from '../../assets/enemy.png'

export default defineComponent({
  props:{
    x:{
      type:Number
    },
    y:{
      type:Number,
    }
  },
  render(ctx){
    return h('Container',[
      h('Sprite',{texture:EnemyPlaneImg,x:ctx.x,y:ctx.y})
    ])
  }
})