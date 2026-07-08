const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { status } = event
  const { OPENID } = cloud.getWXContext()
  
  try {
    let whereCondition = {
      _openid: OPENID
    }
    
    if (status) {
      whereCondition.status = status
    }
    
    const res = await db.collection('bookings')
      .where(whereCondition)
      .orderBy('createdAt', 'desc')
      .get()
    
    // 获取陪伴者信息
    const bookings = await Promise.all(res.data.map(async (booking) => {
      try {
        const companionRes = await db.collection('companions').doc(booking.companionId).get()
        return {
          ...booking,
          companionName: companionRes.data.name,
          companionAvatar: companionRes.data.avatar
        }
      } catch (e) {
        return booking
      }
    }))
    
    return {
      success: true,
      data: bookings
    }
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}