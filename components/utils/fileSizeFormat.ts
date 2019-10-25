export function fileSizeFormat (size: number) :string {
  const unit = ['B', 'KB', 'M', 'G', 'T']
  const UNIT_NUM = 1024
  let idx = 0
  
  while (size > UNIT_NUM && idx < 5) {
    size = size / UNIT_NUM
    idx++
  }

  return size.toFixed(1) + unit[idx]
}