"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import ProductShell from "./ProductShell";
import { getScene, scenes } from "../product-data";

type CustomTurn = { id: number; user: string; assistant: string };

function YuanbaoAvatar() {
  return (
    <span className="yuanbao-avatar" aria-label="元宝">
      <i />
      <b />
    </span>
  );
}

export default function ConversationExperience({ sceneId }: { sceneId: string }) {
  const scene = getScene(sceneId);
  const [progress, setProgress] = useState(0);
  const [showWhy, setShowWhy] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showPlaces, setShowPlaces] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [input, setInput] = useState("");
  const [customTurns, setCustomTurns] = useState<CustomTurn[]>([]);

  useEffect(() => {
    setProgress(0);
    setShowWhy(false);
    setDismissed(false);
    setCustomTurns([]);
  }, [scene.id]);

  const resetConversation = () => {
    setProgress(0);
    setShowWhy(false);
    setDismissed(false);
    setCustomTurns([]);
  };

  const submitInput = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setCustomTurns((turns) => [
      ...turns,
      { id: Date.now(), user: trimmed, assistant: scene.inputReply },
    ]);
    setInput("");
  };

  return (
    <ProductShell
      title="此刻"
      subtitle="元宝主动服务已开启"
      trailing={
        <>
          <button className="product-text-button" onClick={resetConversation}>↻ 重新模拟</button>
          <button className="context-mobile-button" onClick={() => setShowContext(true)}>判断依据</button>
        </>
      }
    >
      <div className="conversation-product">
        <section className="conversation-main">
          <header className="conversation-header">
            <div className="current-place">
              <span className="current-place-pulse" />
              <span>
                <small>当前位置 · 模拟</small>
                <strong>{scene.place}</strong>
              </span>
            </div>
            <div className="place-switcher">
              <button onClick={() => setShowPlaces((value) => !value)}>
                切换模拟地点⌄
              </button>
              {showPlaces && (
                <div className="place-menu">
                  <small>选择一个地点重新体验</small>
                  {scenes.map((item) => (
                    <Link
                      key={item.id}
                      href={item.id === "cafe" ? "/" : `/scene/${item.id}`}
                      className={item.id === scene.id ? "active" : ""}
                    >
                      <span>{item.glyph}</span>
                      <span><strong>{item.place}</strong><small>{item.category}</small></span>
                      <b>{item.id === scene.id ? "当前" : "↗"}</b>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div className="conversation-scroll">
            <div className="conversation-day">今天</div>
            <div className="arrival-event">
              <span className="arrival-event-line" />
              <span className="arrival-event-icon">⌖</span>
              <div>
                <strong>你已进入 {scene.place}</strong>
                <small>系统地理围栏触发 · 没有发送消息</small>
              </div>
              <time>16:24</time>
              <span className="arrival-event-line" />
            </div>

            <div className="chat-row assistant-row">
              <YuanbaoAvatar />
              <div className="message-stack">
                <div className="message-author"><strong>元宝</strong><span>主动出现</span></div>
                <div className="chat-bubble assistant-bubble">
                  <p>{scene.proactiveMessage}</p>
                  <div className="memory-quote-inline">
                    <span>{scene.elapsed}</span>
                    <blockquote>“{scene.quote}”</blockquote>
                    <small>{scene.lastVisit}</small>
                  </div>
                </div>
                {!dismissed && progress === 0 && (
                  <div className="suggested-replies">
                    <button className="suggestion-primary" onClick={() => setProgress(1)}>
                      {scene.acceptReply}
                    </button>
                    {!showWhy && (
                      <button onClick={() => setShowWhy(true)}>你为什么现在提醒我？</button>
                    )}
                    <button onClick={() => setDismissed(true)}>这次不用</button>
                  </div>
                )}
              </div>
            </div>

            {showWhy && (
              <>
                <div className="chat-row user-row">
                  <div className="chat-bubble user-bubble">你为什么现在提醒我？</div>
                  <span className="mini-user-avatar">我</span>
                </div>
                <div className="chat-row assistant-row conversation-enter">
                  <YuanbaoAvatar />
                  <div className="message-stack">
                    <div className="message-author"><strong>元宝</strong></div>
                    <div className="chat-bubble assistant-bubble">
                      <p>{scene.whyMessage}</p>
                      <button className="evidence-link" onClick={() => setShowContext(true)}>
                        查看本次使用的 6 条信号 ↗
                      </button>
                    </div>
                    {!dismissed && progress === 0 && (
                      <div className="suggested-replies">
                        <button className="suggestion-primary" onClick={() => setProgress(1)}>
                          {scene.acceptReply}
                        </button>
                        <button onClick={() => setDismissed(true)}>先不用</button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {dismissed && (
              <>
                <div className="chat-row user-row">
                  <div className="chat-bubble user-bubble">这次不用。</div>
                  <span className="mini-user-avatar">我</span>
                </div>
                <div className="chat-row assistant-row conversation-enter">
                  <YuanbaoAvatar />
                  <div className="message-stack">
                    <div className="message-author"><strong>元宝</strong></div>
                    <div className="chat-bubble assistant-bubble compact-bubble">
                      <p>好，我不会继续打扰。这次忽略只影响当前提醒，不会删除你留在这里的记忆。</p>
                    </div>
                    <button className="inline-reset" onClick={resetConversation}>重新模拟这次到达</button>
                  </div>
                </div>
              </>
            )}

            {progress >= 1 && (
              <>
                <div className="chat-row user-row">
                  <div className="chat-bubble user-bubble">{scene.acceptReply}</div>
                  <span className="mini-user-avatar">我</span>
                </div>
                <div className="chat-row assistant-row conversation-enter">
                  <YuanbaoAvatar />
                  <div className="message-stack result-stack">
                    <div className="message-author"><strong>元宝</strong><span>已准备</span></div>
                    <div className="chat-bubble assistant-bubble result-intro">
                      <p>{scene.resultIntro}</p>
                    </div>
                    <div className="conversation-results">
                      {scene.actions.map((action, index) => (
                        <article key={action.title}>
                          <div className="result-card-top">
                            <span>0{index + 1}</span>
                            <small>{action.label}</small>
                          </div>
                          <h3>{action.title}</h3>
                          <p>{action.description}</p>
                          <div className="result-card-foot"><span>{action.meta}</span><b>打开 ↗</b></div>
                        </article>
                      ))}
                    </div>
                    {progress === 1 && (
                      <div className="suggested-replies result-replies">
                        <button className="suggestion-primary" onClick={() => setProgress(2)}>
                          {scene.primaryAction}
                        </button>
                        <button>先编辑一下</button>
                        <button onClick={() => setDismissed(true)}>稍后再说</button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {progress >= 2 && (
              <>
                <div className="chat-row user-row">
                  <div className="chat-bubble user-bubble">{scene.primaryAction}</div>
                  <span className="mini-user-avatar">我</span>
                </div>
                <div className="chat-row assistant-row conversation-enter">
                  <YuanbaoAvatar />
                  <div className="message-stack">
                    <div className="message-author"><strong>元宝</strong><span>正在进行</span></div>
                    <div className="chat-bubble assistant-bubble completion-bubble">
                      <span className="completion-check">✓</span>
                      <div><p>{scene.completion}</p><small>这次反馈会成为下次重返时的理解依据。</small></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {customTurns.map((turn) => (
              <div className="custom-turn" key={turn.id}>
                <div className="chat-row user-row">
                  <div className="chat-bubble user-bubble">{turn.user}</div>
                  <span className="mini-user-avatar">我</span>
                </div>
                <div className="chat-row assistant-row conversation-enter">
                  <YuanbaoAvatar />
                  <div className="message-stack">
                    <div className="message-author"><strong>元宝</strong></div>
                    <div className="chat-bubble assistant-bubble compact-bubble"><p>{turn.assistant}</p></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form className="chat-composer" onSubmit={submitInput}>
            <button type="button" aria-label="添加附件">＋</button>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={`继续和元宝聊聊 ${scene.place}…`}
              aria-label="发送消息给元宝"
            />
            <span className="composer-context">已关联此地记忆</span>
            <button type="submit" className="send-button" aria-label="发送">↑</button>
          </form>
        </section>

        <aside className={`context-rail ${showContext ? "mobile-open" : ""}`}>
          <button className="context-close" onClick={() => setShowContext(false)}>×</button>
          <div className="context-heading">
            <span className="context-live-dot" />
            <div><small>本次主动判断</small><strong>为什么是现在？</strong></div>
            <b>{scene.confidence}</b>
          </div>

          <section className="context-card current-context-card">
            <small>此刻的环境</small>
            {scene.signals.map((signal) => <p key={signal}><span>✓</span>{signal}</p>)}
          </section>

          <section className="context-card">
            <small>过去的相关记忆</small>
            {scene.pastSignals.map((signal) => <p key={signal}><span>·</span>{signal}</p>)}
          </section>

          <section className="context-inference">
            <small>元宝的理解</small>
            <p>{scene.inference}</p>
          </section>

          <section className="context-memory">
            <div><span>{scene.glyph}</span><div><small>空间锚点</small><strong>{scene.place}</strong></div></div>
            <p>“{scene.quote}”</p>
            <div className="context-memory-foot"><span>{scene.memoryCount} 份记忆</span><span>{scene.unfinishedCount} 项未完</span></div>
          </section>

          <div className="context-control">
            <span>本次权限</span>
            <strong>仅准备 · 执行前确认</strong>
          </div>
        </aside>
        {showContext && <button className="context-scrim" onClick={() => setShowContext(false)} aria-label="关闭判断依据" />}
      </div>
    </ProductShell>
  );
}
