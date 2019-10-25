import Layout from '../components/MyLayout'
import AudioPlayer from '../components/index/AudioPlayer'
import FileButton from '../components/index/FileButton'
import MusicList from '../components/index/MusicList'
import { withRedux } from '../redux/redux'

// import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <div className="container">
      <div className="left">
        <FileButton></FileButton>
        <MusicList></MusicList>
      </div>
      <div className="right">
        <div className="postcard">
          <AudioPlayer></AudioPlayer>
        </div>
      </div>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        width: 100%;
      }
      .left {
        width: 30vw;
        height: 100%;
      }
      .right {
        height: 100%;
        flex-grow: 2;
        overflow: hidden;
      }
      .postcard {
        width: 40vw;
        height: 20vw;
        // background: #D4D7DD;
        transform: rotate(1deg);
        margin: 10vw auto;
      }
      .left :global(.button) {
        position: relative;
        left: 10vw;
      }
    `}</style>
    <script src="../static/wasm/encryption.js"></script>
    <script src="../static/js/jsmediatags.min.js"></script>
  </Layout>
)

export default withRedux(Index)