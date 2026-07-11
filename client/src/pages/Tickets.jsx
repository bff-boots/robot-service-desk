import { useEffect } from "react"
import {useSelector,useDispatch} from 'react-redux'
import {getTickets, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
// import BackButton from '../components/BackButton'
import {toast} from 'react-toastify'
import BackButton from "../components/BackButton"
import TicketItem from "../components/TicketItem"

function Tickets() {
  const {tickets, isLoading, isSuccess, isError, message} = useSelector(state=> state.ticket)

  const dispatch = useDispatch()

  useEffect(()=>{
    return ()=>{
      if(isSuccess){
        dispatch(reset())
      }

      if(isError){
        toast.error(message)
      }

    }
  },[isSuccess, dispatch,isError, message, tickets])

  useEffect(()=>{
    dispatch(getTickets())
  }, [dispatch])

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>机器人售后工单</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>创建时间</div>
          <div>设备类型</div>
          <div>优先级</div>
          <div>处理状态</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets
