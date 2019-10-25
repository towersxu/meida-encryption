import { connect } from 'react-redux'
import { encryptionArraybuffer } from '../utils/encryption'
import CAudioNode from './CAudioNode'
const mapStateToProps = (state) => {
  return {
    playInstance: state.playInstance,
    musicList: state.musicList
  }
}

function AudioPlayer (props) {
  let playInstance = props.playInstance
  let musicList = props.musicList
  // let dispatch = useDispatch()
  let music: any = {}
  if (playInstance.playStatu === 1) { // 开始播放
    music = musicList[playInstance.idx]
    if (music.file) {
      let reader = new FileReader();
      reader.onloadend = function (ev: ProgressEvent<FileReader>) {
        if (ev.target && ev.target.readyState === FileReader.DONE) {
          if (reader.result && reader.result instanceof ArrayBuffer) {
            encryptionArraybuffer(reader.result, '33').then((buffer: any) => {
              play(buffer)
            })
          } else {
            throw new Error('no file')
          }
        }
      }
      reader.readAsArrayBuffer(music.file)
    } else if (music.src) { // 先下载
      fetch(music.src)
        .then(function (response) {
          response.arrayBuffer().then((arraybuffer) => {
            encryptionArraybuffer(arraybuffer, '33').then((buffer: any) => {
              play(buffer)
            })
          })
        })
    }
  }
  if (music && !music.picture && playInstance.playStatu === 0) {
    music.picture = '/static/music.png'
  }
  // methods
  function play (buffer) {
    // dispatch({
    //   type: 'PLAY_MUSIC',
    //   data: {
    //     idx: playInstance.idx,
    //     playStatu: 2
    //   }
    // })
    let cAudioNode = new CAudioNode();
    setTimeout(() => {
      cAudioNode.start(buffer);
    }, 400)
  }
  let pic = 'picture'
  if (playInstance.playStatu === 1) {
    pic += ' play'
  }
  return (
    <div className="audios">
      <canvas id="canvas" className="canvas"></canvas>
      <div className="picture-blur">
        <div className={pic}>
          <img src={music.picture} />
        </div>
      </div>
      <style jsx> {`
        .audios {
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, #76b852, #8dc26f);
        }
        .picture-blur {
          position: absolute;
          z-index: 3;
          width: 100%;
          height: 100%;
        }
        .picture {
          width: 15vw;
          height: 15vw;
          background: rgba(255,255,255,0.8);
          border-radius: 50%;
          position: absolute;
          right: 2vw;
          top: 2.5vw;
          box-shadow: inset 0 0 3vw #94aa2a;
          overflow: hidden;
        }
        .picture.play {
          animation: rotateImg 5s infinite;
          animation-timing-function: linear;
        }
        .picture img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 120%;
          max-height: 120%;
        }
        .canvas {
          width: 512px;
          height: 256px;
          position: absolute;
          z-index: 2;
          opacity: 0.3;
          top: 0;
          left: 0;
        }
        @keyframes rotateImg {
          0% {
            transform: rotate(0deg);
            transform-origin:50% 50%;
          }
          100% {
            transform: rotate(360deg);
            transform-origin:50% 50%;
          }
        }
      `}</style>
    </div>
  )
}
export default connect(mapStateToProps)(AudioPlayer)