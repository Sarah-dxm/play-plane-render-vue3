import {defineComponent,h} from '@vue/runtime-core';
import endPageImg from '../../assets/endPage.jpg'
import restartBtnImg from '../../assets/restartBtn.png'

export default defineComponent({
  setup(props,{emit}){
   const onClick= function (){
    emit('changePage','GamePage');
   }
    return {
      onClick
    }
  },
  render(ctx){
    return h('Container',[
      h('Sprite',{
        texture:endPageImg,
      }),
      h('Sprite',{
        texture:restartBtnImg,
        x: 225,
        y: 510,
        interactive:true,
        onClick:ctx.onClick,
      })
    ])
  }
})