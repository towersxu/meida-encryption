# audio encryption[![Build Status](https://travis-ci.com/towersxu/audio-encryption.svg?branch=master)](https://travis-ci.com/towersxu/audio-encryption)

将上传音频，在服务端对音频进行加密，然后在浏览器对其进行解密播放。解密采用WebAssembly，既能增加解密的效率，也能增加音频破解的难度。注意：就算是WebAssembly也是可以被逆向破解的。所以这里的加密也不是完全安全的。如果真的想要加密，可以考虑上传的时候把密码和音频一起上传，在播放的时候手动输入密码。(webrtc是不是也可以这样来进行加密?)，播放直接用Audio api就好。

[DEMO](http://audio.hippor.com)

对于mp3可以不把ID3给加密，这样如果文件仍然以mp3结尾的话，在大多数设备上看起来仍然是mp3，只是普通的播放器无法播放而已。但是这么做不好。
