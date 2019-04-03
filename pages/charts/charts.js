// pages/charts/charts.js
var wxCharts = require("../../utils/wxcharts.js");
var columnChart = null;
var chartData = {
  main: {
    title: '总成交量',
    data: [5, 10, 9, 100, 12],
    categories: ["薛顿", "莫里森", "工党", "自由党", "国家党", "绿党"]
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chartTitle: '选票排行'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.log('error');
    }
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: "column",
      animation: 'true',
      categories: chartData.main.categories,
      series: [{
        name: "票数",
        data: chartData.main.data,
        format: function(val, name) {
          return val.toFixed(2) + '票'
        }
      }],
      yAxis: {
        format: function(val) {
          return val + '票'
        },
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 180,
    })
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