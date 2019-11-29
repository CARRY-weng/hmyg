import request from '../../utils/request'

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catList:[],  //存放侧边栏的数据
    chilireList:[],  //存放右边的数据
    catIndex:0  //被激活的索引
  },
  
  Cats:[],  //全局数据 页面是拿不到的 只是用来存放全部数据 为了然页面不卡
  handletap(e){
    // console.log(e);
    const catIndex =e.currentTarget.dataset.index  //获取到点击的那个item的索引
    this.setData({
      catIndex,  //赋值
      chilireList:this.Cats[catIndex].children
    })
    
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/categories',
    //   success: (result) => {
    //     console.log(result.data.message);
    //     this.setData({
    //       catList:result.data.message
    //     })
    //   }
    // });
    request({url:'categories'})
      .then(result=>{
        this.Cats=result.data.message, //先把所有数据存在data外面的全局数据中 
        this.setData({
          //给左侧菜单栏赋值
          catList:this.Cats.map(v=>v.cat_name),
          //右边的内容
          chilireList:this.Cats[this.data.catIndex].children
        })
      })
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})