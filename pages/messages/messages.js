Page({
  data: {
    messages: [
      {
        id: 1,
        name: '李阿姨',
        avatar: '/images/avatar1.png',
        lastMessage: '好的，明天下午两点见',
        time: '14:30',
        unread: true,
        unreadCount: 2
      },
      {
        id: 2,
        name: '王大叔',
        avatar: '/images/avatar2.png',
        lastMessage: '我已经到医院门口了',
        time: '昨天',
        unread: false,
        unreadCount: 0
      }
    ]
  },

  onLoad() {
    // 实际应从云函数加载消息列表
  },

  openChat() {
    wx.showToast({
      title: '聊天功能开发中',
      icon: 'none'
    })
  }
})