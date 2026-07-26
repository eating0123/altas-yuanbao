"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "此刻", icon: "今" },
  { href: "/map", label: "时间地图", icon: "图" },
  { href: "/memories", label: "记忆库", icon: "忆" },
  { href: "/settings", label: "设置", icon: "设" },
];

function LogoMark() {
  return (
    <span className="product-logo-mark" aria-hidden="true">
      <i />
      <b />
    </span>
  );
}

export default function ProductShell({
  children,
  title,
  subtitle,
  trailing,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  trailing?: ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname.startsWith("/scene/");
    return pathname.startsWith(href);
  };

  return (
    <main className="product-app">
      <aside className="product-sidebar">
        <Link href="/" className="product-brand" aria-label="未完地图">
          <LogoMark />
          <span>
            <strong>未完地图</strong>
            <small>元宝 · 时空记忆</small>
          </span>
        </Link>

        <nav className="product-nav" aria-label="产品导航">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
            >
              <span>{item.icon}</span>
              <strong>{item.label}</strong>
              {item.href === "/" && <i className="nav-live-dot" />}
            </Link>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <Link href="/about" className="about-entry">
          <span className="about-spark">↗</span>
          <span>
            <strong>产品介绍</strong>
            <small>为什么需要未完地图</small>
          </span>
        </Link>

        <div className="sidebar-privacy">
          <span className="privacy-status-dot" />
          <span>
            <strong>温和模式</strong>
            <small>仅在授权地点出现</small>
          </span>
        </div>

        <div className="product-user">
          <span className="user-avatar">我</span>
          <span><strong>我的时空记忆</strong><small>4 个地点锚点</small></span>
          <b>···</b>
        </div>
      </aside>

      <section className="product-workspace">
        {(title || trailing) && (
          <header className="workspace-header">
            <div>
              {subtitle && <small>{subtitle}</small>}
              {title && <h1>{title}</h1>}
            </div>
            {trailing && <div className="workspace-trailing">{trailing}</div>}
          </header>
        )}
        {children}
      </section>

      <nav className="product-bottom-nav" aria-label="手机端产品导航">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active" : ""}
          >
            <span>{item.icon}</span>
            <small>{item.label}</small>
          </Link>
        ))}
      </nav>
    </main>
  );
}
