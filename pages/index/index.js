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
      network.getRequestLoading(app.globalData.baseUrl + 'banner/json', "", 'loading',
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

   getArticleList: function () {
      var that = this;
      var params = new Object();
      //   params.account = e.detail.value.username,
      //   params.password = e.detail.value.password,
      network.getRequestLoading(app.globalData.baseUrl + 'article/list/0/json', params, '',
         function (res) {
            console.log(res.data)
            that.setData({
               articleList: res.data.datas
            })
         },
         function (res) {
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
})