import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// enum PLAY_STATU = {NOTPLAY}

const initialState = {
  musicList: [
    {
      title: '谢谢你的爱',
      artist: '刘德华',
      type: 'emp3',
      size: 2936012,
      src: '/static/谢谢你的爱 (川话版).emp3',
      file: '',
      picture: '/static/andy.jpg',
      key: '33' // 加密秘钥，这里是DEMO的秘钥
    }
  ],
  playInstance: {
    idx: -1, // 播放音乐列表的序号
    playStatu: 0 // 播放状态,0未播放，1开始播放，2播放中，3播放结束
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MUSIC':
      let musicList = state.musicList.slice()
      musicList.push(action.data)
      return {
        ...state,
        musicList
      }
    case 'PLAY_MUSIC':
      return {
        ...state,
        playInstance: action.data
      }
    default:
      return state
  }
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}
