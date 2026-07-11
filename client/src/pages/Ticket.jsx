import {useSelector, useDispatch} from 'react-redux'
import {getTicket,closeTicket} from '../features/tickets/ticketSlice'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
// import { getNotes, createNote } from '../features/notes/notesSlice'
// import NoteItem from '../components/NoteItem'

function Ticket() {
  const {ticket, isLoading, isError} = useSelector(state=> state.ticket)
  // const {notes, isLoading: notesIsLoading} = useSelector(state=> state.notes)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const ticketId = params.ticketId

  // Close Ticket
  const onTicketClose = (e)=>{
    e.preventDefault()
    dispatch(closeTicket(ticketId))
    toast.success('工单已关闭，请补充根因复盘信息')
    navigate('/tickets')
  }

  useEffect(() => {
    dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
    // dispatch(getNotes(ticketId)).unwrap().catch(toast.error)
  }, [ticketId, dispatch])

  if(isLoading){
    return <Spinner />
  }
  if(isError){
    return <h3>工单加载失败</h3>
  }

  return (
    <div className='ticket-page'>
      <header className="ticket-header">
        <BackButton url='/tickets' />
        <h2>
          工单编号：{ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>创建时间：{new Date(ticket.createdAt).toLocaleString('zh-CN')}</h3>
        <h3>设备类型：{ticket.product}</h3>
        <h3>设备序列号：{ticket.serialNumber || '待补充'} ｜ 故障类型：{ticket.faultType || '待分类'} ｜ 优先级：{ticket.priority || 'P2'}</h3>
        <h3>处理工程师：{ticket.assignedEngineer || '待分配'} ｜ SLA 截止：{ticket.slaDueAt ? new Date(ticket.slaDueAt).toLocaleString('zh-CN') : '待计算'}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>故障描述</h3>
          <p>{ticket.description}</p>
        </div>
        {/* <h2>Notes</h2> */}
      </header>
{/* 
      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )} */}

      {ticket.status !=='closed' && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>关闭工单并进入复盘</button>
      )}
    </div>
  )
}

export default Ticket
