import request from '../../utils/request'

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{}  //详情页面数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //参数在url上 所以在 options 可以拿到
    // console.log(options);
    //获取详情页面页面数据
    request({url:`goods/detail?goods_id=${options.goods_id}`})
    .then(res=>{
      // console.log(res.data.message);
      this.setData({
        goodsDetail:res.data.message
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