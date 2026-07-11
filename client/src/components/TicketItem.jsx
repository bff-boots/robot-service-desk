import { Link } from 'react-router-dom'

function TicketItem({ ticket }) {
  return (
    <div className='ticket'>
      <div>{new Date(ticket.createdAt).toLocaleString('zh-CN')}</div>
      <div>{ticket.product}</div>
      <div>{ticket.priority || 'P2'}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
        查看
      </Link>
    </div>
  )
}

export default TicketItem
