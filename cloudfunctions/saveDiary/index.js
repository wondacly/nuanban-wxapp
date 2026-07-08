const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { bookingId, content, photos, mood, elderlyName, duration } = event
  const { OPENID } = cloud.getWXContext()
  
  try {
    const diary = {
      _openid: OPENID,
      bookingId: bookingId || '',
      content,
      photos: photos || [],
      mood,
      elderlyName: elderlyName || '',
      duration: duration || '',
      createdAt: db.serverDate()
    }
    
    const res = await db.collection('diaries').add({ data: diary })
    
    return {
      success: true,
      data: {
        diaryId: res._id
      }
    }
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}