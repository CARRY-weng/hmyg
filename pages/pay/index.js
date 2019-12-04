


import regeneratorRuntime from '../../lib/runtime/runtime';
import {getSetting,openSetting,chooseAddress} from '../../utils/wxAsync'

Page({

 
  data: {
    //收货地址
    address:{},
    //购物车内容
    cats:[],
    // 商品的总价格
    totalPrice: 0,
    //全选框状态
    allchecked:true,
    //勾选商品总数量
    nums:0
  },

  onLoad: function (options) {

  },


 
  onShow: function () {
    //判断一下本地存储中有没有收货地址   赋值给data中的address 然后在页面判断 如果address存在就显示按钮
    const address = wx.getStorageSync('address') || {};
    // console.log(this.data.address);
    //获取本地购物车内容
    const cats = wx.getStorageSync('cats') || [];
    this.setData({
      address,
      cats:cats.filter(v=>v.isChecked)  //结算页面只需要显示 有勾选的商品
    })
    // console.log(cats);
    
    this.countAll(cats)
  },


 


  //计算总价格的方法  以及全选框状态的设置
  countAll(cats){
    // console.log(cats);
    
       /* 
  1 获取缓存中的购物车数组
  2 循环 
    1 判断该商品的isChecked 是否为 true
    2 获取每个商品的单价 * 要购买的数量
    3 每个商品的总价 叠加计算 ++ 
     */
    let totalPrice = 0;
    let nums = 0;
    // 只要有一个商品没选中 它的值就是false
    let allChecked = true;
    cats.forEach(v => {
      if(v.isChecked){  //假如是选中的 就要计入总价格
        totalPrice += v.goods_price * v.num
        //
        nums += v.num
      }else{
        
        allChecked=false  //只要有一个没有选中 就会等于false 

      }

    });
    this.setData({
      totalPrice,
      allChecked,//把全选状态保存
      nums 
    })
    
    wx.setStorageSync('cats', cats);
  },
 

 
 

  

})