import Mock from "mockjs";

let data = Mock.mock("/mock/news", {
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "list|1-10": [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      "id|+1": 1,
    },
  ],
});
//mock 检验登录页面的账号密码
//正确的账号： admin
//正确的密码： 123
let loginStudentId = Mock.mock(RegExp("/mock/studentId" + ".*"), checkUser);
let loginPassword = Mock.mock("/mock/password", "456");
function checkUser(options) {
  let paramArr = options.url
    .split("?")
    .slice(1)
    .join("?");
  let paramObj = {};
  let paramsStr = paramArr.split("&");
  paramsStr.forEach((str) => {
    let strArr = str.split("=");
    paramObj[strArr[0]] = strArr[1];
  });
  //这里的token是 123456进行base64编码的
  if (paramObj?.studentId === "admin" && paramObj?.password === "123") {
    return { res: true, token: "MTIzNDU2" };
  } else {
    return { res: false };
  }
}
export { data, loginPassword, loginStudentId };
