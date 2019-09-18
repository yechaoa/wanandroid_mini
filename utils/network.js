/**
 * url:请求的url
 * params:请求参数
 * message:loading提示信息
 * success:成功的回调
 * fail:失败的回调
 */

function postRequest(url, params, success, fail) {
     this.postRequestLoading(url, params, "", success, fail)
}

function postRequestLoading(url, params, message, success, fail) {
     if (message != "") {
          wx.showLoading({
               title: message,
          })
     }
     const postRequestTask = wx.request({
          url: url,
          data: params,
          header: {
               'content-type': 'application/x-www-form-urlencoded',
               'cookie': wx.getStorageSync('Set-Cookie')
          },
          method: 'POST',
          success: function (res) {
               if (message != "") {
                    wx.hideLoading()
               }
               if (res.statusCode == 200) {
                    if (res.header['Set-Cookie'] && res.header['Set-Cookie'] != ''){
                         wx.setStorageSync('Set-Cookie', res.header['Set-Cookie'])
                    }
                    success(res.data)
               } else {
                    fail(res)
               }
          },
          fail: function (res) {
               if (message != "") {
                    wx.hideLoading()
               }
               fail(res)
          }
     })

}

function getRequest(url, params, success, fail) {
     this.getRequestLoading(url, params, "", success, fail)
}

function getRequestLoading(url, params, message, success, fail) {
     if (message != "") {
          wx.showLoading({
               title: message,
          })
     }
     const getRequestTask = wx.request({
          url: url,
          data: params,
          header: {
               'Content-Type': 'application/json',
               'cookie': wx.getStorageSync('Set-Cookie')
          },
          method: 'GET',
          success: function (res) {
               if (message != "") {
                    wx.hideLoading()
               }
               if (res.statusCode == 200) {
                    if (res.header['Set-Cookie'] && res.header['Set-Cookie'] != '') {
                         wx.setStorageSync('Set-Cookie', res.header['Set-Cookie'])
                    }
                    success(res.data)
               } else {
                    fail(res)
               }
          },
          fail: function (res) {
               if (message != "") {
                    wx.hideLoading()
               }
               fail(res)
          }
     })
}

function abortPostRequest(url, params, success, fail) {
     postRequestTask.abort()
}

function abortGetRequest(url, params, success, fail) {
     getRequestTask.abort()
}

module.exports = {
     postRequest: postRequest,
     postRequestLoading: postRequestLoading,
     getRequest: getRequest,
     getRequestLoading: getRequestLoading,
     abortPostRequest: abortPostRequest,
     abortGetRequest: abortGetRequest
}