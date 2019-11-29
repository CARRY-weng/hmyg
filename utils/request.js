

function axios({url , ...params}){
    const baseURL='https://api.zbztb.cn/api/public/v1/'; //基准路径
    return new Promise((resolve,reject)=>{
        wx.request({
            url: baseURL + url,
            data: {},
            ...params,
            success: (result) => {
                resolve(result)
            }
        });
          
    })

}

export default axios; //暴露出去