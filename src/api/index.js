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

// 7.获取所有商品类型
export let typeAll = (params) => instance.get("/typeAll", { params });

// 8.发布商品
export let addProduct = (params) => instance.post("/addProduct", params);

// 9.修改用户头像
export let uploadUserImg = (params) => instance.post("/uploadUserImg", params);

// 10.修改用户昵称
export let updateNickName = (params) => instance.post("/updateNickName", params);

// 11.修改用户密码
export let updatePwd = (params) => instance.post("/updatePwd", params);

// 12.找回密码

export let findPassword = (params) => instance.post("/findPassword", params);

// 13.查询商品
export let findCommodity = (params) => instance.post("/findCommodity", params);







// ====================================================================
// 获取首页数据
export let getHomeImg = (params) => instance.get("/getHomeImg");
// 获取首页下方列表数据
export let getHomeList = (params) => instance.get("/getHomeList");

// 获取详情页数据
export let getDetail = (params) => instance.post("/getDetail", params);
