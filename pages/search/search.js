// pages/search/search.js
var network = require('../../utils/network.js');

Page({

   /**
    * 页面的初始数据
    */
   data: {

      inputShowed: false,
      inputVal: "",

      hotkeyDatas: [],

      articleList: [],

      curPage: 0,
      hasMore: true,
      isDisplay: true,

   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      this.getHotkey()
   },

   getHotkey: function() {
      var that = this;
      network.getRequestLoading('hotkey/json', "", 'loading',
         function(res) {
            console.log(res.data)
            that.setData({
               hotkeyDatas: res.data
            });
         },
         function(res) {
            console.log(res)
         })
   },

   showInput: function() {
      this.setData({
         inputShowed: true,
         isDisplay: true
      });
   },
   hideInput: function() {
      this.setData({
         inputVal: "",
         inputShowed: false
      });
   },
   clearInput: function() {
      this.setData({
         inputVal: "",
         isDisplay: true
      });
   },
   inputTyping: function(e) {
      console.log(e)
      this.setData({
         inputVal: e.detail.value
      });
   },

   doSearch: function(e) {
      console.log(e)
      this.setData({
         inputVal: e.detail.value,
         curPage: 0,
         isDisplay: false
      });
      this.getArticleList()
   },

   clickTag: function(e) {
      console.log(e)
      this.setData({
         inputVal: e.currentTarget.dataset.name,
         inputShowed: true,
         curPage: 0,
         isDisplay: false
      });
      this.getArticleList()
   },

   getArticleList: function() {
      var that = this;
      var params = new Object();
      params.k = that.data.inputVal
      network.postRequestLoading('article/query/' + that.data.curPage + '/json', params, 'loading',
         function(res) {
            console.log(res.data)
            var lastArr = that.data.curPage == 0 ? [] : that.data.articleList;
            if (res.data.datas.length < res.data.size) {
               that.setData({
                  articleList: lastArr.concat(res.data.datas),
                  hasMore: false
               });
            } else {
               that.setData({
                  articleList: lastArr.concat(res.data.datas),
                  hasMore: true,
               });
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

   iconClick: function(e) {
      console.log(e)
      if (e.currentTarget.dataset.collect)
         this.doUnCollect(e.currentTarget.dataset.id)
      else
         this.doCollect(e.currentTarget.dataset.id)
   },

   doCollect: function(id) {
      var that = this;
      network.postRequestLoading('lg/collect/' + id + '/json', "", 'loading',
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
                  title: '收藏成功',
                  icon: 'success',
                  duration: 1000
               })
               that.getArticleList()
            }
         },
         function(res) {
            console.log(res)
         })

   },

   doUnCollect: function(id) {
      var that = this;
      network.postRequestLoading('lg/uncollect_originId/' + id + '/json', "", 'loading',
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
               that.getArticleList()
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
      if (this.data.hasMore) {
         this.setData({
            curPage: this.data.curPage + 1,
         });
         this.getArticleList()
      }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   }
})