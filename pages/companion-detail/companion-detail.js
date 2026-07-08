const app = getApp()

Page({
  data: {
    companion: {},
    showFullIntro: false,
    weekDays: [],
    timeSlots: [
      { time: '09:00-12:00', available: true },
      { time: '14:00-17:00', available: false },
      { time: '19:00-21:00', available: true }
    ]
  },

  onLoad(options) {
    const id = options.id
    this.loadCompanionDetail(id)
    this.generateWeekDays()
  },

  // 生成一周日期
  generateWeekDays() {
    const days = []
    const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const today = new Date()
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push({
        name: i === 0 ? '今天' : weekNames[date.getDay()],
        date: `${date.getMonth() + 1}/${date.getDate()}`
      })
    }
    
    this.setData({ weekDays: days })
  },

  // 加载陪伴者详情
  loadCompanionDetail(id) {
    // 模拟数据
    const mockDetail = {
      _id: id,
      name: '李阿姨',
      avatar: '/images/avatar1.png',
      age: 58,
      location: '北京朝阳',
      tags: ['擅长倾听', '会下棋', '懂养生', '爱聊天'],
      rating: 4.9,
      serviceCount: 32,
      isVerified: true,
      intro: '大家好，我是一名退休教师，喜欢和人交流，擅长倾听和陪伴。我有30年的教育工作经验，非常理解老年人的心理需求。平时喜欢下棋、散步、养生，希望能为您的家人带来温暖和快乐。我住在朝阳区，交通便利，可以提供上门陪伴服务。',
      serviceTypes: [1, 2],
      serviceType1Active: true,
      serviceType2Active: true,
      serviceType3Active: false
    }
    
    this.setData({
      companion: mockDetail
    })
  },

  // 展开/收起自我介绍
  toggleIntro() {
    this.setData({
      showFullIntro: !this.data.showFullIntro
    })
  },

  // 选择时间
  selectTime(e) {
    const index = e.currentTarget.dataset.index
    const slot = this.data.timeSlots[index]
    
    if (!slot.available) {
      wx.showToast({
        title: '该时段已被预约',
        icon: 'none'
      })
      return
    }
    
    wx.showToast({
      title: '已选择：' + slot.time,
      icon: 'none'
    })
  },

  // 联系陪伴者
  contactCompanion() {
    wx.showModal({
      title: '联系陪伴者',
      content: '是否拨打陪伴者电话或发起微信会话？',
      confirmText: '拨打',
      cancelText: '微信',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '13800138000'
          })
        } else if (res.cancel && !res.confirm) {
          wx.showToast({
            title: '客服功能开发中',
            icon: 'none'
          })
        }
      }
    })
  },

  // 预约陪伴者
  bookCompanion() {
    wx.navigateTo({
      url: `/pages/booking/booking?id=${this.data.companion._id}&name=${this.data.companion.name}`
    })
  }
})