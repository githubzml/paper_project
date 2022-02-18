import instance from "./request";

export let testData = () => instance.get("/testData");

// // 1. 注册
// export let register = (params) => instance.get("/register", { params: params });

// // 2. 登录
// export let login = (params) => instance.post("/login", params);


// 1.注册
export let register = (params) => instance.post("/register", params);

// 2.获取邮箱验证
export let code = (params) => instance.post("/code", params);

// 3.登录
export let login = (params) => instance.post("/login", params);

// 4.用户信息
export let userinfo = (params) => instance.post("/userInfo", params);
// 5.添加商品类型
export let addType = (params) => instance.post("/addType", params);
// 6.获取商品数据类型
export let findTypeDate = (params) => instance.get("/findTypeDate", { params });

export let startPay = (params) => instance.post("/startPay", params);


