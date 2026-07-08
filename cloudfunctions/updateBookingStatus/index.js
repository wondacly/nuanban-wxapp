const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { bookingId, status } = event
  const { OPENID } = cloud.getWXContext()
  
  try {
    // 验证权限
    const booking = await db.collection('bookings').doc(bookingId).get()
    
    if (booking.data._openid !== OPENID) {
      return {
        success: false,
        error: '无权限操作'
      }
    }
    
    await db.collection('bookings').doc(bookingId).update({
      data: {
        status,
        updatedAt: db.serverDate()
      }
    })
    
    return {
      success: true
    }
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}