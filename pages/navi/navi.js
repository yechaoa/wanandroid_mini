// pages/navi/navi.js
var network = require('../../utils/network.js');

Page({

   /**
    * 页面的初始数据
    */
   data: {
      titleDatas: [], //左边一级菜单
      childDatas: [], //右边子类菜单

      scrollTop: 100,
      activeIndex: 0, //一级菜单选中下标
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      var that = this;
      network.getRequestLoading('navi/json', "", 'loading',
         function(res) {
            console.log(res.data)
            that.setData({
               titleDatas: res.data,
               childDatas: res.data[0].articles
            })
         },
         function(res) {
            console.log(res)
         })
   },

   scroll: function(e) {
      console.log(e)
   },

   // 切换
   titleClick: function(e) {
      console.log(e)
      this.setData({
         activeIndex: e.currentTarget.dataset.index,
         childDatas: this.data.titleDatas[e.currentTarget.dataset.index].articles
      })
   },

   childClick: function(e) {
      console.log(e)
      wx.navigateTo({
         url: "/pages/web/web?url=" + e.currentTarget.dataset.link
      })
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function() {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function() {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function() {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function() {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function() {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   }
})