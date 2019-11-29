// import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createDownload } from '../utils/createDownload'
import { fileSizeFormat } from '../utils/fileSizeFormat'

const mapStateToProps = (state) => {
  return {
    musicList: state.musicList
  }
}


function MusicList(props) {
  let musicList = props.musicList
  let dispatch = useDispatch()

  function play (idx) {
    dispatch({
      type: 'PLAY_MUSIC',
      data: {
        idx,
        playStatu: 1
      }
    })
  }
  function download (music) {
    createDownload(music.file || music.src, `${music.title}.${music.type}`)
  }
  const musicListItems = musicList.map((music, idx) => {
    return (
      <li key={idx}>
        <span className="title" onClick={() => play(idx)}>{music.title + '.' + music.type}</span>
        <span className="singer">{music.artist}</span>
        <span className="time">{fileSizeFormat(music.size)}</span>
        <span className="download">
          <img onClick={() => download(music)} src="../../static/download.png"></img>
        </span>
      </li>
    )
  })
  return (
    <div>
      <ul className="music-list">
        <li className="head">
          <span className="title">title</span>
          <span className="singer">artist</span>
          <span className="time">size</span>
          <span className="download">download</span>
        </li>
        {musicListItems}
      </ul>
      <style jsx>{`
          .music-list :global(.head) {
            color: #646766;
            margin: 5px 0;
          }
          .music-list {
            list-style: none;
          }
          .music-list :global(li) {
            line-height: 30px;
            font-size: 14px;
            padding: 0 5px;
          }
          .music-list :global(li:nth-child(2n - 1)) {
            background: #D4D7DD;
          }
          .music-list :global(.title) {
            width: 50%;
            display: inline-block;
            cursor: pointer;
          }
          .music-list :global(.title:hover) {
            color: #34BD7C;
          }
          .music-list :global(.singer) {
            width: 20%;
            display: inline-block;
          }
          .music-list :global(.time) {
            width: 15%;
            display: inline-block;
          }
          .music-list :global(.download) {
            width: 15%;
            text-align: center;
            display: inline-block;
          }
          .music-list :global(.download img) {
            vertical-align: middle;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  )
}

export default connect(mapStateToProps)(MusicList)