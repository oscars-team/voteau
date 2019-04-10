var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModel: true,
    show: false,
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
    liked: false
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
    console.log(e.detail.userInfo)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.data.postData.subs = [];
    this.loadData();
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