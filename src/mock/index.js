import Mock from "mockjs";
import PictureList from "@/assets/picture";

const Random = Mock.Random;

let data = Mock.mock("/mock/foods", getFood);
function getFood(options) {
  let page = JSON.parse(options.body).page;
  let campus = JSON.parse(options.body).campus;
  let canteen = JSON.parse(options.body).canteen;

  if (!page) {
    return [];
  }
  let foodList = [];
  let obj = {};
  //确定饭店的地址
  const position1 = [
    "清水河校区学子餐厅",
    "清水河校区清真食堂",
    "清水河校区桃园餐厅",
  ];
  const position2 = [
    "沙河校区风华餐厅",
    "沙河校区阳光餐厅",
    "沙河校区桂园餐厅",
  ];
  let position;

  for (let i = (page - 1) * 10; i < page * 10; i++) {
    if (campus === 0 && canteen === 0) {
      position = position1.concat(position2)[Random.natural(0, 5)];
    } else if (campus === 0 && canteen !== 0) {
      position = position1.concat(position2)[canteen - 1];
    } else if (campus !== 0 && canteen === 0) {
      if (campus === 1) {
        position = position1[Random.natural(0, 2)];
      } else {
        position = position2[Random.natural(0, 2)];
      }
    } else {
      if (campus === 1) {
        position = position1[canteen - 1];
      } else {
        position = position2[canteen - 1];
      }
    }
    const enablePack = Random.boolean();
    obj = {
      id: i,
      picture: PictureList[Random.natural(0, 9)],
      restaurantName: Random.ctitle(2, 5) + "饭店",
      position,
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
