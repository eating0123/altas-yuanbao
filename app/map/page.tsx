import Link from "next/link";
import ProductShell from "../components/ProductShell";
import { scenes } from "../product-data";

export default function MapPage() {
  return (
    <ProductShell
      title="时间地图"
      subtitle="4 个被你留下过重要对话的地方"
      trailing={<span className="map-permission-pill"><i /> 模糊位置已授权</span>}
    >
      <div className="product-map-layout">
        <section className="product-map-card">
          <header>
            <div><small>今天 · 16:24</small><strong>你的空间记忆</strong></div>
            <div className="map-legend"><span><i className="legend-live" />当前地点</span><span><i />记忆锚点</span></div>
          </header>
          <div className="product-map-surface">
            <div className="product-contour product-contour-a" />
            <div className="product-contour product-contour-b" />
            <div className="product-contour product-contour-c" />
            <div className="product-route product-route-a" />
            <div className="product-route product-route-b" />
            <div className="product-route product-route-c" />
            <span className="current-location-label">你现在在这里</span>
            {scenes.map((scene) => (
              <Link
                key={scene.id}
                href={scene.id === "cafe" ? "/" : `/scene/${scene.id}`}
                className={`product-map-anchor ${scene.mapClass}`}
              >
                <span className="product-map-pulse" />
                <span className="product-map-core">{scene.glyph}</span>
                <span className="product-map-label">
                  <small>{scene.elapsed}</small>
                  <strong>{scene.place}</strong>
                  <i>{scene.memoryCount} 份记忆 · {scene.unfinishedCount} 项未完</i>
                </span>
              </Link>
            ))}
            <div className="product-map-now-card">
              <span className="now-card-glyph">咖</span>
              <div><small>当前模拟位置</small><strong>梧桐巷咖啡馆</strong><p>发现 1 个可以继续的心愿</p></div>
              <Link href="/">进入对话 ↗</Link>
            </div>
          </div>
        </section>

        <aside className="map-activity-panel">
          <header><div><small>此刻</small><h2>元宝看见了什么</h2></div><span className="activity-live">实时</span></header>
          <article className="active-opportunity">
            <span className="opportunity-tag">值得出现</span>
            <h3>你回到了梧桐巷</h3>
            <p>287 天前留在这里的散步计划仍未完成，且此刻天气与时间都适合继续。</p>
            <Link href="/">查看元宝的主动消息 ↗</Link>
          </article>
          <div className="activity-list">
            <small>最近的地点记忆</small>
            {scenes.slice(1).map((scene) => (
              <Link key={scene.id} href={`/scene/${scene.id}`}>
                <span>{scene.glyph}</span>
                <span><strong>{scene.place}</strong><small>{scene.lastVisit}</small></span>
                <b>{scene.elapsed}</b>
              </Link>
            ))}
          </div>
          <div className="map-quiet-note"><span>静</span><p><strong>没有机会时，元宝保持安静</strong><small>只在地点、记忆和当下需求同时匹配时出现。</small></p></div>
        </aside>
      </div>
    </ProductShell>
  );
}
