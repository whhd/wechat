const app = getApp();

Page({
  data: {
    longitude: "",
    latitude: "",
    controls: [{

        iconPath: '/resources/pin.png',
        position: {
          left: (app.globalData.windowWidth / 2) - 16,
          top: ((app.globalData.windowHeight - 40) / 2) - 32,
          width: 32,
          height: 32

        }
      },
      {
        id: 1,
        iconPath: '/resources/center.png',
        position: {
          left: 20,
          top: app.globalData.windowHeight - 90,
          width: 30,
          height: 30
        },
        clickable: true
      }
    ]

  },
  onShow() {
    this.getLocation();
  },
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: this.handleGetLocationSuccess.bind(this)
    })
  },
  handleGetLocationSuccess(res) {
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude
    })
    console.log(res)
  },

  onReady() {
    this.mapCtx = wx.createMapContext('map')
  },
  controltap(e) {
    this.mapCtx.moveToLocation()
  },

  onShareAppMessage() {
    return {
      title: "萌宠交易平台",
      path: "/pages/index/index"
    }
  }
})