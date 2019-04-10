var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTip: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pageData: {},
    //  postData {
    //   uid: '',
    //   subs: [{
    //     id: '',
    //     ops: [{
    //       id: '',
    //       order: 1
    //     }]
    //   }]
    // }
    postData: {},

    liked: false,
    scroll: [1, 2, 3, 4, 5]

  },

  formSubmit(e) {
    this.postData();
  },
  support(e) {
    var that = this;
    if (that.data.postData.subs.find(p => p.id == e.currentTarget.dataset.sid)) {
      let sub = that.data.postData.subs.find(p => p.id == e.currentTarget.dataset.sid)
      sub.ops = [{
        id: e.currentTarget.dataset.ops.Id,
        order: e.currentTarget.dataset.ops.Order
      }];
    } else {
      that.data.postData.subs.push({
        id: e.currentTarget.dataset.sid,
        ops: [{
          id: e.currentTarget.dataset.ops.Id,
          order: e.currentTarget.dataset.ops.Order,
        }]
      })
    }
  },
  loadData() {
    var that = this
    wx.request({
      url: 'https://mini.artibition.cn/vote/topic/2166554f-14f9-43ad-ae2b-cd9f59e065bf',
      method: "GET",
      success(res) {
        that.setData({
          pageData: res.data,
          liked: wx.getStorageSync('like:' + res.data.Id) == '1'
        })
        console.dir(res.data);
      }
    })
  },
  postData() {
    var that = this;
    that.data.postData.uid = app.globalData.openid;
    wx.request({
      url: 'https://mini.artibition.cn/vote/topic/2166554f-14f9-43ad-ae2b-cd9f59e065bf',
      method: "POST",
      data: that.data.postData,
      success(res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '投票成功',
          })
          that.loadData();
        }
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log();
      }
    })
  },
  like(e) {
    var that = this;
    wx.request({
      url: 'https://mini.artibition.cn/vote/topic/like',
      method: 'POST',
      data: {
        tid: e.currentTarget.dataset.like
      },
      success(res) {
        if (res.statusCode == 200) {
          that.setData({
            pageData: { ...that.data.pageData,
              Likes: res.data
            },
            liked: true
          })
          wx.setStorageSync('like:' + e.currentTarget.dataset.like, '1');
        }
      }
    })
  },
  getUserInfo(e) {
    var self = this;
    if (e && e.detail.userInfo) {
      self.setData({
        showTip: false
      })
    }

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.data.postData.subs = [];
    this.loadData();

    var self = this;
    // if (app.globalData.userInfo) {
    //   console.log("用户已授权");
    // } else if (this.data.canIUse) {
    //   console.log("请求用户授权");
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    // 登录
    wx.login({
      success: res => {
        //console.log(res);
        var code = res.code; //登录凭证
        if (code) {
          app.globalData.code = code;
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    //console.log(res);
                    app.globalData.userInfo = res.userInfo
                    if (res.userInfo) {
                      // 可以将 res 发送给后台解码出 unionId
                    } else {
                      self.setData({
                        showTip: true
                      });
                    }
                  }
                })
              } else {
                self.setData({
                  showTip: true
                });
              }
            },
            fail: function() {
              console.log('获取用户信息失败')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // } else {
    //   console.log("用户未授权");
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //     }
    //   })
    // }

  },
exit(){
   this.setData({
     showTip:false
   })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
    var shareObj = {
      title: this.data.pageData.Title,
      imageUrl: this.data.pageData.Media,
      success(res) {

      }
    }

    return shareObj;
  }
})