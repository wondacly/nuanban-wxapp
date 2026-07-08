App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'your-cloud-env-id',
        traceUser: true
      })
    }
    
    // 获取用户信息
    this.getUserInfo()
  },

  globalData: {
    userInfo: null,
    userRole: 'elderly', // elderly: 老人/家属, companion: 陪伴者
    systemInfo: null
  },

  getUserInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.globalData.systemInfo = res
      }
    })
  },

  // 切换用户角色
  switchRole(role) {
    this.globalData.userRole = role
    wx.setStorageSync('userRole', role)
  }
})