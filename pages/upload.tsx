import Layout from '../components/MyLayout'
import { Component, ChangeEvent } from 'react'
import fetch from 'isomorphic-unfetch'

interface ChangeFileEvent extends ChangeEvent {
  target: HTMLInputElement
}

class Upload extends Component {
  onChange(event: ChangeFileEvent) {
    event.preventDefault();
    console.log(event.target.files);
    let files = event.target.files;
    if (files && files.length > 0) {
      this.upload(files.item(0))
    }
  }
  async upload (file) {
    let formdata = new FormData();
    formdata.append('file', file);
    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formdata
    });
    console.log(res);
  }
  render () {
    return (
      <Layout>
        <input type="file" onChange={this.onChange.bind(this)}></input>
      </Layout>
    )
  }
}

export default Upload