const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { id } = event
  
  try {
    const res = await db.collection('companions').doc(id).get()
    
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