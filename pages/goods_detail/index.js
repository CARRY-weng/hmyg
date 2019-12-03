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
    // console.log(e);
    // 当前被点击的大图路径
    const current = e.currentTarget.dataset.src;
    // 要预览的整个图片列表
    const urls = this.data.goodsDetail.pics.map(v=>v.pics_big)
    wx.previewImage({
      current,
      urls
    });
      
  },

  //点击加入购物车按钮
  handleAddCat(){
    //  1 获取购物车的数组 在缓存中
    let cats = wx.getStorageSync('cats') || [];
    // 2 判断 当前的商品是否已经存在了
    const index = cats.findIndex(v=>v.goods_id===this.data.goodsDetail.goods_id)
    // 3 判断 当前的商品是否已经存在了
    if(index===-1){
      // 不存在 顺便添加一个 购买数量 属性！
      cats.unshift({
        ...this.data.goodsDetail,
        num:1,
        isChecked:false   //添加是否被勾选属性
      })
    }else{
      //存在 执行数量++
      cats[index].num++
    }  
     // 4 重新添加到缓存中
     wx.setStorageSync('cats', cats);

     //添加个提示窗口
     wx.showToast({
       title: '加入成功',
       duration: 1500,
       mask: true
     });
       
       
      
  }


})