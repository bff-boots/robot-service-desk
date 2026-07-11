const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  product: {
    type: String,
    required: [true, 'Please select a product'],
    enum: ['巡检机器人', '配送机器人', '协作机械臂', '视觉检测设备', '其他设备']
  },
  serialNumber: { type: String, required: [true, 'Please enter device serial number'] },
  faultType: {
    type: String,
    required: true,
    enum: ['无法启动', '导航异常', '机械臂异常', '视觉识别异常', '网络连接异常', '其他'],
  },
  priority: { type: String, enum: ['P1', 'P2', 'P3'], default: 'P2' },
  assignedEngineer: { type: String, default: '待分配' },
  slaDueAt: { type: Date },
  rootCause: { type: String, default: '' },
  description: {
    type: String,
    required: [true, 'Please enter a description of the issue']
  },
  status: {
    type: String,
    required:true,
    enum:['新建', '处理中', '待客户确认', '已关闭'],
    default: '新建'
  }
}, {
  timestamps : true
})

module.exports = mongoose.model('Tickets', ticketSchema)
