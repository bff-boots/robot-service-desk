import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"
import { Link } from "react-router-dom"


function Home() {
  return (
    <>
      <section className="heading">
        <h1>机器人售后服务工作台</h1>
        <p>创建、跟进和复盘设备故障工单。</p>
      </section>

      <Link to='/new-ticket' className="btn btn-reverse btn-block">
        <FaQuestionCircle /> 创建售后工单
      </Link>

      <Link to='/tickets' className="btn btn-block">
        <FaTicketAlt /> 查看我的工单
      </Link>
      <Link to='/demo' className="btn btn-reverse btn-block">
        <FaTicketAlt /> 查看售后运营演示看板
      </Link>

    </>
  )
}

export default Home
