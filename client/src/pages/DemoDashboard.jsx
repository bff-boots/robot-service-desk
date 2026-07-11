import { Link } from 'react-router-dom'

const tickets = [
  {id:'RS-24018', device:'巡检机器人', fault:'导航异常', priority:'P1', owner:'张工', status:'处理中', sla:'00:38', risk:'生产区域停机'},
  {id:'RS-24021', device:'协作机械臂', fault:'机械臂异常', priority:'P2', owner:'待分配', status:'新建', sla:'06:12', risk:'工位节拍受影响'},
  {id:'RS-24009', device:'视觉检测设备', fault:'视觉识别异常', priority:'P2', owner:'李工', status:'待客户确认', sla:'18:40', risk:'等待样本复核'},
  {id:'RS-23996', device:'配送机器人', fault:'网络连接异常', priority:'P3', owner:'王工', status:'已关闭', sla:'已完成', risk:'已沉淀排查步骤'},
]

function DemoDashboard() {
  return <section className="demo-dashboard">
    <div className="demo-heading"><div><p className="eyebrow">PORTFOLIO DEMO · ROBOT AFTER-SALES</p><h1>机器人售后工单闭环看板</h1><p>模拟演示数据：用于展示故障分级、SLA 跟进和根因复盘流程，不对应真实客户或设备。</p></div><Link className="btn" to="/new-ticket">创建工单</Link></div>
    <div className="demo-kpis"><article><strong>24</strong><span>本周工单</span></article><article><strong className="danger-text">3</strong><span>SLA 即将超时</span></article><article><strong>92%</strong><span>首次响应达标率</span></article><article><strong>4.6h</strong><span>平均关闭时长</span></article></div>
    <div className="workflow"><span>新建</span><i>→</i><span>处理中</span><i>→</i><span>待客户确认</span><i>→</i><span>已关闭 / 根因复盘</span></div>
    <div className="ticket-board"><div className="ticket-board-head"><h2>优先处理队列</h2><span>按风险、SLA 与客户影响排序</span></div>{tickets.map(ticket => <article className="demo-ticket" key={ticket.id}><div><b>{ticket.id}</b><small>{ticket.device} · {ticket.fault}</small></div><span className={`priority ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span><div><b>{ticket.status}</b><small>工程师：{ticket.owner}</small></div><div><b className={ticket.sla === '00:38' ? 'danger-text' : ''}>{ticket.sla}</b><small>SLA 剩余时间</small></div><p>{ticket.risk}</p></article>)}</div>
    <div className="review-card"><h2>根因复盘与知识沉淀</h2><p>工单关闭后记录故障根因、处理动作、是否复发和知识库更新建议，形成“故障处理 → 客户确认 → 经验沉淀”的服务闭环。</p><div><span>故障分类</span><span>排查步骤</span><span>备件建议</span><span>预防动作</span></div></div>
  </section>
}

export default DemoDashboard
