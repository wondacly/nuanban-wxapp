Page({
  data: {
    diaries: [
      {
        _id: '1',
        date: '2026-07-06',
        mood: '开心',
        moodIcon: '😊',
        content: '今天陪李奶奶去公园散步，天气很好。我们一起唱了老歌，她特别开心，还教我打太极。中午吃了她亲手包的饺子，味道真好。',
        photos: ['/images/photo1.png', '/images/photo2.png'],
        elderlyName: '李奶奶',
        duration: '3小时'
      },
      {
        _id: '2',
        date: '2026-07-05',
        mood: '平静',
        moodIcon: '😌',
        content: '陪王爷爷去医院复查，帮他挂号、取药。医生说他恢复得不错。回来的路上买了他爱吃的香蕉。',
        photos: [],
        elderlyName: '王爷爷',
        duration: '2.5小时'
      }
    ]
  },

  onLoad() {
    // 实际应从云函数加载日记列表
  },

  // 预览图片
  previewImage(e) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({
      urls: [src]
    })
  },

  // 添加日记
  addDiary() {
    wx.showToast({
      title: '添加日记开发中',
      icon: 'none'
    })
  }
})