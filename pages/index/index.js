Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModel:true,
    show:false,
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
    nickName: '',
    avatarUrl: ''
  },

  formSubmit(e) {
    // this.postData();
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
          pageData: res.data
        })
        console.log(res);
      }
    })
  },
  postData() {
    var that = this;
    wx.request({
      url: 'https://mini.artibition.cn/vote/topic/2166554f-14f9-43ad-ae2b-cd9f59e065bf',
      method: "POST",
      data: that.data.postData,
      success(res) {
        console.log("postdata", res);
        wx.showToast({
          title: '成功',
        })
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
    wx.request({
      url: 'https://mini.artibition.cn/vote/topic/like',
      method: 'POST',
      data: {
        tid: e.like
      },
      success(res) {
        console.log(res);
        wx.showToast({
          title: '支持成功',
        })
      }
    })
  },
  getUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.data.postData.uid = 'wxuser';
    this.data.postData.subs = [];
    this.loadData();
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log('res', res.userInfo)
            }
          })
        }else{
           
        }
      }
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