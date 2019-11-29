

// function axios({url , ...params}){
//     const baseURL='https://api.zbztb.cn/api/public/v1/'; //基准路径
//     return new Promise((resolve,reject)=>{    
//         wx.request({
//             url: baseURL + url,
//             data: {},
//             ...params,
//             success: (result) => {
//                 resolve(result)
//             }
//         });
          
//     })

// }


function axios({url , ...params}){
    //基准路径
    const baseURL = 'https://api.zbztb.cn/api/public/v1/';
    return new Promise((resolve,rejects)=>{    //有new Promise 他里面的代码就会立即执行
        //发送请求
        wx.request({
            url: baseURL + url,   //拼接传进来的url和基准路径
            ...params,   //剩下的数据都用结构方式传入
            success: (result) => {
                resolve(result)   //把promise 里面的 resolve 放在请求成功的回调函数 并传人返回的数据
            }
        });
          
    })
}


export default axios; //暴露出去