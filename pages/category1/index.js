import request from '../../utils/request'

// pages/category1/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catesList:[],  //左边菜单栏数据
    goodsList:[],  // 右边商品数据
    currentIndex:0,  // 激活的项的索引
    scrollTop: 0  // 右侧滚动条的高度
  },

  //全局数据 全部的数据  页面是获取不到的
  Cates : [],

  //左边菜单栏的点击事件
  handleTap(e){
    // console.log(e);
    const index = e.currentTarget.dataset.index  //获取点击的那一项的index
    // console.log(index);
    
    this.setData({
      currentIndex:index, //赋值 激活的项的索引
      goodsList:this.Cates[index].children, //赋值 右边商品数据
      scrollTop:0 // 右侧滚动条的高度回到最顶部
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const cates = wx.getStorageSync('cates');
    // 先判断有没有本地储存的信息
    if(!cates){  //如果没有本地信息 就获取一下 并保存到本地
      // console.log('没有本地信息');
      this.getCates()   //发送ajax请求
    }else{  
      //有本地信息 判断是不是过期的 设定10秒过期
      // console.log('有本地信息');
      if(Date.now() - cates.time > 10 * 1000){  //过期就重新获取并存到本地
        // console.log('本地信息过期');
        this.getCates()   //发送ajax请求
      }else{
        // console.log('本地信息未过期');
        //没有过期就直接拿本地的数据
        this.Cates = cates.list
        this.setData({
          //将菜单栏数据赋值
          catesList:this.Cates.map(v=>v.cat_name),
          //将右边商品数据赋值
          goodsList:this.Cates[0].children
        })
      }

    }
  },

  getCates(){
    request({url:'categories'})  //发送ajax请求
    .then(result=>{
      // console.log(result.data.message);
      this.Cates = result.data.message  //将所有数据复制给全局数据变量
      this.setData({
        //将菜单栏数据赋值
        catesList:this.Cates.map(v=>v.cat_name),
        //将右边商品数据赋值
        goodsList:this.Cates[0].children
      })
      //保存到本地
      wx.setStorageSync('cates', {list:this.Cates,time:Date.now()});
        
    })
  }

  
})