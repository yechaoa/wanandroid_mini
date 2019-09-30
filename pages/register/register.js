// pages/register/register.js
var network = require('../../utils/network.js');

Page({

   /**
    * 页面的初始数据
    */
   data: {
      username: "",
      password: "",
      repassword: ""
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {

   },

   formSubmit: function(e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      var warn = "";
      var flag = true;
      if (e.detail.value.username == "") {
         warn = "请输入账号";
      } else if (e.detail.value.password == "") {
         warn = "请输入密码";
      } else if (e.detail.value.repassword == "") {
         warn = "请确认密码";
      } else {
         flag = false;
         var params = new Object();
         params.username = e.detail.value.username
         params.password = e.detail.value.password
         params.repassword = e.detail.value.repassword
         network.postRequestLoading('user/register', params, '加载中',
            function(res) {
               console.log(res)
               if (-1 == res.errorCode) {
                  wx.showModal({
                     title: '提示',
                     content: res.errorMsg,
                     confirmColor: "#4CAF50",
                     showCancel: false
                  })
               } else {
                  wx.showModal({
                     title: '注册成功',
                     content: '返回登录',
                     confirmColor: "#4CAF50",
                     showCancel: false,
                     success(res) {
                        if (res.confirm) {
                           wx.navigateBack({
                              delta: 1
                           })
                        }
                     }
                  })
               }
            },
            function(res) {
               console.log(res)
            })
      }

      if (flag == true) {
         wx.showModal({
            title: '提示',
            content: warn,
            confirmColor: "#4CAF50",
            showCancel: false
         })
      }

   },

   clearUsername: function(e) {
      this.setData({
         username: '',
      })
   },

   clearPassword: function(e) {
      this.setData({
         password: '',
      })
   },

   clearRepassword: function(e) {
      this.setData({
         repassword: '',
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