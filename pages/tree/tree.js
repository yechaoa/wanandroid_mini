// pages/tree/tree.js
const app = getApp()
var network = require('../../utils/network.js');

Page({

   /**
    * 页面的初始数据
    */
   data: {

      gridData: [],

      icons: [
         "../../images/0.png",
         "../../images/1.png",
         "../../images/2.png",
         "../../images/3.png",
         "../../images/4.png",
         "../../images/5.png",
         "../../images/6.png",
         "../../images/7.png",
         "../../images/8.png",
         "../../images/9.png",
      ],
      grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],

   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      console.log(this.data.icons[Math.round(Math.random() * (this.data.icons.length - 1))])

      var that = this;
      network.getRequestLoading(app.globalData.baseUrl + 'tree/json', "", 'loading',
         function(res) {
            console.log(res.data)
            // 重新组合对象
            for (var i = 0; i < res.data.length; ++i) {
               var arr = [];
               var a = {
                  icon: "",
                  text: ""
               };
               arr.push({
                  icon: that.data.icons[Math.round(Math.random() * (that.data.icons.length - 1))],
                  text: res.data[i].name,
               })
               that.setData({
                  gridData: that.data.gridData.concat(arr)
               })
            }
         },
         function(res) {
            console.log(res)
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