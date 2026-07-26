export type ActionCard = {
  label: string;
  title: string;
  description: string;
  meta: string;
};

export type Scene = {
  id: "cafe" | "study" | "station" | "home";
  order: string;
  glyph: string;
  place: string;
  city: string;
  category: string;
  lastVisit: string;
  elapsed: string;
  memoryCount: number;
  unfinishedCount: number;
  quote: string;
  memory: string;
  goal: string;
  signals: string[];
  pastSignals: string[];
  inference: string;
  confidence: string;
  proactiveMessage: string;
  whyMessage: string;
  acceptReply: string;
  resultIntro: string;
  actions: ActionCard[];
  primaryAction: string;
  completion: string;
  inputReply: string;
  mapClass: string;
};

export const scenes: Scene[] = [
  {
    id: "cafe",
    order: "01",
    glyph: "咖",
    place: "梧桐巷咖啡馆",
    city: "上海 · 徐汇",
    category: "情绪与创作",
    lastVisit: "去年 10 月 13 日 · 16:42",
    elapsed: "287 天后",
    memoryCount: 3,
    unfinishedCount: 1,
    quote: "最近太匆忙了，想找一天慢慢走走。",
    memory:
      "你在靠窗的位置写下一段城市随笔，收藏了 6 首民谣，还规划了一条没有走完的老城路线。",
    goal: "走完那条路，并把这一天写下来",
    signals: ["再次进入同一地点", "今天晴 · 23°C", "距离日落 1 小时 32 分"],
    pastSignals: ["深度对话 42 分钟", "散步路线完成 40%", "保存了 6 首歌"],
    inference:
      "你可能仍想从紧绷的节奏里抽身。现在的天气与时间适合继续那次散步，也适合重新开始记录。",
    confidence: "92%",
    proactiveMessage:
      "你又来到梧桐巷了。287 天前，你在这里说想慢一点。我更新了那条没走完的路线，也找回了当时的歌。要从上次停下的地方继续吗？",
    whyMessage:
      "因为你上次在这里留下的不是一次普通问答，而是一个还没完成的愿望。今天的天气、时间和地点都与当时吻合，所以我只把与这次散步有关的记忆找了回来。",
    acceptReply: "好，从上次停下的地方继续吧。",
    resultIntro: "好。我没有替你直接开始，而是先把今天真正用得上的三样东西准备好了：",
    actions: [
      {
        label: "路线已更新",
        title: "日落前的 48 分钟",
        description: "移除 1 家已打烊店铺，新增 2 处顺路街角。",
        meta: "2.8 km · 预计 18:02 结束",
      },
      {
        label: "歌单已找回",
        title: "那天下午的 6 首歌",
        description: "从第一首《南方》开始，接回当时的听觉记忆。",
        meta: "24 min · 上次播放 287 天前",
      },
      {
        label: "随笔已起笔",
        title: "写给重返这里的你",
        description: "“去年我来这里，是为了逃离匆忙……”",
        meta: "草稿 · 68 字",
      },
    ],
    primaryAction: "开始今天的散步",
    completion:
      "路线已经开始，歌单也从上次停下的地方接上了。我会安静记录沿途停留，等你想写的时候，再把今天续进那篇随笔里。",
    inputReply:
      "我记下了。接下来我只围绕这次散步和你留在这里的记忆继续，不会执行任何未经你确认的操作。",
    mapClass: "product-anchor-cafe",
  },
  {
    id: "study",
    order: "02",
    glyph: "习",
    place: "南山自习室",
    city: "深圳 · 南山",
    category: "目标与成长",
    lastVisit: "7 月 5 日 · 19:18",
    elapsed: "21 天后",
    memoryCount: 7,
    unfinishedCount: 2,
    quote: "下次先补项目数据，再练自我介绍。",
    memory:
      "你把作品集改到第三部分，标记了两个逻辑缺口，并约定下一次集中完成最后的收尾。",
    goal: "完成作品集，并练熟面试自我介绍",
    signals: ["工作日晚间再次到达", "预计停留 90 分钟", "作品集仍未完成"],
    pastSignals: ["连续专注 3 次", "第三部分待补数据", "习惯 45 分钟一轮"],
    inference:
      "这里是你的高专注空间。与其重新规划，今晚更适合直接恢复进度，把剩余任务拆成可完成的三段。",
    confidence: "89%",
    proactiveMessage:
      "欢迎回来。你上次在这里把作品集改到第三部分，离完成只差两项。我把今晚 90 分钟拆成了三个专注阶段，也准备了两版自我介绍。要继续吗？",
    whyMessage:
      "你过去三次都在这里进入了稳定专注状态，而且上次明确留下了两项收尾任务。今晚预计停留 90 分钟，正好能完成，不需要重新从计划开始。",
    acceptReply: "继续吧，先把作品集收尾。",
    resultIntro: "可以。我已经恢复了上次的文件位置，并把今晚压缩成三个不会过载的阶段：",
    actions: [
      {
        label: "专注计划",
        title: "今晚的 3 个阶段",
        description: "补数据 35 分钟、改叙事 30 分钟、模拟表达 25 分钟。",
        meta: "90 min · 自动保留休息间隔",
      },
      {
        label: "作品集待办",
        title: "只看最关键的 2 处",
        description: "补充转化率依据，重写项目结果的第一句话。",
        meta: "第三部分 · 第 18 页",
      },
      {
        label: "表达练习",
        title: "两版 60 秒自我介绍",
        description: "业务结果版与成长叙事版，均沿用你的真实经历。",
        meta: "2 个版本 · 可跟读",
      },
    ],
    primaryAction: "开始第一段专注",
    completion:
      "第一段 35 分钟专注已经开始。作品集停留的位置和所需资料都在这里；结束时我会先问你是否需要复盘。",
    inputReply:
      "收到。我会把这句话加入今晚的专注上下文，但不会改变作品集原文，除非你明确让我修改。",
    mapClass: "product-anchor-study",
  },
  {
    id: "station",
    order: "03",
    glyph: "行",
    place: "虹桥高铁站",
    city: "上海 · 闵行",
    category: "出差与行动",
    lastVisit: "6 月 21 日 · 08:06",
    elapsed: "35 天后",
    memoryCount: 5,
    unfinishedCount: 1,
    quote: "开场太绕了，下次先说结论。",
    memory:
      "上次出差前，你准备了客户谈判重点、餐厅备选和返程方案；回来后留下了一条明确复盘。",
    goal: "把复盘变成下一次更从容的出发",
    signals: ["再次抵达同一车站", "10:30 有客户会议", "距发车还有 26 分钟"],
    pastSignals: ["保存 1 条谈判复盘", "客户偏好先听结论", "上次会前准备 8 分钟"],
    inference:
      "这不是一次新的行程，而是一次可以复用经验的重访。现在最有价值的是在上车前快速进入状态。",
    confidence: "95%",
    proactiveMessage:
      "又来出差了。根据上次复盘，我把谈判开场改成了 30 秒结论版，也重新整理了会前清单和返程备选。上车前要快速过一遍吗？",
    whyMessage:
      "日历里的客户会议、你再次抵达虹桥站，以及上次留下的“先说结论”复盘同时出现。现在离发车还有 26 分钟，适合做一次短准备，而不是给你一份长报告。",
    acceptReply: "好，先过一遍最关键的。",
    resultIntro: "好，只看会直接影响今天结果的内容。我把准备压缩在 3 分钟内：",
    actions: [
      {
        label: "谈判开场",
        title: "30 秒先说结论",
        description: "先对齐收益，再给依据，最后留下两个可选合作方案。",
        meta: "约 86 字 · 可直接跟读",
      },
      {
        label: "会前检查",
        title: "不用再临时翻记录",
        description: "报价底线、关键案例、客户顾虑、决策人、下一步。",
        meta: "5 项 · 预计 1 分钟",
      },
      {
        label: "行程备选",
        title: "返程与晚餐方案",
        description: "两班可改签车次，一家上次错过的本地老店。",
        meta: "Mock 数据 · 未进行预订",
      },
    ],
    primaryAction: "开始 3 分钟会前准备",
    completion:
      "会前速览已经开始。我会先带你说一遍 30 秒开场，再快速确认五项底线，不展开无关信息。",
    inputReply:
      "明白。我会把你的补充放进这次会前准备中，涉及报价或对外发送的内容仍然会先向你确认。",
    mapClass: "product-anchor-station",
  },
  {
    id: "home",
    order: "04",
    glyph: "家",
    place: "外婆家的小镇",
    city: "浙江 · 湖州",
    category: "关系与人生记忆",
    lastVisit: "去年春节 · 20:24",
    elapsed: "1 年后",
    memoryCount: 9,
    unfinishedCount: 5,
    quote: "这些故事如果不记下来，以后可能没人知道了。",
    memory:
      "你记录了三段外婆讲的往事，想整理成一篇家族小传，还留下五个没来得及继续问的问题。",
    goal: "把家里的故事写成可以留下来的东西",
    signals: ["节日前再次回到小镇", "家庭成员今晚到齐", "故事草稿停留在第一章"],
    pastSignals: ["保存 3 段口述故事", "5 个问题未询问", "外婆偏爱轻松聊天"],
    inference:
      "今晚是继续这份记录的自然时机。比起正式采访，一张温和的聊天卡更容易让故事自然发生。",
    confidence: "87%",
    proactiveMessage:
      "回到外婆家了。去年你在这里记下了三段家里的故事，还留了五个没来得及问的问题。我把它们整理成一张轻松的聊天卡，也为家族小传排好了第一章。今晚想继续听她讲吗？",
    whyMessage:
      "因为去年你明确说过想把这些故事留下来，而今晚家人又刚好到齐。我没有把它做成正式采访，而是根据外婆更习惯的聊天方式，准备了一组自然的问题。",
    acceptReply: "好，给我一张自然一点的聊天卡。",
    resultIntro: "好，不会像采访。我从旧照片、一道菜和小时候的游戏开始，让故事自己慢慢出现：",
    actions: [
      {
        label: "聊天卡",
        title: "5 个自然的问题",
        description: "从旧照片、儿时游戏和一道拿手菜轻轻聊起。",
        meta: "温和模式 · 不连续追问",
      },
      {
        label: "家族小传",
        title: "第一章：河边的老房子",
        description: "按人物与年份整理已有片段，保留外婆的原话。",
        meta: "草稿 · 612 字",
      },
      {
        label: "家庭时间轴",
        title: "一家人的 7 个时刻",
        description: "从 1968 年到今天，留出继续补写的位置。",
        meta: "7 个节点 · 可随时编辑",
      },
    ],
    primaryAction: "打开今晚的聊天卡",
    completion:
      "聊天卡已经打开。你可以把手机放在一旁，想记时再叫我；今晚的新故事会和去年的三段记忆接在一起。",
    inputReply:
      "记下了。我会保持轻松、不连续追问，也不会把任何家庭内容分享或发送到外部。",
    mapClass: "product-anchor-home",
  },
];

export function getScene(id?: string) {
  return scenes.find((scene) => scene.id === id) ?? scenes[0];
}
