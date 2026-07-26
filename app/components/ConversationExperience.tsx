"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import ProductShell from "./ProductShell";
import { getScene, scenes, type ActionCard, type Scene } from "../product-data";

type Phase = "proactive" | "explained" | "actions" | "completed" | "dismissed";
type Intent = "why" | "accept" | "execute" | "edit" | "dismiss" | "general";

type SystemMessage = {
  id: string;
  role: "system";
  kind: "arrival";
};

type ConversationMessage = {
  id: string;
  role: "assistant" | "user";
  kind: "text" | "actions" | "completion";
  text: string;
  badge?: string;
  memoryContext?: boolean;
  evidence?: boolean;
  compact?: boolean;
  actions?: ActionCard[];
};

type ChatMessage = SystemMessage | ConversationMessage;

type QuickReply = {
  label: string;
  intent: Intent;
  primary?: boolean;
};

function YuanbaoAvatar() {
  return <img className="yuanbao-avatar" src="/yuanbao-logo.png" alt="元宝" />;
}

function createInitialMessages(scene: Scene): ChatMessage[] {
  return [
    { id: `${scene.id}-arrival`, role: "system", kind: "arrival" },
    {
      id: `${scene.id}-proactive`,
      role: "assistant",
      kind: "text",
      badge: "主动出现",
      text: scene.proactiveMessage,
      memoryContext: true,
    },
  ];
}

function getQuickReplies(phase: Phase, scene: Scene): QuickReply[] {
  if (phase === "proactive") {
    return [
      { label: scene.acceptReply, intent: "accept", primary: true },
      { label: "你为什么现在提醒我？", intent: "why" },
      { label: "这次不用", intent: "dismiss" },
    ];
  }

  if (phase === "explained") {
    return [
      { label: scene.acceptReply, intent: "accept", primary: true },
      { label: "先不用", intent: "dismiss" },
    ];
  }

  if (phase === "actions") {
    return [
      { label: scene.primaryAction, intent: "execute", primary: true },
      { label: "我想调整一下", intent: "edit" },
      { label: "稍后再说", intent: "dismiss" },
    ];
  }

  return [];
}

function inferIntent(text: string, phase: Phase, scene: Scene): Intent {
  const normalized = text.replace(/[\s，。！？、,.!?]/g, "");

  if (/为什么|原因|依据|怎么判断|现在提醒/.test(normalized)) return "why";
  if (/不用|算了|先不|稍后|下次吧|不需要/.test(normalized)) return "dismiss";
  if (/编辑|修改|调整|换一个|改一下/.test(normalized)) return "edit";

  if (
    phase === "actions" &&
    (normalized.includes(scene.primaryAction.replace(/[\s，。！？、,.!?]/g, "")) ||
      /开始|打开|执行|出发|进入准备/.test(normalized))
  ) {
    return "execute";
  }

  if (
    (phase === "proactive" || phase === "explained") &&
    /好|可以|继续|帮我|要|开始|看看|来吧/.test(normalized)
  ) {
    return "accept";
  }

  return "general";
}

export default function ConversationExperience({ sceneId }: { sceneId: string }) {
  const scene = getScene(sceneId);
  const [messages, setMessages] = useState<ChatMessage[]>(() => createInitialMessages(scene));
  const [phase, setPhase] = useState<Phase>("proactive");
  const [showPlaces, setShowPlaces] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [input, setInput] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const endOfConversationRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef(0);

  useEffect(() => {
    setMessages(createInitialMessages(scene));
    setPhase("proactive");
    setInput("");
    setHasInteracted(false);
    sequenceRef.current = 0;
  }, [scene]);

  useEffect(() => {
    if (!hasInteracted) return;
    const frame = requestAnimationFrame(() => {
      endOfConversationRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
    return () => cancelAnimationFrame(frame);
  }, [messages, hasInteracted]);

  const makeId = (role: "user" | "assistant") => {
    sequenceRef.current += 1;
    return `${scene.id}-${role}-${sequenceRef.current}`;
  };

  const resetConversation = () => {
    setMessages(createInitialMessages(scene));
    setPhase("proactive");
    setInput("");
    setHasInteracted(false);
    sequenceRef.current = 0;
  };

  const buildAssistantReply = (intent: Intent): { message: ConversationMessage; nextPhase: Phase } => {
    if (intent === "why") {
      return {
        nextPhase: "explained",
        message: {
          id: makeId("assistant"),
          role: "assistant",
          kind: "text",
          text: scene.whyMessage,
          evidence: true,
        },
      };
    }

    if (intent === "accept") {
      return {
        nextPhase: "actions",
        message: {
          id: makeId("assistant"),
          role: "assistant",
          kind: "actions",
          badge: "已准备",
          text: scene.resultIntro,
          actions: scene.actions,
        },
      };
    }

    if (intent === "execute") {
      return {
        nextPhase: "completed",
        message: {
          id: makeId("assistant"),
          role: "assistant",
          kind: "completion",
          badge: "正在进行",
          text: scene.completion,
        },
      };
    }

    if (intent === "edit") {
      return {
        nextPhase: phase === "actions" ? "actions" : phase,
        message: {
          id: makeId("assistant"),
          role: "assistant",
          kind: "text",
          compact: true,
          text: `可以。你直接告诉我想调整哪一项，我会留在这段对话里继续改；所有执行动作仍会再次向你确认。`,
        },
      };
    }

    if (intent === "dismiss") {
      return {
        nextPhase: "dismissed",
        message: {
          id: makeId("assistant"),
          role: "assistant",
          kind: "text",
          compact: true,
          text: "好，我不会继续打扰。这次忽略只影响当前提醒，不会删除你留在这里的记忆。",
        },
      };
    }

    return {
      nextPhase: phase,
      message: {
        id: makeId("assistant"),
        role: "assistant",
        kind: "text",
        compact: true,
        text: scene.inputReply,
      },
    };
  };

  const sendUserMessage = (text: string, forcedIntent?: Intent) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const intent = forcedIntent ?? inferIntent(trimmed, phase, scene);
    const userMessage: ConversationMessage = {
      id: makeId("user"),
      role: "user",
      kind: "text",
      text: trimmed,
    };
    const { message: assistantMessage, nextPhase } = buildAssistantReply(intent);

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setPhase(nextPhase);
    setInput("");
    setHasInteracted(true);
  };

  const submitInput = (event: FormEvent) => {
    event.preventDefault();
    sendUserMessage(input);
  };

  const quickReplies = getQuickReplies(phase, scene);

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

            {messages.map((message, index) => {
              if (message.role === "system") {
                return (
                  <div className="arrival-event" key={message.id}>
                    <span className="arrival-event-line" />
                    <span className="arrival-event-icon">⌖</span>
                    <div>
                      <strong>你已进入 {scene.place}</strong>
                      <small>系统地理围栏触发 · 你还没有发送消息</small>
                    </div>
                    <time>16:24</time>
                    <span className="arrival-event-line" />
                  </div>
                );
              }

              if (message.role === "user") {
                return (
                  <div className="chat-row user-row conversation-enter" key={message.id}>
                    <div className="chat-bubble user-bubble">{message.text}</div>
                    <span className="mini-user-avatar">我</span>
                  </div>
                );
              }

              const isLatestAssistant = index === messages.length - 1;

              return (
                <div className="chat-row assistant-row conversation-enter" key={message.id}>
                  <YuanbaoAvatar />
                  <div className={`message-stack ${message.kind === "actions" ? "result-stack" : ""}`}>
                    <div className="message-author">
                      <strong>元宝</strong>
                      {message.badge && <span>{message.badge}</span>}
                    </div>

                    {message.kind === "text" && (
                      <div className={`chat-bubble assistant-bubble ${message.compact ? "compact-bubble" : ""}`}>
                        <p>{message.text}</p>
                        {message.memoryContext && (
                          <div className="memory-quote-inline">
                            <span>{scene.elapsed}</span>
                            <blockquote>“{scene.quote}”</blockquote>
                            <small>{scene.lastVisit}</small>
                          </div>
                        )}
                        {message.evidence && (
                          <button className="evidence-link" onClick={() => setShowContext(true)}>
                            查看本次使用的 6 条信号 ↗
                          </button>
                        )}
                      </div>
                    )}

                    {message.kind === "actions" && (
                      <>
                        <div className="chat-bubble assistant-bubble result-intro"><p>{message.text}</p></div>
                        <div className="conversation-results">
                          {message.actions?.map((action, actionIndex) => (
                            <article key={action.title}>
                              <div className="result-card-top">
                                <span>0{actionIndex + 1}</span>
                                <small>{action.label}</small>
                              </div>
                              <h3>{action.title}</h3>
                              <p>{action.description}</p>
                              <div className="result-card-foot"><span>{action.meta}</span><b>已准备</b></div>
                            </article>
                          ))}
                        </div>
                      </>
                    )}

                    {message.kind === "completion" && (
                      <div className="chat-bubble assistant-bubble completion-bubble">
                        <span className="completion-check">✓</span>
                        <div><p>{message.text}</p><small>这次反馈会成为下次重返时的理解依据。</small></div>
                      </div>
                    )}

                    {isLatestAssistant && quickReplies.length > 0 && (
                      <div className="suggested-replies conversation-quick-replies">
                        {quickReplies.map((reply) => (
                          <button
                            key={reply.label}
                            className={reply.primary ? "suggestion-primary" : ""}
                            onClick={() => sendUserMessage(reply.label, reply.intent)}
                          >
                            {reply.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {isLatestAssistant && phase === "dismissed" && (
                      <button className="inline-reset" onClick={resetConversation}>重新模拟这次到达</button>
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={endOfConversationRef} className="conversation-end-marker" />
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
