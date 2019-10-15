let formiable = require('formidable')
let path = require('path')
let fs = require('fs')

function upload (req, res) {
  let filename = '';
  let suffix = '';
  let form = new formiable.IncomingForm();
  form.uploadDir = path.resolve(__dirname, '../../uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function (field, file) {
    filename = file.name;
    let suffixs = filename.split('.');
    if (suffixs.length > 1) {
      suffix = suffixs.pop() || '';
      filename = (new Date()).getTime() + '.' + suffix;
    }
    fs.renameSync(file.path, path.join(form.uploadDir, filename));
  });

  // log any errors that occur
  form.on('error', function (err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function () {
    let obj = {
      name: filename,
      state: 'SUCCESS',
      type: suffix,
      url: '/uploads/' + filename
    };
    res.send(JSON.stringify(obj));
  });
  form.parse(req);
}

export default upload