import {defineComponent,h} from '@vue/runtime-core';
import planeImg from '../../assets/plane.png'

export default defineComponent({
  props:{
    x:{
      type:Number
    },
    y:{
      type:Number,
    }
  },
  setup(props,{emit}){
    window.addEventListener('keydown',(e)=>{
      if(e.code==='Space'){
        console.log('hit');
        emit('attack',{
          x:props.x+100,
          y:props.y
        })
      }
    })
  },
  render(ctx){
    return h('Container',[
      h('Sprite',{texture:planeImg,x:ctx.x,y:ctx.y})
    ])
  }
})