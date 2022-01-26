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


