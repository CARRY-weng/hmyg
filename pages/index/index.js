
Page({
    data:{
        swiperList:[],  //轮播图数据
        navigationList:[],  //导航栏数据
        floorList:[]  //楼层数据
    },
    onLoad(){
        //1.获取轮播图的请求
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
            success: (result) => {
                // console.log(result.data.message);
                this.setData({
                    swiperList:result.data.message
                })
                
            }
        });

        //2.获取导航数据请求
        wx.request({
             url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
             success: (result) => {
                //  console.log(result.data.message);
                 this.setData({
                    navigationList:result.data.message
                 })
                 
             }
         });

         //3.获取楼层数据请求
         wx.request({
             url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
             success: (result) => {
                //  console.log(result.data.message);
                 this.setData({
                    floorList:result.data.message
                 })
             }
         });
           
            
    }
})
