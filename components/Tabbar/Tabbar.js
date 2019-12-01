// components/Tabbar/Tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar_item:{  //父组件传过来的 tab栏辩题显示数据
      type:Array,
      value:[]
    },

    currentIndex:{
      type:Number,  //父组件传过来的 tab栏激活索引
      value:0
    }
  },  

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0    //被激活的索引
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击标题item
    handleTap(e){
      // console.log(e.currentTarget.dataset);
      const {index} =e.currentTarget.dataset
      this.triggerEvent('currentIndex',{index})
      
    }
  }
})
