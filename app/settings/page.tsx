"use client";

import { useState } from "react";
import ProductShell from "../components/ProductShell";

function Toggle({ value, onChange, label }: { value: boolean; onChange: () => void; label: string }) {
  return <button className={`product-toggle ${value ? "active" : ""}`} onClick={onChange} aria-label={label} aria-pressed={value}><span /></button>;
}

export default function SettingsPage() {
  const [mode, setMode] = useState("温和");
  const [geo, setGeo] = useState(true);
  const [summary, setSummary] = useState(true);
  const [weather, setWeather] = useState(true);
  const [calendar, setCalendar] = useState(false);

  return (
    <ProductShell title="设置" subtitle="决定元宝记住什么、何时出现">
      <div className="settings-page-grid">
        <section className="settings-main-card">
          <header><small>主动程度</small><h2>元宝应该多主动？</h2><p>你可以随时调整，单个地点也可以使用独立设置。</p></header>
          <div className="product-mode-options">
            {[
              ["安静", "只把机会留在“此刻”，不主动浮现"],
              ["温和", "进入重要地点时出现一次，不连续追问"],
              ["积极", "提前准备结果，并主动展示可执行内容"],
            ].map(([name, description]) => (
              <button key={name} className={mode === name ? "active" : ""} onClick={() => setMode(name)}>
                <span>{mode === name ? "✓" : ""}</span><strong>{name}模式</strong><p>{description}</p>
              </button>
            ))}
          </div>

          <div className="settings-group">
            <div className="settings-group-title"><small>位置与记忆</small><span>最小化采集</span></div>
            <div className="product-setting-row"><span><strong>系统地理围栏</strong><small>只判断是否进入授权地点，不保存完整轨迹</small></span><Toggle value={geo} onChange={() => setGeo(!geo)} label="系统地理围栏" /></div>
            <div className="product-setting-row"><span><strong>使用对话摘要</strong><small>触发时只读取授权摘要，不打开完整聊天记录</small></span><Toggle value={summary} onChange={() => setSummary(!summary)} label="使用对话摘要" /></div>
          </div>

          <div className="settings-group">
            <div className="settings-group-title"><small>可使用的当下信号</small><span>由你授权</span></div>
            <div className="product-setting-row"><span><strong>天气与时间</strong><small>判断当下是否适合继续某项活动</small></span><Toggle value={weather} onChange={() => setWeather(!weather)} label="天气与时间" /></div>
            <div className="product-setting-row"><span><strong>日历事件</strong><small>仅用于与地点相关的计划和准备</small></span><Toggle value={calendar} onChange={() => setCalendar(!calendar)} label="日历事件" /></div>
          </div>
        </section>

        <aside className="settings-side-card">
          <div className="privacy-orbit"><span /><span /><b>隐</b></div>
          <h2>主动服务，<br />不等于持续追踪。</h2>
          <p>正式产品使用系统级地理围栏。系统只在你进入授权区域时唤醒一次，元宝不会看到你从哪里来、经过哪里。</p>
          <div className="privacy-facts"><span><b>4</b><small>已授权地点</small></span><span><b>0</b><small>持续定位记录</small></span></div>
          <button className="clear-memory-button">管理或清空空间锚点</button>
          <small className="settings-device-note">当前 Demo 设置保存在本机设备</small>
        </aside>
      </div>
    </ProductShell>
  );
}
