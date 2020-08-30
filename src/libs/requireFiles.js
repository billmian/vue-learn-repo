export default function(context) {
  //下面是返回当前目录下的ts后缀文件的文件名和其内export default组成的对象
  let fileObj = context
    .keys()
    .map(context)
    .reduce((total, item, index) => {
      const path = context.keys()[index];
      const re = new RegExp(/(\S+\/)(\S+)\.js/);
      const name = (re.exec(path) || [])[2];
      if (name !== "index") {
        total[name] = item.default;
      }
      return total;
    }, {});
  return fileObj;
}
