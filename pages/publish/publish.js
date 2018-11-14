Page({
  data: {
    address: "点击选择,记得勾选哦~",
    success: false
  },

  staticData: {
    type: "buy"
  },
  handleAddressClick() {
    wx.chooseLocation({
      success: this.handleChooseLocationSucc.bind(this)
    })
  },
  handleChooseLocationSucc(res) {

    this.setData({
      address: res.address
    });
    Object.assign(this.staticData, {
      longitude: res.longitude,
      latitude: res.latitude
    })
  },
  handleTypeChange(e) {

    this.staticData.type = e.detail.value;

  },

  handleMessageChange(e) {

    this.staticData.message = e.detail.value;
  },

  handleContactChange(e) {

    this.staticData.contact = e.detail.value;
  },

  handleSubmit() {
    if (this.data.address == "点击选择,记得勾选哦~" || !this.data.address) {
      wx.showToast({
        title: "请填写地址",
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    if (!this.staticData.message) {
      wx.showToast({
        title: "请填写说明",
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    if (!this.staticData.contact) {
      wx.showToast({
        title: "请填写联系方式",
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/add_item',
      data: {
        address: this.data.address,
        latitude: this.staticData.latitude,
        longitude: this.staticData.longitude,
        message: this.staticData.message,
        contact: this.staticData.contact,
        type: this.staticData.type,
        distinct: "whd_cource"
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.handleSubmitSucc.bind(this)
    })

  },
  handleSubmitSucc(res) {
   //  if (res.data && res.data.ret) {
      this.setData({
        success: true
      })
// }
    
  },
  handleBackTap(){
    wx.navigateBack({
      
    })
  }
  
})