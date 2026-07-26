"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Scene = {
  id: string;
  index: string;
  glyph: string;
  name: string;
  place: string;
  city: string;
  category: string;
  elapsed: string;
  lastDate: string;
  quote: string;
  memory: string;
  unfinished: string;
  current: string[];
  past: string[];
  inference: string;
  confidence: string;
  message: string;
  actions: { eyebrow: string; title: string; description: string }[];
  primary: string;
  completed: string;
  footprint: string;
  mapClass: string;
};

const scenes: Scene[] = [
  {
    id: "cafe",
    index: "01",
    glyph: "咖",
    name: "慢一点的愿望",
    place: "梧桐巷咖啡馆",
    city: "上海 · 徐汇",
    category: "情绪与创作",
    elapsed: "287 天后",
    lastDate: "去年 10 月 13 日 · 16:42",
    quote: "最近太匆忙了，想找一天慢慢走走。",
    memory:
      "你在靠窗的位置写下一段城市随笔，收藏了 6 首民谣，还规划了一条没有走完的老城路线。",
    unfinished: "走完那条路，并把这一天写下来",
    current: ["再次进入同一地点", "今天晴 · 23°C", "距离日落 1 小时 32 分"],
    past: ["深度对话 42 分钟", "散步路线完成 40%", "保存了 6 首歌"],
    inference:
      "你可能仍想从紧绷的节奏里抽身。现在的天气与时间适合继续那次散步，也适合重新开始记录。",
    confidence: "92%",
    message:
      "你又来到梧桐巷了。287 天前，你在这里说想慢一点。我更新了那条没走完的路线，也找回了当时的歌。要从上次停下的地方继续吗？",
    actions: [
      {
        eyebrow: "路线 · 已更新",
        title: "日落前的 48 分钟",
        description: "移除 1 家已打烊店铺，新增 2 处顺路街角。",
      },
      {
        eyebrow: "歌单 · 已找回",
        title: "那天下午的 6 首歌",
        description: "从第一首《南方》开始，接回当时的听觉记忆。",
      },
      {
        eyebrow: "随笔 · 已起笔",
        title: "写给重返这里的你",
        description: "“去年我来这里，是为了逃离匆忙……”",
      },
    ],
    primary: "开始今天的散步",
    completed: "路线已开始，歌单已接续。新的随笔会随着这次散步慢慢长出来。",
    footprint: "3 份记忆 · 1 个未完心愿",
    mapClass: "anchor-cafe",
  },
  {
    id: "study",
    index: "02",
    glyph: "习",
    name: "离完成只差两项",
    place: "南山自习室",
    city: "深圳 · 南山",
    category: "目标与成长",
    elapsed: "21 天后",
    lastDate: "7 月 5 日 · 19:18",
    quote: "下次先补项目数据，再练自我介绍。",
    memory:
      "你把作品集改到第三部分，标记了两个逻辑缺口，并约定下一次集中完成最后的收尾。",
    unfinished: "完成作品集，并练熟面试自我介绍",
    current: ["工作日晚间再次到达", "预计停留 90 分钟", "作品集仍未完成"],
    past: ["连续专注 3 次", "第三部分待补数据", "习惯 45 分钟一轮"],
    inference:
      "这里是你的高专注空间。与其重新规划，今晚更适合直接恢复进度，把剩余任务拆成可完成的三段。",
    confidence: "89%",
    message:
      "欢迎回来。你上次在这里把作品集改到第三部分，离完成只差两项。我把今晚 90 分钟拆成了三个专注阶段，也准备了两版自我介绍。要继续吗？",
    actions: [
      {
        eyebrow: "专注计划 · 已排好",
        title: "今晚的 3 个阶段",
        description: "补数据 35 分钟、改叙事 30 分钟、模拟表达 25 分钟。",
      },
      {
        eyebrow: "作品集 · 待收尾",
        title: "只看最关键的 2 处",
        description: "补充转化率依据，重写项目结果的第一句话。",
      },
      {
        eyebrow: "表达 · 已生成",
        title: "两版 60 秒自我介绍",
        description: "业务结果版与成长叙事版，均沿用你的真实经历。",
      },
    ],
    primary: "继续上次的进度",
    completed: "第一段 35 分钟专注已开启。作品集停留的位置和所需资料都已恢复。",
    footprint: "7 份记忆 · 2 项待完成",
    mapClass: "anchor-study",
  },
  {
    id: "station",
    index: "03",
    glyph: "行",
    name: "把上次复盘带上车",
    place: "虹桥高铁站",
    city: "上海 · 闵行",
    category: "出差与行动",
    elapsed: "35 天后",
    lastDate: "6 月 21 日 · 08:06",
    quote: "开场太绕了，下次先说结论。",
    memory:
      "上次出差前，你准备了客户谈判重点、餐厅备选和返程方案；回来后留下了一条明确复盘。",
    unfinished: "把复盘变成下一次更从容的出发",
    current: ["再次抵达同一车站", "10:30 有客户会议", "距发车还有 26 分钟"],
    past: ["保存 1 条谈判复盘", "客户偏好先听结论", "上次会前准备 8 分钟"],
    inference:
      "这不是一次新的行程，而是一次可以复用经验的重访。现在最有价值的是在上车前快速进入状态。",
    confidence: "95%",
    message:
      "又来出差了。根据上次复盘，我把谈判开场改成了 30 秒结论版，也重新整理了会前清单和返程备选。上车前要快速过一遍吗？",
    actions: [
      {
        eyebrow: "谈判 · 已改写",
        title: "30 秒先说结论",
        description: "先对齐收益，再给依据，最后留下两个可选合作方案。",
      },
      {
        eyebrow: "会前 · 5 项检查",
        title: "不用再临时翻记录",
        description: "报价底线、关键案例、客户顾虑、决策人、下一步。",
      },
      {
        eyebrow: "行程 · 已整理",
        title: "返程与晚餐备选",
        description: "两班可改签车次，一家上次错过的本地老店。",
      },
    ],
    primary: "开始 3 分钟会前准备",
    completed: "会前速览已开始。元宝会在 3 分钟内只带你过最关键的内容。",
    footprint: "5 份记忆 · 1 条复盘",
    mapClass: "anchor-station",
  },
  {
    id: "home",
    index: "04",
    glyph: "家",
    name: "还没写完的家族故事",
    place: "外婆家的小镇",
    city: "浙江 · 湖州",
    category: "关系与人生记忆",
    elapsed: "1 年后",
    lastDate: "去年春节 · 20:24",
    quote: "这些故事如果不记下来，以后可能没人知道了。",
    memory:
      "你记录了三段外婆讲的往事，想整理成一篇家族小传，还留下五个没来得及继续问的问题。",
    unfinished: "把家里的故事写成可以留下来的东西",
    current: ["节日前再次回到小镇", "家庭成员今晚到齐", "故事草稿停留在第一章"],
    past: ["保存 3 段口述故事", "5 个问题未询问", "外婆偏爱轻松聊天"],
    inference:
      "今晚是继续这份记录的自然时机。比起正式采访，一张温和的聊天卡更容易让故事自然发生。",
    confidence: "87%",
    message:
      "回到外婆家了。去年你在这里记下了三段家里的故事，还留了五个没来得及问的问题。我把它们整理成一张轻松的聊天卡，也为家族小传排好了第一章。今晚想继续听她讲吗？",
    actions: [
      {
        eyebrow: "聊天卡 · 已整理",
        title: "5 个自然的问题",
        description: "从旧照片、儿时游戏和一道拿手菜轻轻聊起。",
      },
      {
        eyebrow: "小传 · 已编排",
        title: "第一章：河边的老房子",
        description: "按人物与年份整理已有片段，保留外婆的原话。",
      },
      {
        eyebrow: "时间轴 · 已生成",
        title: "一家人的 7 个时刻",
        description: "从 1968 年到今天，留出继续补写的位置。",
      },
    ],
    primary: "打开今晚的聊天卡",
    completed: "聊天卡已打开。今晚的新故事会与去年的三段记忆接在一起。",
    footprint: "9 份记忆 · 5 个待问问题",
    mapClass: "anchor-home",
  },
];

const chain = [
  { number: "01", title: "到达", note: "空间触发" },
  { number: "02", title: "找回", note: "相关记忆" },
  { number: "03", title: "理解", note: "当下意图" },
  { number: "04", title: "准备", note: "可执行结果" },
  { number: "05", title: "决定", note: "用户掌控" },
];

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <i />
      <b />
    </span>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [activeId, setActiveId] = useState("cafe");
  const [stage, setStage] = useState(0);
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [showSettings, setShowSettings] = useState(false);
  const [mode, setMode] = useState("温和");
  const scene = useMemo(
    () => scenes.find((item) => item.id === activeId) ?? scenes[0],
    [activeId],
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("unfinished-atlas-feedback");
      if (saved) setFeedback(JSON.parse(saved));
      const savedMode = window.localStorage.getItem("unfinished-atlas-mode");
      if (savedMode) setMode(savedMode);
    } catch {
      // Device-local preferences are optional in the demo.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "unfinished-atlas-feedback",
        JSON.stringify(feedback),
      );
      window.localStorage.setItem("unfinished-atlas-mode", mode);
    } catch {
      // The experience remains fully usable without local storage.
    }
  }, [feedback, mode]);

  const selectScene = (id: string, shouldScroll = false) => {
    setActiveId(id);
    setStage(0);
    if (shouldScroll) {
      window.setTimeout(() => {
        document
          .getElementById("experience")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
    }
  };

  const startDemo = () => {
    setStage(1);
    document
      .getElementById("experience")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const recordFeedback = (value: string) => {
    setFeedback((current) => ({ ...current, [activeId]: value }));
    if (value === "accepted") setStage(5);
    if (value !== "accepted") setStage(0);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="未完地图首页">
          <LogoMark />
          <span>未完地图</span>
          <small>Unfinished Atlas</small>
        </a>
        <nav aria-label="主导航">
          <a href="#experience">体验</a>
          <a href="#principle">原理</a>
          <a href="#privacy">隐私</a>
        </nav>
        <Link className="mode-button enter-product-link" href="/">
          <span className="live-dot" /> 进入产品 ↗
        </Link>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span>元宝主动式服务</span>
            <span className="eyebrow-separator" />
            <span>时空记忆 Agent</span>
          </div>
          <h1>
            地图记得你
            <br />
            在哪里<span className="green-word">停下</span>
          </h1>
          <p className="hero-subtitle">
            元宝知道接下来做什么。
          </p>
          <p className="hero-description">
            把重要对话留在发生的地方。下一次重返，AI 会主动想起、理解，
            并替你准备好继续的一步。
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/">
              进入真实产品 <Arrow />
            </Link>
            <a className="text-button" href="#principle">
              它为什么会出现？
            </a>
          </div>
          <div className="hero-proof">
            <span className="proof-number">0</span>
            <span>
              无需输入一句话
              <br />
              地点就是这次服务的开始
            </span>
          </div>
        </div>

        <div className="atlas-card" aria-label="可交互的未完地图">
          <div className="atlas-topbar">
            <span>你的时间地图</span>
            <span className="atlas-count">4 个记忆锚点</span>
          </div>
          <div className="map-surface">
            <div className="contour contour-one" />
            <div className="contour contour-two" />
            <div className="contour contour-three" />
            <div className="route route-one" />
            <div className="route route-two" />
            <div className="route route-three" />
            <div className="map-date">
              <small>今天 · 16:24</small>
              <strong>{scene.elapsed}</strong>
            </div>
            {scenes.map((item) => (
              <button
                key={item.id}
                className={`map-anchor ${item.mapClass} ${
                  item.id === activeId ? "active" : ""
                }`}
                onClick={() => selectScene(item.id)}
                aria-label={`选择${item.place}`}
              >
                <span className="anchor-pulse" />
                <span className="anchor-core">{item.glyph}</span>
                <span className="anchor-label">
                  <strong>{item.place}</strong>
                  <small>{item.elapsed}</small>
                </span>
              </button>
            ))}
            <div className="map-story-card">
              <div className="story-glyph">{scene.glyph}</div>
              <div>
                <small>此刻选中</small>
                <strong>{scene.place}</strong>
                <span>{scene.footprint}</span>
              </div>
              <button onClick={startDemo} aria-label={`体验${scene.place}`}>
                ↗
              </button>
            </div>
          </div>
          <div className="atlas-caption">
            <span>每个亮点，都是一件等你回来继续的事。</span>
            <span>点击锚点切换故事</span>
          </div>
        </div>
      </section>

      <section className="belief-strip" aria-label="产品核心机制">
        <p>地点负责唤醒</p>
        <span>→</span>
        <p>记忆负责理解</p>
        <span>→</span>
        <p>Agent 负责继续</p>
      </section>

      <section className="experience-section" id="experience">
        <div className="section-heading">
          <div>
            <span className="section-kicker">一次完整的主动服务</span>
            <h2>不是翻旧聊天，<br />而是继续未完成的你。</h2>
          </div>
          <p>
            四个地点，四种人生需要，共用同一套主动链路。
            选择一个锚点，看看元宝如何在你没有提问时先走一步。
          </p>
        </div>

        <div className="scene-selector" role="tablist" aria-label="选择体验场景">
          {scenes.map((item) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={item.id === activeId}
              className={item.id === activeId ? "active" : ""}
              onClick={() => selectScene(item.id)}
            >
              <span className="scene-index">{item.index}</span>
              <span className="scene-icon">{item.glyph}</span>
              <span className="scene-label">
                <strong>{item.place}</strong>
                <small>{item.category}</small>
              </span>
              <span className="scene-arrow">↗</span>
            </button>
          ))}
        </div>

        <div className="demo-shell">
          <div className="demo-toolbar">
            <div className="location-state">
              <span className={stage > 0 ? "radar active" : "radar"} />
              <div>
                <strong>{scene.place}</strong>
                <small>{scene.city} · 模拟位置</small>
              </div>
            </div>
            <div className="no-input-badge">
              <span>0</span> 条用户输入
            </div>
            <button className="replay-button" onClick={() => setStage(0)}>
              ↻ 重播
            </button>
          </div>

          <div className="demo-layout">
            <aside className="memory-panel">
              <div className="panel-label">上次在这里</div>
              <div className="memory-date">{scene.lastDate}</div>
              <blockquote>“{scene.quote}”</blockquote>
              <p>{scene.memory}</p>
              <div className="unfinished-box">
                <small>留在这里的未完事项</small>
                <strong>{scene.unfinished}</strong>
              </div>
              <div className="memory-foot">
                <span className="mini-lock">⌁</span>
                仅使用你保存的记忆摘要
              </div>
            </aside>

            <section className="active-stage" aria-live="polite">
              {stage === 0 && (
                <div className="arrival-state">
                  <div className="arrival-visual">
                    <span className="arrival-ring ring-a" />
                    <span className="arrival-ring ring-b" />
                    <span className="arrival-ring ring-c" />
                    <span className="arrival-pin">{scene.glyph}</span>
                  </div>
                  <span className="stage-eyebrow">场景已就绪</span>
                  <h3>再次走进 {scene.place}</h3>
                  <p>点击后模拟系统地理围栏事件。无需向元宝发送消息。</p>
                  <button className="primary-button" onClick={() => setStage(1)}>
                    模拟进入这个地点 <Arrow />
                  </button>
                  {feedback[activeId] && (
                    <small className="saved-feedback">
                      上次反馈：
                      {feedback[activeId] === "accepted"
                        ? "已接受"
                        : feedback[activeId] === "later"
                          ? "稍后提醒"
                          : "已忽略"}
                    </small>
                  )}
                </div>
              )}

              {stage === 1 && (
                <div className="proactive-state stage-enter">
                  <div className="trigger-line">
                    <span className="trigger-pulse" />
                    位置触发 · 用户未发送消息
                  </div>
                  <div className="yuanbao-note">
                    <div className="note-mark"><LogoMark /></div>
                    <div>
                      <span className="stage-eyebrow">元宝主动出现</span>
                      <h3>{scene.name}</h3>
                      <p>{scene.message}</p>
                    </div>
                  </div>
                  <div className="stage-actions">
                    <button className="primary-button" onClick={() => setStage(2)}>
                      看看它记得什么 <Arrow />
                    </button>
                    <button className="quiet-button" onClick={() => recordFeedback("ignored")}>
                      这次不用
                    </button>
                  </div>
                </div>
              )}

              {stage === 2 && (
                <div className="recall-state stage-enter">
                  <span className="stage-eyebrow">02 · 找回相关记忆</span>
                  <h3>不是整段聊天，<br />只找回与此刻有关的部分。</h3>
                  <div className="signal-list past-list">
                    {scene.past.map((signal, index) => (
                      <div key={signal}>
                        <span>0{index + 1}</span>
                        <p>{signal}</p>
                        <b>相关</b>
                      </div>
                    ))}
                  </div>
                  <button className="primary-button" onClick={() => setStage(3)}>
                    结合此刻理解 <Arrow />
                  </button>
                </div>
              )}

              {stage === 3 && (
                <div className="understand-state stage-enter">
                  <span className="stage-eyebrow">03 · 理解当下意图</span>
                  <div className="reasoning-head">
                    <h3>过去 × 此刻</h3>
                    <span>意图置信度 {scene.confidence}</span>
                  </div>
                  <div className="context-grid">
                    {scene.current.map((signal) => (
                      <div key={signal}>
                        <span className="context-check">✓</span>
                        {signal}
                      </div>
                    ))}
                  </div>
                  <div className="inference-card">
                    <small>元宝的判断</small>
                    <p>{scene.inference}</p>
                  </div>
                  <button className="primary-button" onClick={() => setStage(4)}>
                    查看已经准备好的内容 <Arrow />
                  </button>
                </div>
              )}

              {stage === 4 && (
                <div className="prepare-state stage-enter">
                  <span className="stage-eyebrow">04 · 主动准备</span>
                  <h3>你还没开口，<br />下一步已经准备好了。</h3>
                  <div className="prepared-grid">
                    {scene.actions.map((action, index) => (
                      <article key={action.title}>
                        <span className="prepared-number">0{index + 1}</span>
                        <small>{action.eyebrow}</small>
                        <h4>{action.title}</h4>
                        <p>{action.description}</p>
                      </article>
                    ))}
                  </div>
                  <div className="decision-actions">
                    <button
                      className="primary-button"
                      onClick={() => recordFeedback("accepted")}
                    >
                      {scene.primary} <Arrow />
                    </button>
                    <button className="quiet-button" onClick={() => recordFeedback("later")}>
                      稍后提醒
                    </button>
                  </div>
                  <p className="control-note">元宝负责准备，是否行动始终由你决定。</p>
                </div>
              )}

              {stage === 5 && (
                <div className="complete-state stage-enter">
                  <div className="complete-mark">✓</div>
                  <span className="stage-eyebrow">05 · 由你决定</span>
                  <h3>这一次，接上了。</h3>
                  <p>{scene.completed}</p>
                  <div className="new-memory">
                    <span>新的时间切片</span>
                    <strong>今天 · 此刻</strong>
                    <p>本次行动与反馈会成为下一次重逢时的理解依据。</p>
                  </div>
                  <button className="outline-button" onClick={() => setStage(0)}>
                    再体验一次
                  </button>
                </div>
              )}
            </section>

            <aside className="chain-panel">
              <div className="panel-label">主动链路</div>
              <div className="chain-list">
                {chain.map((item, index) => {
                  const stepNumber = index + 1;
                  const isActive = stage === stepNumber;
                  const isDone = stage > stepNumber;
                  return (
                    <button
                      key={item.number}
                      className={`${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                      onClick={() => {
                        if (stage >= stepNumber) setStage(stepNumber);
                      }}
                      disabled={stage < stepNumber}
                    >
                      <span className="chain-number">{isDone ? "✓" : item.number}</span>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.note}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="chain-foot">
                <span className="live-dot" />
                {stage === 0 ? "等待进入锚点" : stage === 5 ? "服务已完成" : "链路正在运行"}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="difference-section" id="principle">
        <div className="section-heading compact">
          <div>
            <span className="section-kicker">它到底特别在哪里</span>
            <h2>传统提醒知道你到了。<br />未完地图知道你为何回来。</h2>
          </div>
        </div>
        <div className="difference-grid">
          <article className="difference-card large green-card">
            <span className="big-index">01</span>
            <div>
              <small>从位置到意图</small>
              <h3>同一个地点，<br />装着不同的你。</h3>
              <p>
                咖啡馆不只是“咖啡馆”。它可能装着一篇没写完的随笔，也可能装着一次想慢下来的决定。
              </p>
            </div>
            <div className="orbit-visual" aria-hidden="true">
              <span /><span /><span />
              <b>意图</b>
            </div>
          </article>
          <article className="difference-card cream-card">
            <span className="big-index">02</span>
            <small>从回忆到行动</small>
            <h3>不止告诉你过去，<br />还替现在准备下一步。</h3>
            <div className="mini-flow">
              <span>旧记忆</span><i>→</i><span>新行动</span>
            </div>
          </article>
          <article className="difference-card dark-card">
            <span className="big-index">03</span>
            <small>从主动到克制</small>
            <h3>AI 先看见，<br />决定权仍然属于你。</h3>
            <div className="choice-row">
              <span>接受</span><span>稍后</span><span>不再提醒</span>
            </div>
          </article>
        </div>
      </section>

      <section className="mechanism-section">
        <div className="mechanism-intro">
          <span className="section-kicker">一条可解释的链路</span>
          <h2>主动，不等于偷偷发生。</h2>
          <p>每一次出现，都能回答三个问题：为什么是这里、为什么是现在、为什么是这件事。</p>
        </div>
        <div className="mechanism-flow">
          {[
            ["01", "留下", "用户主动保存一次重要对话"],
            ["02", "重返", "系统地理围栏检测到再次到达"],
            ["03", "理解", "匹配授权记忆与当下上下文"],
            ["04", "准备", "先生成可执行的下一步"],
            ["05", "决定", "接受、稍后、忽略或关闭"],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="privacy-section" id="privacy">
        <div className="privacy-copy">
          <span className="section-kicker">被理解，也被尊重</span>
          <h2>记住多少、<br />何时出现，都由你。</h2>
          <p>
            正式产品使用系统级地理围栏，只在进入已授权地点时触发一次；不持续读取轨迹，也不默认保存所有对话。
          </p>
          <button className="outline-button" onClick={() => setShowSettings(true)}>
            查看主动设置
          </button>
        </div>
        <div className="privacy-cards">
          <article>
            <span>仅</span>
            <div><h3>只记你主动留下的</h3><p>普通问答不会自动成为空间锚点。</p></div>
          </article>
          <article>
            <span>隐</span>
            <div><h3>只使用模糊位置</h3><p>匹配地点范围，不记录完整移动轨迹。</p></div>
          </article>
          <article>
            <span>控</span>
            <div><h3>随时关闭与删除</h3><p>单次忽略、地点静音或一键清空。</p></div>
          </article>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <LogoMark />
          <span>未完地图</span>
        </div>
        <p>让每一次故地重游，都接得上那时的你。</p>
        <Link href="/">进入产品体验 ↗</Link>
      </footer>

      {showSettings && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowSettings(false)}>
          <section
            className="settings-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setShowSettings(false)} aria-label="关闭">
              ×
            </button>
            <span className="section-kicker">主动服务设置</span>
            <h2 id="settings-title">元宝应该多主动？</h2>
            <p>位置和反馈仅保存在当前设备，用于本次概念演示。</p>
            <div className="mode-options">
              {["安静", "温和", "积极"].map((item) => (
                <button
                  key={item}
                  className={mode === item ? "active" : ""}
                  onClick={() => setMode(item)}
                >
                  <span>{mode === item ? "✓" : ""}</span>
                  <strong>{item}模式</strong>
                  <small>
                    {item === "安静"
                      ? "只在地图中留下提示"
                      : item === "温和"
                        ? "进入重要地点时提醒一次"
                        : "提前准备并主动展示结果"}
                  </small>
                </button>
              ))}
            </div>
            <div className="setting-row"><span>只在授权锚点触发</span><b>已开启</b></div>
            <div className="setting-row"><span>使用模糊位置范围</span><b>已开启</b></div>
            <button className="primary-button full-button" onClick={() => setShowSettings(false)}>
              保存设置
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
