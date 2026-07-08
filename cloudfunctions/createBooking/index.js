const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { companionId, serviceType, date, timeSlot, note } = event
  const { OPENID } = cloud.getWXContext()
  
  try {
    // 创建预约记录
    const booking = {
      _openid: OPENID,
      companionId,
      serviceType,
      status: 'pending',
      date,
      timeSlot,
      note: note || '',
      createdAt: db.serverDate()
    }
    
    const res = await db.collection('bookings').add({ data: booking })
    
    return {
      success: true,
      data: {
        bookingId: res._id
      }
    }
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}