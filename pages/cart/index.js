
/* 


1 正确的流程（看这个即可 ）
    1 当用户点击获取收货地址的时候 先判断 用户有没有授予权限-收货  其实就是一个变量 auth
      1 当 auth = undefined  表示 用户是第一次点击 获取收货-按钮 
      2 当 auth = true  表示 用户已经给与 权限 已经允许
      3 当 auth =  false 表示 用户 曾经拒绝过！！
    2 当  auth = undefined 或者  true 的时候
      我们都可以直接获取用户的 收货地址
    3 当 auth =  false
      1 先打开 用户授权设置页面  -- 两种的方式来打开用户权限设置页面（1 api提供，直接打开即可 ）
      2 用户自己 打开 获取收货的授权
      3 再获取用户的 收货地址

    4 修改成 async的方式 

2 打开页面的时候
  1 判断一下有没有收货地址的信息 （通过本地存储来判断）
    1 没有 就显示收货地址的按钮 
    2 有信息 把收货地址 显示到页面上即可  

3 购物
  1 数据在哪里 ？ 
    1 在商品的详情页面 点击 “加入购物车” 
      1 把购物车相关的数据 发送到后台 ！！！ 
  !   2 自己在小程序的缓存中 来存储 商品数据  数组格式 
      
  2 页面一打开 获取缓存中的购物车数据 循环显示即可 
        
 */


import regeneratorRuntime from '../../lib/runtime/runtime';
import {getSetting,openSetting,chooseAddress} from '../../utils/wxAsync'

Page({

 
  data: {
    //收货地址
    address:{}
  },

  onLoad: function (options) {

    
      
    
      
  },


 
  onShow: function () {
    
    
    //判断一下本地存储中有没有收货地址   赋值给data中的address 然后在页面判断 如果address存在就显示按钮
    const address = wx.getStorageSync('address') || {};
    this.setData({
      address
    })
    console.log(this.data.address);
  },


  //点击按钮获取收货地址的方法
  async handleGetAddress(){

    //先判断有没有授权   或者 是不是拒绝授权过  wx-getSetting() 的返回值是一个对象 
    // 该对象的authSetting属性 是空对象 就是还没授权
    // 不是空对象 就是授权过 但是可能是拒绝授权
    //拒绝授权的话 authSetting 的 scope.address属性就是false 
    //  ！！！scope.address 这个属性名比较奇葩 所以要用中括号的方式来获取这个属性值
    
    const auth = (await getSetting()).authSetting["scope.address"];  //这个值可能是undefined 或者false
    // console.log(auth === false);
    
    if(auth === false){
      // debugger;
      await openSetting()  //打开授权页面
    };

    const res = await chooseAddress()  // 获取地址
    //把数据存在本地存储中
    wx.setStorageSync('address', res);
      
  }

})