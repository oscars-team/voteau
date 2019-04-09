Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData: {},
    postData: {
      uid: String,
      subs: [{
        id: String,
        ops: [{
          id: String,
          order: 1
        }]
      }]
    }
  },

  formSubmit(e) {
    console.log('OK', e);
  },
  support(e) {
    var that = this
    console.log('e', e);
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
      success(res) {
        console.log("res", res);
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
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadData();
    // this.postData();
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