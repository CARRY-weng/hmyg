

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



let ajaxConst = 0 //定义一个变量 记录请求个数  请求发出就加加 请求回来就减减

function axios({url , ...params}){
    //基准路径
    const baseURL = 'https://api.zbztb.cn/api/public/v1/';
    return new Promise((resolve,rejects)=>{    //有new Promise 他里面的代码就会立即执行
        //显示加载中
        wx.showLoading({
            title: '加载中',
            mask: true,
        });
        ajaxConst++;  //请求发出就加加
        //发送请求
        wx.request({
            url: baseURL + url,   //拼接传进来的url和基准路径
            ...params,   //剩下的数据都用结构方式传入
            success: (result) => {
                resolve(result)   //把promise 里面的 resolve 放在请求成功的回调函数 并传人返回的数据
            },
            complete(){  //不管请求是否成功 请求结束以后都会触发
                ajaxConst--;  //请求回来就减减
                if(ajaxConst===0){
                    wx.hideLoading();   //调用以后就会 取消显示 加载中 的那个弹框
                    // console.log('啊啊啊啊');
                    
                }


            }
        });
          
    })
}


export default axios; //暴露出去