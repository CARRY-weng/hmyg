
/*
获取微信授权信息
*/
export const getSetting = () =>{
    new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: () => {},
            complete: () => {}
        });
          
    })
}


/*
获取收货地址
*/
export  const chooseAssress = ()=>{
    new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: () => {},
            complete: () => {}
        });
          
    })
}


/*
打开授权页面
*/
export const openSetting = ()=>{
    new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: () => {},
            complete: () => {}
        });
          
          
    })
}