import {createApp} from './src/runtime-canvas'
import App from './src/app';
import {getRootContainer} from './src/game'

// 根组件
// 根容器
createApp(App).mount(getRootContainer());