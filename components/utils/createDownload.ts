
export function createDownload (file, name) {
  const link = document.createElement('a');
  if (link.download !== undefined) {
    let url = file
    if (file instanceof Blob) {
      url = URL.createObjectURL(file);
    }
    link.setAttribute('href', url);
    link.setAttribute('download', name);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('browser not support download by js');
  }
}
