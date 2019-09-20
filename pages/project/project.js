// pages/project/project.js
var network = require('../../utils/network.js');
import Toast from '../../vant-weapp/dist/toast/toast';

Page({

   /**
    * 页面的初始数据
    */
   data: {
      active: 0,

      titleDatas: [],
      childDatas: [],
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      var that = this;
      network.getRequestLoading('project/tree/json', "", 'loading',
         function(res) {
            console.log(res.data)
            that.setData({
               titleDatas: res.data
            })
            that.getChild(that.data.titleDatas[that.data.active].id)
         },
         function(res) {
            console.log(res)
         })
   },

   onChange(event) {
      this.setData({
         active: event.detail.index
      })
      this.getChild(this.data.titleDatas[this.data.active].id)
   },

   getChild: function(cid) {
      var that = this;
      network.getRequestLoading('project/list/1/json?cid=' + cid, "", 'loading',
         function(res) {
            console.log(res.data.datas)
            that.setData({
               childDatas: res.data.datas
            })
         },
         function(res) {
            console.log(res)
         })
   },

   itemClick: function(e) {
      console.log(e)
      Toast(e.currentTarget.dataset.title);
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