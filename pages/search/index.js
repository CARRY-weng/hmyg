
import request from '../../utils/request';
let timeId = -1;  //先设定一个定时器id

// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],  //搜索得到的列表
    inputValue:''  //输入框的数值
  },



  //搜索框的input事件  要根据输入的关键字发送请求
  handleInput(e){
    // console.log(e.detail.value);  //获取关键字
    
    let {value} =e.detail
    //防抖
    clearTimeout(timeId)  //清楚定时器  假如是在一秒内重新发送请求 就会把上一个定时器清除掉 然后再重新生成一个定时器 也就是把上一个请求请掉 然后再重新请求
    timeId=setTimeout(() => {
      
      request({url:"goods/qsearch", data:{query:value} })
      .then(res=>{
        this.setData({
          list:res.data.message
        })
        
      })
    }, 1000);
    
  },

  //取消事件
  handleTap(){
    // console.log('取消');
    this.setData({
      list:[] //将列表清空
    });
    this.setData({
      inputValue:''
    })
  }

  
})