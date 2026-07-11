import { useState, useEffect } from "react"
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import { createTicket, reset } from "../features/tickets/ticketSlice"
import { useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {
  const user = useSelector((state) => state.auth.user)
  const [product,setProduct] = useState('巡检机器人')
  const [description,setDescription] = useState('')
  const [serialNumber,setSerialNumber] = useState('')
  const [faultType,setFaultType] = useState('无法启动')
  const [priority,setPriority] = useState('P2')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {isLoading, isError, isSuccess, message} = useSelector((state)=> state.ticket)



  useEffect(()=>{
    if(isError){
      toast.error(message)
      console.log(message)
    }

    // redirect when logged in
    if(isSuccess){
      console.log('Success')
      dispatch(reset())
      navigate('/tickets')
   }

   dispatch(reset())


 },[isSuccess, isError, message, dispatch, navigate])

  const onSubmit = (e)=>{
    e.preventDefault()
    dispatch(createTicket({product, description, serialNumber, faultType, priority}))
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className="section heading">
        <h1>创建机器人售后工单</h1>
        <p>记录设备故障并生成可追踪的服务任务</p>
      </section>

      <section className="form">
        <div className="form-group">
            <label htmlFor="name">客户名称</label>
          <input type="text" className='form-control' name="name" id="name" value={user.name} disabled/>
        </div>
        <div className="form-group">
            <label htmlFor="name">客户邮箱</label>
          <input type="text" className='form-control' name="email" id="name" value={user.email} disabled/>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">设备类型</label>
            <select name="product" id="product" value={product} onChange={(e)=> setProduct(e.target.value)}>
              <option value='巡检机器人'>巡检机器人</option>
              <option value='配送机器人'>配送机器人</option>
              <option value='协作机械臂'>协作机械臂</option>
              <option value='视觉检测设备'>视觉检测设备</option>
              <option value='其他设备'>其他设备</option>
            </select>
          </div>
          <div className="form-group"><label htmlFor="serialNumber">设备序列号</label><input id="serialNumber" className="form-control" value={serialNumber} onChange={(e)=>setSerialNumber(e.target.value)} placeholder="例如：RB-2026-001" /></div>
          <div className="form-group"><label htmlFor="faultType">故障类型</label><select id="faultType" value={faultType} onChange={(e)=>setFaultType(e.target.value)}><option>无法启动</option><option>导航异常</option><option>机械臂异常</option><option>视觉识别异常</option><option>网络连接异常</option><option>其他</option></select></div>
          <div className="form-group"><label htmlFor="priority">服务优先级</label><select id="priority" value={priority} onChange={(e)=>setPriority(e.target.value)}><option value="P1">P1｜安全或生产中断</option><option value="P2">P2｜核心功能受影响</option><option value="P3">P3｜一般咨询或优化</option></select></div>
          <div className="form-group">
            <label htmlFor="description">故障描述</label>
            <textarea name="description" id="description" className="form-control" placeholder="请描述故障现象、发生时间、现场影响和已尝试的处理方式" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">提交工单</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
