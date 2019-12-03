
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
    this.setData({
      address
    })
    // console.log(this.data.address);
    //获取本地购物车内容
    const cats = wx.getStorageSync('cats') || [];
    this.setData({
      cats
    })
    // console.log(cats);
    
    this.countAll(cats)
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
  //单个商品选择框的勾选与否的事件 
  handleChecked(e){  
    /* 
    1 如何知道用户点击的是哪个 商品呢 （可以根据 id 或者索引来获取到该元素 ）
     */
    // console.log(e);
    let {cats} = this.data;
    let {index} = e.currentTarget.dataset;
    // 对选中状态 做取反
    cats[index].isChecked = !cats[index].isChecked;
    this.setData({
      cats
    });
    wx.setStorageSync('cats', cats); 
    this.countAll(cats) //重新计算总价格
  },

  //点击加减按钮事件
  handleNumUpdate(e){
    // console.log(e);
    let {cats} = this.data
    const {index,unit} = e.currentTarget.dataset;  //获取对应索引和对应的unit
    // console.log(cats[index]);
    if(unit===1 && cats[index].num>=cats[index].goods_number){
      //当点击+号的时候 （unit===1 就是点了+号） 超过库存了 提示用户
      wx.showToast({
        title: '库存不足',
        icon: 'none',
        duration: 1500,
        mask: true
      });
        
    }else if(unit===-1 && cats[index].num===1){
      //数量为1 但是点了-号(unit===-1就是点了减号)的时候就是要删除 问一下用户
      wx.showModal({
        title: '警告',
        content: '您是否要删除该商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            //点击了确认删除 就是删除掉数组中的一项
            cats.splice(index,1)
            this.setData({  //然后把数组赋值回去
              cats
            });
            wx.setStorageSync('cats', cats);  //更新缓存
            this.countAll(cats) //重新计算总价格
          }
        },
        fail: () => {},
        complete: () => {}
      });
        

    }else{
      //正常情况 的加减
      cats[index].num += unit;
      this.setData({
        cats
      });
      wx.setStorageSync('cats', cats);  //更新缓存
      this.countAll(cats) //重新计算总价格
    }

  },

  //全选框的点击事件
  handleItemAll(){
    //获取自己的选中状态
    // console.log('点击了全选');
    
    let {allChecked,cats} = this.data;
    allChecked=!allChecked; //点击就是自己状态取反
    cats.forEach(v => {
      v.isChecked=allChecked;  //将自己状态与每个单项状态保持一致

    });
    this.setData({
      cats
    });
    wx.setStorageSync('cats', cats);  //更新缓存
    this.countAll(cats) //重新计算总价格
  }

})