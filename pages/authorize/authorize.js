Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')//获取用户信息是否在当前版本可用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindGetUserInfo: function (e) {//点击的“拒绝”或者“允许
    console.log('e',e);
    if (e.detail.userInfo) {//点击了“允许”按钮，
      var that = this;
      // wx.request({//将用户信息传给后台数据库
      //   url: "https://mini.artibition.cn/vote/topic/like",
      //   params: {
      //     nickName: e.detail.userInfo.nickName,//微信昵称
      //     avatarUrl: e.detail.userInfo.avatarUrl,//微信头像
      //     province: e.detail.userInfo.province,//用户注册的省
      //     city: e.detail.userInfo.city//用户注册的市
      //   },
      //   method: "post",
      //   success(res){
      //     console.log('已授权');
      //   }
      //  })
        
      wx.redirectTo({
        url: '../index/index',
      })
    }
  }
})
