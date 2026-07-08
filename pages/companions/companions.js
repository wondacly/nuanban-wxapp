const app = getApp()

Page({
  data: {
    currentFilter: 'distance',
    currentType: 'all',
    companions: [],
    loading: false,
    noMore: false,
    page: 1,
    pageSize: 10
  },

  onLoad(options) {
    const type = options.type || 'all'
    this.setData({ currentType: type })
    this.loadCompanions()
  },

  onReachBottom() {
    if (!this.data.noMore && !this.data.loading) {
      this.loadMore()
    }
  },

  // 设置筛选条件
  setFilter(e) {
    const filter = e.currentTarget.dataset.filter
    this.setData({
      currentFilter: filter,
      page: 1,
      companions: [],
      noMore: false
    })
    this.loadCompanions()
  },

  // 设置服务类型
  setType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentType: type,
      page: 1,
      companions: [],
      noMore: false
    })
    this.loadCompanions()
  },

  // 加载陪伴者列表
  loadCompanions() {
    this.setData({ loading: true })
    
    // 模拟数据
    const mockCompanions = [
      {
        _id: '1',
        name: '李阿姨',
        avatar: '/images/avatar1.png',
        age: 58,
        distance: '0.5km',
        tags: ['擅长倾听', '会下棋'],
        rating: 4.9,
        serviceCount: 32,
        isVerified: true
      },
      {
        _id: '2',
        name: '王大叔',
        avatar: '/images/avatar2.png',
        age: 62,
        distance: '1.2km',
        tags: ['懂养生', '爱散步'],
        rating: 4.8,
        serviceCount: 28,
        isVerified: true
      },
      {
        _id: '3',
        name: '陈奶奶',
        avatar: '/images/avatar3.png',
        age: 65,
        distance: '2.0km',
        tags: ['擅长倾听', '会做饭'],
        rating: 5.0,
        serviceCount: 45,
        isVerified: true
      },
      {
        _id: '4',
        name: '张阿姨',
        avatar: '/images/avatar1.png',
        age: 55,
        distance: '0.8km',
        tags: ['陪诊经验', '熟悉医院'],
        rating: 4.7,
        serviceCount: 18,
        isVerified: true
      },
      {
        _id: '5',
        name: '刘叔叔',
        avatar: '/images/avatar2.png',
        age: 60,
        distance: '1.5km',
        tags: ['认知训练', '退休护士'],
        rating: 4.9,
        serviceCount: 25,
        isVerified: true
      }
    ]

    // 根据筛选条件排序
    let sorted = [...mockCompanions]
    const filter = this.data.currentFilter
    if (filter === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating)
    } else if (filter === 'count') {
      sorted.sort((a, b) => b.serviceCount - a.serviceCount)
    } else {
      sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    }

    setTimeout(() => {
      this.setData({
        companions: sorted,
        loading: false
      })
    }, 500)
  },

  // 加载更多
  loadMore() {
    this.setData({ loading: true })
    // 实际应从云函数分页加载
    setTimeout(() => {
      this.setData({
        noMore: true,
        loading: false
      })
    }, 500)
  },

  // 导航到详情
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/companion-detail/companion-detail?id=${id}`
    })
  },

  // 联系陪伴者
  contactCompanion(e) {
    e.stopPropagation()
    const id = e.currentTarget.dataset.id
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
          // 打开微信客服
          wx.openCustomerServiceChat({
            extInfo: {url: ''},
            corpId: '',
            success: () => {},
            fail: () => {
              wx.showToast({
                title: '客服功能开发中',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  }
})