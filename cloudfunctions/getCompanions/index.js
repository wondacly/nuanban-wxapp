const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

exports.main = async (event, context) => {
  const { type, filter, page = 1, pageSize = 10, longitude, latitude } = event
  
  try {
    let whereCondition = {}
    
    // 按服务类型筛选
    if (type && type !== 'all') {
      whereCondition.serviceTypes = _.in([parseInt(type)])
    }
    
    // 构建查询
    let query = db.collection('companions').where(whereCondition)
    
    // 按距离排序（如果有位置信息）
    if (longitude && latitude) {
      query = query.orderBy('geo', 'asc')
    } else if (filter === 'rating') {
      query = query.orderBy('rating', 'desc')
    } else if (filter === 'count') {
      query = query.orderBy('serviceCount', 'desc')
    } else {
      query = query.orderBy('createdAt', 'desc')
    }
    
    // 分页
    const res = await query
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    // 计算距离（简化版）
    const companions = res.data.map(item => {
      let distance = item.distance || '未知'
      return {
        ...item,
        distance
      }
    })
    
    return {
      success: true,
      data: companions,
      total: companions.length
    }
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}