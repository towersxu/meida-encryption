declare global {
  interface Window {
    allocateUTF8: Function;
    _malloc: Function;
    _free: Function;
    Module: {
      HEAPU8: {
        set: Function
      };
      _encry: Function;
      _print_string: Function;
    };
    jsmediatags: any
  }
}

async function encryption (file, key, callback) {
  // TODO: 通过file的名字来判断文件的类型，其实这里可以根据文件的内容来判断的，先不做
  let tags
  if (/\.mp3$/.test(file.name)) { // 如果是mp3，则加密为emp3
    tags = await readMediaTag(file);
    tags.type = 'emp3'
  } else if (/\.emp3$/.test(file.name)){ // 如果是emp3，再次加密后应该为mp3
    tags = {
      type: 'mp3'
    }
  }
  let arrayBuffer = await getFileBuffer(file);
  arrayBuffer = await encryptionArraybuffer(arrayBuffer, key);
  
  let blob = new Blob([arrayBuffer]);
  if (tags.type === 'mp3') { // 从解码后的音频中获取音频信息
    Object.assign(tags, await readMediaTag(blob));
  }
  callback({
    ...tags,
    size: file.size,
    file: blob,
    key: key
  });
}
/**
 * 将arraybuffer使用wasm进行加密
 * @param [ArrayBuffer] arrayBuffer - ArrayBuffer类型数据
 * @param [string] key - 加密秘钥
 */
export async function encryptionArraybuffer(arrayBuffer, key) {
  return new Promise<ArrayBuffer>((resolve) => {
    let u_int8_data = new Uint8Array(arrayBuffer);
    let ptr = window._malloc(u_int8_data.byteLength);
    let ptr_key = window.allocateUTF8(key);
    window.Module.HEAPU8.set(u_int8_data, ptr);
    window.Module._encry(ptr, u_int8_data.length, ptr_key);
    let ptr_key_temp = ptr;
    for (let i = 0; i < u_int8_data.length; i++) {
      u_int8_data[i] = window.Module.HEAPU8[ptr];
      ptr++;
    }
    resolve(u_int8_data.buffer);
    window._free(ptr_key_temp);
    window._free(ptr_key);
  })
}

export async function getFileBuffer (file) {
  return new Promise<ArrayBuffer>((resolve) => {
    let reader = new FileReader();
    reader.onloadend = function (ev: ProgressEvent<FileReader>) {
      if (ev.target && ev.target.readyState === FileReader.DONE) {
        if (reader.result && reader.result instanceof ArrayBuffer) {
          resolve(reader.result)
        } else {
          throw new Error('no file')
        }
      }
    }
    reader.readAsArrayBuffer(file);
  })
}

async function readMediaTag (file) {
  const jsmediatags = window.jsmediatags;
  return new Promise((resolve, reject) => {
    jsmediatags.read(file, {
      onSuccess: function (res) {
        let { artist, title, picture } = res.tags
        resolve({
          artist,
          title,
          picture
        });
      },
      onError: function (e) {
        reject(e);
      }
    })
  })
}

export default encryption