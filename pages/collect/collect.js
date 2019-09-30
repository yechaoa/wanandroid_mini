// pages/collect/collect.js
var network = require('../../utils/network.js');

Page({

   /**
    * 页面的初始数据
    */
   data: {
      collectData: [],
      originid: 0,

      curPage: 0,
      hasMore: true,
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      this.getCollectList()
   },

   getCollectList: function() {
      var that = this;
      network.getRequestLoading('lg/collect/list/' + that.data.curPage + '/json', "", 'loading',
         function(res) {
            console.log(res)
            if (-1001 == res.errorCode) {
               wx.showModal({
                  title: '提示',
                  content: res.errorMsg,
                  confirmColor: "#4CAF50",
                  showCancel: false,
                  success: function(res) {
                     wx.redirectTo({
                        url: '../login/login'
                     })
                  }
               })
            } else {
               var lastArr = that.data.curPage == 0 ? [] : that.data.collectData;
               if (res.data.datas.length < res.data.size) {
                  that.setData({
                     collectData: lastArr.concat(res.data.datas),
                     hasMore: false,
                  });
               } else {
                  that.setData({
                     collectData: lastArr.concat(res.data.datas),
                     hasMore: true,
                     curPage: that.data.curPage + 1
                  });
               }
            }
         },
         function(res) {
            console.log(res)
         })
   },

   itemClick: function(e) {
      console.log(e)
      wx.navigateTo({
         url: "/pages/web/web?url=" + e.currentTarget.dataset.link + "&title=" + e.currentTarget.dataset.title
      })
   },

   longClick: function(e) {
      console.log(e)
      var that = this;
      wx.showModal({
         title: '是否取消收藏？',
         content: e.currentTarget.dataset.title,
         confirmColor: "#4CAF50",
         showCancel: true,
         success: function(res) {
            if (res.confirm) {
               console.log('用户点击确定')
               that.setData({
                  originid: e.currentTarget.dataset.originid
               })
               that.unCollect(e.currentTarget.dataset.id)
            } else if (res.cancel) {
               console.log('用户点击取消')
            }
         }
      })
   },

   unCollect: function(id, originid) {
      var that = this;
      var params = new Object();
      params.originId = this.data.originid
      network.postRequestLoading('lg/uncollect/' + id + '/json', params, 'loading',
         function(res) {
            console.log(res)
            if (-1001 == res.errorCode) {
               wx.showModal({
                  title: '提示',
                  content: res.errorMsg,
                  confirmColor: "#4CAF50",
                  showCancel: false,
                  success: function(res) {
                     wx.navigateTo({
                        url: '../login/login'
                     })
                  }
               })
            } else {
               wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 1000
               })
               that.getCollectList()
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
      var that = this;
      setTimeout(function() {
         //重置分页
         that.setData({
            curPage: 0,
         })
         //重新加载一次
         that.onLoad()
         //停止下拉刷新
         wx.stopPullDownRefresh()
      }, 1500);
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {
      if (this.data.hasMore) {
         this.getCollectList()
      }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   }
})