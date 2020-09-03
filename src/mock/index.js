import Mock from "mockjs";
const Random = Mock.Random;

let data = Mock.mock("/mock/foods", getFood);
function getFood(options) {
  let page = JSON.parse(options.body).page;
  if (!page) {
    return [];
  }
  let foodList = [];
  let obj = {};
  for (let i = (page - 1) * 10; i < page * 10; i++) {
    let positionIndex = Random.natural(0, 6);
    const position = [
      "沙河校区风华餐厅",
      "沙河校区阳光餐厅",
      "沙河校区桂园餐厅",
      "沙河校区桂园餐厅二楼",
      "清水河校区清真食堂",
      "清水河校区学子餐厅",
      "清水河校区桃园餐厅",
    ];
    const enablePack = Random.boolean();
    obj = {
      id: i,
      picture: Random.dataImage("80x80"),
      restaurantName: Random.ctitle(2, 5) + "饭店",
      position: position[positionIndex],
      price: "¥" + Random.integer(10, 30) + "/人",
      enablePack,
    };
    foodList.push(obj);
  }
  return foodList;
}

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
    return {
      res: true,
      token: "MTIzNDU2",
      photo: Random.image("200x100", "#4A7BF7", "代"),
      name: Random.cname(),
      identity: "学生",
      phone: Mock.mock(/\d{11}/),
      studentId: `2020${Mock.mock(/\d{6}/)}`,
    };
  } else {
    return { res: false };
  }
}
export { data, loginPassword, loginStudentId };
