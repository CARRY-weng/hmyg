// 5 下拉刷新数据
//   0 先触发下拉刷新事件  onPullDownRefresh
//   1 当用户触发下拉刷新的时候 体验  ===  用户第一次打开 商品列表页面 
//   2 思考
//     1 先打开页面
//     2 不断的加载下一页数据 加载第10页数据
//       1 pagenum =10 
//       2 页面的商品数据 很多  goods
//     3 开始触发下拉刷新了 
//       1 其实也是触发了一个事件
//         1 数据重置 ！！ 
//         2 goods =  第一页的10条数据即可
//         3 pagenum=1
//           goods=[]
//           this.getList()



import request from '../../utils/request'

// pages/goods_list/index.js
Page({
  // 全局参数
  Params:{
    query:'',   //搜索关键字
    cid:-1,     //分类id
    pagenum:1,  //页码
    pagesize:6 //页容量
  },
  /**
   * 页面的初始数据
   */
  data: {
    goods:[],  //商品列表
    tabbar_item:['综合','销量','价格'], //tabbar 栏显示的数据
    currentIndex:0  //tabbar title 被激活的索引
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
      //处理默认图片
      res.data.message.goods.forEach(v=>{   //把获取到的数组遍历一遍 看看是否存在图片 没有的就给个默认图片
        if(!v.goods_small_logo){
          v.goods_small_logo='https://ftp.bmp.ovh/imgs/2019/11/c3cc1f3774182b32.jpg'
        }
      })

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

  //顶部下拉事件
  onPullDownRefresh(){
    // console.log('bbbbbbbbb');
    this.Params.pagenum = 1; //刷新页面就是 重置数据 把页面改成1 把goods里面的数据情况 然后重新根据页数发送请求
    this.setData({
      goods:[]
    })
    this.getGoods()
    
  },

  //从tabbar子组件传过来的 获取激活索引的事件 事件
  handleCurrentIndex(e){
    const {index} = e.detail
    // console.log(e);
    // console.log(index);
    this.setData({
      currentIndex:index  //将点击变更的激活状态的index 赋值
    })
    
  }
 


})


  