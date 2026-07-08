const app = getApp()

Page({
  data: {
    greeting: '',
    currentDate: '',
    weather: '☀️ 晴 26°C',
    nearbyCompanions: [],
    stories: [
      {
        id: 1,
        avatar: '/images/avatar1.png',
        title: '李阿姨的暖心陪伴',
        desc: '每周三下午，我都会去陪张奶奶下棋聊天...'
      },
      {
        id: 2,
        avatar: '/images/avatar2.png',
        title: '医院里的临时家人',
        desc: '陪王爷爷看病已经半年了，从挂号到取药...'
      }
    ]
  },

  onLoad() {
    this.updateGreeting()
    this.updateDate()
    this.loadNearbyCompanions()
  },

  onShow() {
    this.updateGreeting()
  },

  // 更新问候语
  updateGreeting() {
    const hour = new Date().getHours()
    let greeting = ''
    if (hour < 6) greeting = '晚上好，早点休息'
    else if (hour < 9) greeting = '早上好，今天天气不错，出去走走吗？'
    else if (hour < 12) greeting = '上午好，今天想找人聊聊吗？'
    else if (hour < 14) greeting = '中午好，记得午休哦'
    else if (hour < 18) greeting = '下午好，今天过得怎么样？'
    else greeting = '晚上好，今天有什么想聊的吗？'
    
    this.setData({ greeting })
  },

  // 更新日期
  updateDate() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const weekday = weekdays[now.getDay()]
    
    this.setData({
      currentDate: `${year}年${month}月${date}日 ${weekday}`
    })
  },

  // 加载附近陪伴者
  loadNearbyCompanions() {
    // 模拟数据，实际应从云函数获取
    const mockCompanions = [
      {
        _id: '1',
        name: '李阿姨',
        avatar: '/images/avatar1.png',
        age: 58,
        distance: '0.5km',
        tags: ['擅长倾听', '会下棋'],
        rating: 4.9,
        serviceCount: 32
      },
      {
        _id: '2',
        name: '王大叔',
        avatar: '/images/avatar2.png',
        age: 62,
        distance: '1.2km',
        tags: ['懂养生', '爱散步'],
        rating: 4.8,
        serviceCount: 28
      },
      {
        _id: '3',
        name: '陈奶奶',
        avatar: '/images/avatar3.png',
        age: 65,
        distance: '2.0km',
        tags: ['擅长倾听', '会做饭'],
        rating: 5.0,
        serviceCount: 45
      }
    ]
    
    this.setData({
      nearbyCompanions: mockCompanions
    })
  },

  // 导航到陪伴者列表
  navigateToCompanions(e) {
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/companions/companions?type=${type}`
    })
  },

  // 导航到陪伴者详情
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/companion-detail/companion-detail?id=${id}`
    })
  }
})