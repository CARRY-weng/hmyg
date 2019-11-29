/* 
0 自己做个大概的分析
  1 静态页面 
  2 接口 数据 和 页面的映射关系 （复杂要做的 画图分析 - 当数据量很多的时候 把数据放入到vs code 中来分析）
1 静态页面布局
! 1 数据都回来了，但是不是要全部都渲染
!   只把看到的渲染  当用户点击左侧不同菜单的时候 才去显示被点击的菜单下的内容
2 左侧菜单动态渲染
3 右侧内容的动态渲染
4 点击左侧菜单 右侧内容动态渲染
  ? 使用css变量把主题色存下来  -  不是less中的变量 用的原生的css的重量
  ? 使用css变量把主题色存下来  -  不是less中的变量 用的原生的css的变量
  * 1 左侧菜单的激活选中 
  ! 2 右侧的内容 跟着切换显示
todo 3 右侧列表 在被点击切换后，滚动条 都重新置顶！！！  
5 缓存。。 
  1 小程序中的本地存储 类似h5里面（有区别）
    1  h5的本地存储
      1 存普通的字符串！！
      2 存复杂数据（数组，对象） 要转成json字符串再存储 
      3 容量多少 20M或者5M 具体看浏览器版本 
      4 和cookie？？ 
        1 cookie 可以设置过期时间  自动失效 
        2 cookie 存多少 4KB
        3 cookie  浏览器的每次请求 都会自动带上 cookie到后台   
        4 本地存储 比 cookie 更加安全 
    2 localStorage vs sessionStorage 
      1 localStorage  永久存在 除非用户手动删除
      2 sessionStorage （会话存储 ）
  2  小程序中的本地存储 大体用法和  h5的类似 会更加的方便
      1 存入任意的数据类型，它都不会导致数据丢失
! 3 本地缓存
  1 打开了分类页面的时候 先做一个判断 
    看本地存储里面有没有旧的数据
    1 假设没有旧数据 
      1 直接发送请求获取新的数据
      2 要新数据存到缓存中 
    2 假设有旧数据 但是 判断这个数据有没有过期  
      1 数据过期 
        1 直接发送请求获取新的数据
        2 要新数据存到缓存中 
      2 数据没有过期 才使用旧的缓存的数据 
 */

import request from '../../utils/request'

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catList:[],  //存放侧边栏的数据
    chilireList:[],  //存放右边的数据
    catIndex:0,  //被激活的索引
    scrollTop:0  //scroll-view 回到顶部
  },
  
  Cats:[],  //全局数据 页面是拿不到的 只是用来存放全部数据 为了然页面不卡

  handletap(e){  //点击菜单栏事件
    // console.log(e);
    const catIndex =e.currentTarget.dataset.index  //获取到点击的那个item的索引
    this.setData({
      catIndex,  //赋值
      chilireList:this.Cats[catIndex].children, //渲染对应的列表
      scrollTop:0  //scroll-view 回到顶部
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

    // 判断有没有本地数据
    const cats = wx.getStorageSync('cats');
      //cats不存在也就是没有本地数据
    if(!cats){
      // console.log('没有本地数据');
      // 没有本地数据所以要获取 并存在本地
      this.getCats()
    }else{
      // console.log('有数据');
      // 有数据 
      //要先判断数据有没有过期  设定10s过期
      if(Date.now() - cats.time  > 10 * 1000){  //超过十秒就是过期
        // console.log('数据过期');
        this.getCats()
      }else{  //没有超过十秒
        // console.log('数据没过期');
        this.Cats = cats.list;
        this.setData({
          //给左侧菜单栏赋值
          catList:this.Cats.map(v=>v.cat_name),
          //右边的内容
          chilireList:this.Cats[this.data.catIndex].children
        })

      }
    }
      
  },

  //发送异步请求 获取数据方法
  getCats(){
    request({url:'categories'})
    .then(result=>{
      this.Cats=result.data.message, //先把所有数据存在data外面的全局数据中 
      this.setData({
        //给左侧菜单栏赋值
        catList:this.Cats.map(v=>v.cat_name),
        //右边的内容
        chilireList:this.Cats[this.data.catIndex].children
      })
      //把数据存在本地
      wx.setStorageSync('cats', {list:this.Cats,time:Date.now()});
        
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