import {defineComponent,h} from '@vue/runtime-core';
import BulletImg from '../../assets/bullet.png'

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
      h('Sprite',{texture:BulletImg,x:ctx.x,y:ctx.y})
    ])
  }
})