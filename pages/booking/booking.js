const app = getApp()

Page({
  data: {
    companion: {},
    selectedType: 1,
    selectedDate: '',
    selectedTime: '',
    remark: '',
    dateOptions: [],
    timeOptions: ['09:00-12:00', '14:00-17:00', '19:00-21:00'],
    canSubmit: false
  },

  onLoad(options) {
    const tags = ['擅长倾听', '会下棋']
    this.setData({
      companion: {
        _id: options.id,
        name: options.name || '李阿姨',
        avatar: '/images/avatar1.png',
        tags: tags,
        tagsText: tags.join(' · ')
      }
    })
    this.generateDateOptions()
  },

  // 生成日期选项
  generateDateOptions() {
    const options = []
    const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const today = new Date()
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      options.push({
        date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        weekday: i === 0 ? '今天' : weekNames[date.getDay()],
        day: `${date.getMonth() + 1}/${date.getDate()}`
      })
    }
    
    this.setData({
      dateOptions: options,
      selectedDate: options[0].date
    })
    this.checkCanSubmit()
  },

  // 选择服务类型
  selectType(e) {
    this.setData({
      selectedType: parseInt(e.currentTarget.dataset.type)
    })
  },

  // 选择日期
  selectDate(e) {
    this.setData({
      selectedDate: e.currentTarget.dataset.date
    })
    this.checkCanSubmit()
  },

  // 选择时间
  selectTime(e) {
    this.setData({
      selectedTime: e.currentTarget.dataset.time
    })
    this.checkCanSubmit()
  },

  // 输入备注
  inputRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  // 检查是否可以提交
  checkCanSubmit() {
    const canSubmit = this.data.selectedDate && this.data.selectedTime
    this.setData({ canSubmit })
  },

  // 提交预约
  submitBooking() {
    if (!this.data.canSubmit) {
      wx.showToast({
        title: '请选择完整信息',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '确认预约',
      content: `陪伴者：${this.data.companion.name}\n日期：${this.data.selectedDate}\n时间：${this.data.selectedTime}`,
      success: (res) => {
        if (res.confirm) {
          // 调用云函数创建预约
          wx.showLoading({ title: '提交中...' })
          
          // 模拟提交
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '预约成功',
              icon: 'success',
              success: () => {
                setTimeout(() => {
                  wx.navigateBack()
                }, 1500)
              }
            })
          }, 1000)
        }
      }
    })
  }
})