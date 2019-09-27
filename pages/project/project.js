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

      curPage: 1,//注意有的是从1开始 有的是从0开始
      hasMore: false,
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
         active: event.detail.index,
         curPage : 1
      })
      this.getChild(this.data.titleDatas[this.data.active].id)
   },

   getChild: function(cid) {
      var that = this;
      network.getRequestLoading('project/list/' + that.data.curPage + '/json?cid=' + cid, "", 'loading',
         function(res) {
            console.log(res.data)
            var lastArr = that.data.curPage == 1 ? [] : that.data.childDatas;
            if (res.data.datas.length < res.data.size) {
               that.setData({
                  childDatas: lastArr.concat(res.data.datas),
                  hasMore: false,
               });
            } else {
               that.setData({
                  childDatas: lastArr.concat(res.data.datas),
                  hasMore: true,
                  curPage: that.data.curPage + 1,
                  isFirstLoadOrderList: false,
               });
            }
            //选择新的tab之后 滑动到顶部
            wx.pageScrollTo({
               scrollTop: 0,
               duration: 300
            })
         },
         function(res) {
            console.log(res)
         })
   },

   itemClick: function(e) {
      console.log(e)
      //Toast(e.currentTarget.dataset.title);
      wx.navigateTo({
         url: "/pages/web/web?url=" + e.currentTarget.dataset.link + "&title=" + e.currentTarget.dataset.title
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
      var that = this;
      setTimeout(function () {
         that.setData({
            curPage: 1,
         })
         that.onLoad()
         wx.stopPullDownRefresh()
      }, 1500);
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {
      if (this.data.hasMore) {
         this.getChild(this.data.titleDatas[this.data.active].id)
      }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   }
})