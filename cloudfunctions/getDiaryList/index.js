const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { page = 1, pageSize = 10 } = event
  const { OPENID } = cloud.getWXContext()
  
  try {
    const res = await db.collection('diaries')
      .where({
        _openid: OPENID
      })
      .orderBy('createdAt', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return {
      success: true,
      data: res.data
    }
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}