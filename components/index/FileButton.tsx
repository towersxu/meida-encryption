import { useState } from 'react'
import encryption from '../utils/encryption'
import { useDispatch } from 'react-redux'

let file
let key

function FileButton () {
  let [isShowKeyInput, setIsShowInput] = useState(false)
  let [isShowMask, setIsShowMask] = useState(false)
  let dispatch = useDispatch()

  function fileChange(event) {
    let files = event.target.files;
    if (files && files.length > 0) {
      file = files[0];
      if (!/\.(e)*mp3/.test(file.name)) {
        alert('格式错误，目前只支持mp3和emp3文件');
        return
      }
      setIsShowInput(true);
      setIsShowMask(true);
      // 监听ESC
      document.body.addEventListener('keyup', handleBodyKeyUp)
      // 将file内容置空，便于重新选择相同的文件
      event.target.value = ''
    }
  }
  function handleEnter(event) {
    if (event.keyCode === 13 && event.target.value) {
      setIsShowInput(false)
      key = event.target.value
      encryption(file, key, (res) => {
        closeMask();
        dispatch({
          type: 'ADD_MUSIC',
          data: res
        })
        // todo: audo-play
      })
    }
  }
  function handleBodyKeyUp(event) {
    if (event.keyCode === 27) {
      closeMask()
    }
  }
  function closeMask (){
    setIsShowInput(false)
    setIsShowMask(false)
    document.body.removeEventListener('keyup', handleBodyKeyUp)
  }
  return (
    <div>
      <div className="button">
        上传音频
        <input type="file" onChange={fileChange} />
      </div>
      {
        isShowMask ? <div className="modal-input">
          {
            isShowKeyInput ? <input type="text" placeholder="请输入秘钥" onKeyUp={handleEnter} />
              : <p className="process-item">处理中...</p>
          }
        </div> : ''
      }

      <style jsx> {`
        .button {
          display: block;
          width: 10vw;
          height: 3vw;
          font-size: 1.5vw;
          text-align: center;
          border: 1px solid #34BD7C;
          line-height: 3vw;
          color: #34BD7C;
          position: relative;
        }
        input[type="file"] {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 999;
          opacity: 0;
          left: 0;
          top: 0;
          cursor: pointer;
        }
        .modal-input {
          position: fixed;
          width: 100vw;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 999;
          background: rgba(255, 255, 250, 0.85);
        }
        .modal-input input {
          position: fixed;
          top: 50vh;
          width: 20vw;
          left: 50vw;
          height: 3vw;
          font-size: 1.5vw;
          margin-left: -10vw;
          border: 2px solid #34BD7C;
          outline: none;
          text-indent: 0.4vw;
        }
        .modal-input .process-item {
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: 1.5vw;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  )
}

export default FileButton