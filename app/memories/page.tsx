"use client";

import Link from "next/link";
import { useState } from "react";
import ProductShell from "../components/ProductShell";
import { scenes } from "../product-data";

export default function MemoriesPage() {
  const [filter, setFilter] = useState("全部");
  const [selected, setSelected] = useState(scenes[0].id);
  const scene = scenes.find((item) => item.id === selected) ?? scenes[0];

  return (
    <ProductShell
      title="记忆库"
      subtitle="只保存你主动留下的地点与对话摘要"
      trailing={<button className="new-anchor-button">＋ 留下新的锚点</button>}
    >
      <div className="memory-library">
        <section className="memory-list-panel">
          <div className="memory-summary-row">
            <article><span>4</span><small>地点锚点</small></article>
            <article><span>24</span><small>记忆摘要</small></article>
            <article><span>9</span><small>未完事项</small></article>
          </div>
          <div className="memory-filter-row">
            {['全部', '有未完事项', '最近到访'].map((item) => (
              <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>
          <div className="memory-anchor-list">
            {scenes.map((item) => (
              <button key={item.id} className={item.id === selected ? "active" : ""} onClick={() => setSelected(item.id)}>
                <span className="library-glyph">{item.glyph}</span>
                <span className="library-copy">
                  <small>{item.category}</small>
                  <strong>{item.place}</strong>
                  <p>{item.memory}</p>
                  <i>{item.lastVisit}</i>
                </span>
                <span className="library-stats"><b>{item.memoryCount}</b><small>份记忆</small><em>{item.unfinishedCount} 项未完</em></span>
              </button>
            ))}
          </div>
        </section>

        <aside className="memory-detail-panel">
          <header>
            <span>{scene.glyph}</span>
            <div><small>空间锚点</small><h2>{scene.place}</h2><p>{scene.city} · 温和提醒</p></div>
            <button>···</button>
          </header>
          <blockquote>“{scene.quote}”</blockquote>
          <section>
            <small>留在这里的未完事项</small>
            <h3>{scene.goal}</h3>
            <div className="goal-progress"><i /><span>仍在等待继续</span></div>
          </section>
          <section className="memory-detail-timeline">
            <small>相关记忆摘要</small>
            {scene.pastSignals.map((signal, index) => (
              <div key={signal}><span>0{index + 1}</span><p>{signal}</p><b>保留</b></div>
            ))}
          </section>
          <div className="memory-detail-actions">
            <Link href={scene.id === "cafe" ? "/" : `/scene/${scene.id}`}>模拟重返这里 ↗</Link>
            <button>编辑锚点</button>
          </div>
          <p className="memory-local-note">⌁ 仅展示授权摘要；你可以随时删除这个地点。</p>
        </aside>
      </div>
    </ProductShell>
  );
}
