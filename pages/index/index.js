//index.js
//获取应用实例
const app = getApp()
var network = require('../../utils/network.js');

Page({
   data: {
      imgUrls: [],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,

      swiperHeight: 0,
      swiperWidth: 0,

      articleList: [],

      curPage: 0,
      pageSize: 20,
      hasMore: false,
   },

   onLoad: function() {

      var that = this;

      wx.getSystemInfo({
         success: function(res) {
            that.setData({
               swiperWidth: res.screenWidth,
               swiperHeight: res.screenWidth / 2.06
            });
         }
      });

      this.getBanner()
      this.getArticleList()

   },

   getBanner: function() {
      var that = this;
      network.getRequestLoading('banner/json', "", '',
         function(res) {
            console.log(res.data)
            that.setData({
               imgUrls: res.data
            })
         },
         function(res) {
            console.log(res)
         })
   },

   getArticleList: function() {
      var that = this;
      var params = new Object();
      //   params.account = e.detail.value.username,
      //   params.password = e.detail.value.password,
      network.getRequestLoading('article/list/' + that.data.curPage + '/json', params, 'loading',
         function(res) {
            console.log(res.data)
            var lastArr = that.data.curPage == 0 ? [] : that.data.articleList;
            if (res.data.datas.length < that.data.pageSize) {
               that.setData({
                  articleList: lastArr.concat(res.data.datas),
                  hasMore: false
               });
            } else {
               that.setData({
                  articleList: lastArr.concat(res.data.datas),
                  hasMore: true,
                  // curPage: that.data.curPage + 1,
               });
            }
         },
         function(res) {
            console.log(res)
         })
   },


   // 切换
   swiperChange: function(e) {
      //console.log(e)
   },

   // 点击
   swipClick: function(e) {
      console.log(e)
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
         this.setData({
            curPage: this.data.curPage + 1,
         });
         this.getArticleList()
      }
   },
})