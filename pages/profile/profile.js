const app = getApp()

Page({
  data: {
    userInfo: {},
    userRole: 'elderly',
    userRoleText: '我是老人/家属',
    isVerified: false
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    this.loadUserInfo()
  },

  loadUserInfo() {
    const role = app.globalData.userRole || wx.getStorageSync('userRole') || 'elderly'
    this.setData({
      userRole: role,
      userRoleText: role === 'companion' ? '我是陪伴者' : '我是老人/家属',
      userInfo: {
        name: role === 'companion' ? '李阿姨' : '张奶奶',
        avatar: '/images/avatar1.png'
      }
    })
  },

  // 切换角色
  switchRole() {
    wx.showActionSheet({
      itemList: ['我是老人/家属', '我是陪伴者'],
      success: (res) => {
        const role = res.tapIndex === 0 ? 'elderly' : 'companion'
        app.switchRole(role)
        this.setData({
          userRole: role,
          userRoleText: role === 'companion' ? '我是陪伴者' : '我是老人/家属'
        })
        wx.showToast({
          title: '身份已切换',
          icon: 'success'
        })
      }
    })
  },

  // 页面导航
  navigateTo(e) {
    const page = e.currentTarget.dataset.page
    wx.navigateTo({
      url: `/pages/${page}/${page}`
    })
  },

  // 显示赞赏码
  showRewardCode() {
    wx.showModal({
      title: '赞赏码',
      content: '是否生成您的个人赞赏码？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '赞赏码生成中',
            icon: 'loading'
          })
          // 实际应调用云函数生成赞赏码图片
          setTimeout(() => {
            wx.previewImage({
              urls: ['https://example.com/reward-code.png']
            })
          }, 1000)
        }
      }
    })
  },

  // 实名认证
  navigateToVerify() {
    wx.showModal({
      title: '实名认证',
      content: '请上传身份证正反面照片进行认证',
      confirmText: '上传',
      success: (res) => {
        if (res.confirm) {
          wx.chooseImage({
            count: 2,
            success: () => {
              wx.showToast({
                title: '已提交审核',
                icon: 'success'
              })
              this.setData({ isVerified: true })
            }
          })
        }
      }
    })
  },

  // 设置紧急联系人
  setEmergencyContact() {
    wx.showModal({
      title: '紧急联系人',
      content: '请输入紧急联系人电话',
      editable: true,
      success: (res) => {
        if (res.confirm && res.content) {
          wx.setStorageSync('emergencyContact', res.content)
          wx.showToast({
            title: '已保存',
            icon: 'success'
          })
        }
      }
    })
  },

  // 显示隐私协议
  showPrivacy() {
    wx.navigateTo({
      url: '/pages/profile/privacy'
    })
  },

  // 编辑档案
  editProfile() {
    wx.showToast({
      title: '档案编辑开发中',
      icon: 'none'
    })
  },

  // 查看收入
  viewIncome() {
    wx.showToast({
      title: '收入统计开发中',
      icon: 'none'
    })
  }
})