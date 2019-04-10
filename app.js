//app.js
App({
  globalData: {
    appId: 'wxf3f07fcb46903cc3',
    secret: '2f07454b27b1093afb6f47e7c7ece663',
    openid: '',
    userInfo: {}
  },
  onLaunch: function() {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            method: 'POST',
            url: 'https://mini.artibition.cn/sns/jscode2session',
            data: {
              appid: that.globalData.appId,
              secret: that.globalData.secret,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success(res) {
              that.globalData.openid = res.data.openid;
            }
          })
        } else {
          console.log("获取用户登陆状态失败！" + res.errMsg);
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.redirectTo({
            url: '../authorize/authorize',
          })
        }
      }
    })
  },

})