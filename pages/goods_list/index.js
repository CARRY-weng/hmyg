import request from '../../utils/request'

// pages/goods_list/index.js
Page({
  // 全局参数
  Params:{
    query:'',   //搜索关键字
    cid:-1,     //分类id
    pagenum:1,  //页码
    pagesize:2  //也容量
  },
  /**
   * 页面的初始数据
   */
  data: {
    goods:[]  //商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    // console.log(option);
    this.Params.cid = option.cid;
    this.getGoods()
    
  },

  getGoods(){
    request({
      url:'goods/search',
      data:this.Params
    }).then(res=>{
      console.log(res.data.message.goods);
      this.setData({
        goods:res.data.message.goods
      })
    })
  },

  onReachBottom(){
    console.log('aaaa');
    
  }
 
})