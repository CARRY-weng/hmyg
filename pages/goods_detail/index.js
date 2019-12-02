import request from '../../utils/request'

// pages/goods_detail/index.js
Page({

  
  data: {
    goodsDetail:{}  //详情页面数据
  },

 
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
      // console.log(this.data.goodsDetail);
    })
    
  },

  //点击轮播图 预览大图事件
  handlePreviewImage(e){
    console.log(e);
    // 当前被点击的大图路径
    const current = e.currentTarget.dataset.src;
    // 要预览的整个图片列表
    const urls = this.data.goodsDetail.pics.map(v=>v.pics_big)
    wx.previewImage({
      current,
      urls
    });
      
  },


})