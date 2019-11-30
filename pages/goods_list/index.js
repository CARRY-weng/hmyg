import request from '../../utils/request'

// pages/goods_list/index.js
Page({
  // 全局参数
  Params:{
    query:'',   //搜索关键字
    cid:-1,     //分类id
    pagenum:1,  //页码
    pagesize:10  //页容量
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
    this.Params.cid = option.cid;  //这个option是在url后面的参数 onLoad事件可以获取到
    this.getGoods()
    
  },
  //总页数
  TotalPages :1,

  //发送请求的方法
  getGoods(){
    request({
      url:'goods/search',
      data:this.Params
    }).then(res=>{
      // console.log(res.data.message.goods);
      const {goods} = this.data  //为了上滑加载数据的时候是把新的数据拼接在旧数据里面
      this.setData({
         // 当我们做分页了  总的数据 应该是不断 追加的！！！ 
        goods:[...goods, ...res.data.message.goods]
      })
      // console.log(res.data.message);  总条数就在 res.data.message.total
      
      //计算总页数
      this.TotalPages=Math.ceil(res.data.message.total / this.Params.pagesize )
      // console.log(this.TotalPages);
      
    })
  },

  //滚动条触底时候触发的函数
  onReachBottom(){
    // console.log('aaaa');
    //判断有没有下一页数据 
    if(this.Params.pagenum >= this.TotalPages){  //没有页码数大于等于总条数 就是没有下一页了
      //提示用户
      wx.showToast({
        title: '没有更多',
        icon: 'success',
        duration: 1500,
        mask: true
      });
        
    }else{  //还有下一页数据 继续发送请求 并把发送的页数加一
      this.Params.pagenum++;
      this.getGoods()
    }
    
  },

  // //顶部下拉事件
  // onPullDownRefresh(){
  //   console.log('bbbbbbbbb');
    
  // }
 
})


  