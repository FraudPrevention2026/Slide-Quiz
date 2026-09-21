/* =========================================================
   本物？ニセモノ？仕分けパズル
========================================================= */


/* =========================================================
   ゲーム状態
========================================================= */

let questions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;


/* =========================================================
   スワイプ状態
========================================================= */

let startX = 0;

let currentX = 0;

let dragging = false;


/* =========================================================
   DOM
========================================================= */

const gameScreen =
  document.getElementById("gameScreen");

const resultScreen =
  document.getElementById("resultScreen");

const messageCard =
  document.getElementById("messageCard");

const feedback =
  document.getElementById("feedback");

const progressText =
  document.getElementById("progressText");

const progressFill =
  document.getElementById("progressFill");

const finalScore =
  document.getElementById("finalScore");

const resultMessage =
  document.getElementById("resultMessage");


/* =========================================================
   問題データ
========================================================= */

const allQuestions = [

  /* ---------- 本物 ---------- */

  {
    type: "real",

    sender: "学校からのお知らせ",

    title: "明日の行事について",

    text:
      "明日の学校行事についてのお知らせです。\n\n" +
      "集合時間や持ち物について、学校から配布されたプリントをご確認ください。\n\n" +
      "詳しくは学校からのお知らせをご確認ください。",

    explanation:
      "学校から普段利用している方法で届く正式なお知らせです。"
  },


  {
    type: "real",

    sender: "図書館からのお知らせ",

    title: "臨時休館について",

    text:
      "図書館は館内整理のため、\n" +
      "○月○日は臨時休館となります。\n\n" +
      "ご利用の際は開館日をご確認ください。",

    explanation:
      "施設の休館案内などは、公式サイトや館内掲示でも確認できます。"
  },


  {
    type: "real",

    sender: "サービス運営事務局",

    title: "メンテナンスのお知らせ",

    text:
      "サービスメンテナンスのお知らせです。\n\n" +
      "○月○日の深夜にメンテナンスを実施します。\n\n" +
      "メンテナンス中は一部サービスをご利用いただけません。",

    explanation:
      "サービスのメンテナンス案内は、公式サイトなどでも確認できます。"
  },


  {
    type: "real",

    sender: "スポーツ施設",

    title: "休館日のご案内",

    text:
      "施設点検のため、\n" +
      "○月○日は休館いたします。\n\n" +
      "ご利用予定の方はご注意ください。",

    explanation:
      "施設からの通常の休館案内です。"
  },


  {
    type: "real",

    sender: "学校図書室",

    title: "図書返却のお知らせ",

    text:
      "借りている図書の返却期限が近づいています。\n\n" +
      "期限までに学校図書室へ返却してください。\n\n" +
      "よろしくお願いします。",

    explanation:
      "学校内の通常の連絡で、金銭や個人情報を要求していません。"
  },


  {
    type: "real",

    sender: "動画サービス",

    title: "サービスメンテナンス",

    text:
      "サービスメンテナンスのお知らせです。\n\n" +
      "○月○日の○時から○時まで、\n" +
      "一部機能をご利用いただけません。\n\n" +
      "ご理解のほどよろしくお願いいたします。",

    explanation:
      "一般的なサービスメンテナンスのお知らせです。"
  },


  {
    type: "real",

    sender: "地域センター",

    title: "施設利用について",

    text:
      "地域センターをご利用の皆さまへ。\n\n" +
      "施設利用時の注意事項についてお知らせします。\n\n" +
      "詳しくは館内掲示をご確認ください。",

    explanation:
      "施設利用に関する一般的なお知らせです。"
  },


  {
    type: "real",

    sender: "学校事務室",

    title: "提出物について",

    text:
      "学校事務室からのお知らせです。\n\n" +
      "提出期限が近づいている書類があります。\n\n" +
      "期限までに学校へ提出してください。",

    explanation:
      "学校内での通常の提出物に関する連絡です。"
  },


  {
    type: "real",

    sender: "地域イベント事務局",

    title: "イベント開催時間のお知らせ",

    text:
      "地域イベントの開催時間についてのお知らせです。\n\n" +
      "開催日時をご確認のうえ、お越しください。\n\n" +
      "詳しい内容は公式案内をご確認ください。",

    explanation:
      "イベントの開催時間を伝える通常のお知らせです。"
  },


  {
    type: "real",

    sender: "市民センター",

    title: "開館時間変更のお知らせ",

    text:
      "市民センターの開館時間変更についてのお知らせです。\n\n" +
      "○月○日は開館時間が変更となります。\n\n" +
      "ご利用の際はご注意ください。",

    explanation:
      "公共施設の開館時間変更に関する通常のお知らせです。"
  },


  /* ---------- ニセモノ ---------- */

  {
    type: "fake",

    sender: "銀行サポートセンター",

    title: "セキュリティ確認のお知らせ",

    text:
      "あなたの口座に異常が確認されました。\n\n" +
      "安全確認のため、至急下記のリンクからログインしてください。\n\n" +
      "確認しない場合、アカウントを停止する可能性があります。",

    explanation:
      "緊急性をあおってリンク先でログインさせようとするメッセージは要注意です。"
  },


  {
    type: "fake",

    sender: "配送サービス",

    title: "お荷物のお届けについて",

    text:
      "お客様のお荷物をお届けできませんでした。\n\n" +
      "再配達の手続きが必要です。\n\n" +
      "下記リンクから住所を確認してください。",

    explanation:
      "突然届く配送通知からリンクへ誘導し、個人情報を入力させる手口に注意しましょう。"
  },


  {
    type: "fake",

    sender: "市役所",

    title: "還付金に関するお知らせ",

    text:
      "あなたに還付金があります。\n\n" +
      "本日中に手続きを行う必要があります。\n\n" +
      "ATMへ行き、担当者の指示に従ってください。",

    explanation:
      "還付金を受け取るためにATMを操作するよう求めるのは典型的な詐欺の手口です。"
  },


  {
    type: "fake",

    sender: "警察相談窓口",

    title: "重要なお知らせ",

    text:
      "あなたの口座が犯罪に利用されています。\n\n" +
      "確認のため、指定された口座へ資金を移してください。\n\n" +
      "この件は他人に話してはいけません。",

    explanation:
      "警察を名乗ってお金を移すよう要求するメッセージには注意が必要です。"
  },


  {
    type: "fake",

    sender: "投資情報グループ",

    title: "特別投資案件のご案内",

    text:
      "今だけ参加できる特別案件です。\n\n" +
      "必ず利益が出る限定情報を入手しました。\n\n" +
      "少額から始められます。今すぐ参加してください。",

    explanation:
      "「必ず儲かる」「今だけ」など、利益を保証したり急がせたりする話は要注意です。"
  },


  {
    type: "fake",

    sender: "プレゼント事務局",

    title: "🎁 当選のお知らせ",

    text:
      "おめでとうございます！\n\n" +
      "あなたは豪華賞品に当選しました。\n\n" +
      "賞品受け取りのため、下記リンクから手続きをしてください。",

    explanation:
      "応募した覚えのない当選通知からリンクへ誘導するメッセージには注意しましょう。"
  },


  {
    type: "fake",

    sender: "SNSメッセージ",

    title: "投資について",

    text:
      "この投資なら絶対に儲かります。\n\n" +
      "私も実際に大きな利益が出ました。\n\n" +
      "興味があれば、指定のアカウントに送金してください。",

    explanation:
      "SNSで知り合った人などから投資を勧められ、送金を求められるケースに注意しましょう。"
  },


  {
    type: "fake",

    sender: "通販サポート",

    title: "お支払い情報の確認",

    text:
      "お支払い情報に問題が発生しました。\n\n" +
      "24時間以内に以下のページからカード情報を更新してください。\n\n" +
      "対応しない場合、注文をキャンセルします。",

    explanation:
      "時間制限を設けてカード情報などを入力させようとするメッセージは要注意です。"
  },


  {
    type: "fake",

    sender: "宅配サポート",

    title: "住所確認のお願い",

    text:
      "お荷物のお届けに必要な住所情報が不足しています。\n\n" +
      "下記ページから住所と電話番号を入力してください。\n\n" +
      "入力がない場合、お荷物を返送します。",

    explanation:
      "配送を理由に住所や電話番号などの個人情報を入力させるメッセージには注意しましょう。"
  },


  {
    type: "fake",

    sender: "未払い料金管理センター",

    title: "料金未納のお知らせ",

    text:
      "ご利用料金が未払いとなっています。\n\n" +
      "本日中に支払いがない場合、法的手続きを開始します。\n\n" +
      "至急、下記の番号へご連絡ください。",

    explanation:
      "「今日中」「法的手続き」などと不安をあおり、急いで連絡させようとするメッセージには注意が必要です。"
  }

];


/* =========================================================
   配列をシャッフル
========================================================= */

function shuffle(array) {

  const copy =
    [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      copy[i],
      copy[j]
    ] = [
      copy[j],
      copy[i]
    ];
  }

  return copy;
}


/* =========================================================
   ゲーム開始
========================================================= */

function startGame() {

  questions =
    shuffle(allQuestions)
      .slice(0, 5);

  currentQuestion = 0;

  score = 0;

  answered = false;

  gameScreen.classList.remove("hidden");

  resultScreen.classList.add("hidden");

  showQuestion();
}


/* =========================================================
   問題表示
========================================================= */

function showQuestion() {

  const q =
    questions[currentQuestion];


  answered = false;

  dragging = false;


  progressText.innerText =
    `${currentQuestion + 1} / 5`;


  progressFill.style.width =
    `${((currentQuestion + 1) / 5) * 100}%`;


  messageCard.innerHTML =

    `
      <div class="message-header">
        ${q.sender}
      </div>

      <div class="message-title">
        ${q.title}
      </div>

      <div class="message-text">
        ${q.text}
      </div>
    `;


  messageCard.style.transition =
    "none";

  messageCard.style.transform =
    "translateX(0) rotate(0deg)";

  messageCard.style.opacity =
    "1";


  messageCard.classList.remove(
    "swipe-real",
    "swipe-fake"
  );


  feedback.innerHTML =
    "";
}


/* =========================================================
   スワイプ開始
========================================================= */

function startSwipe(event) {

  if (answered) return;


  dragging = true;

  startX =
    event.clientX;

  currentX =
    startX;


  messageCard.style.transition =
    "none";


  messageCard.setPointerCapture(
    event.pointerId
  );
}


/* =========================================================
   スワイプ中
========================================================= */

function moveSwipe(event) {

  if (!dragging || answered) return;


  currentX =
    event.clientX;


  const diff =
    currentX - startX;


  const rotate =
    diff * 0.08;


  messageCard.style.transform =
    `translateX(${diff}px) rotate(${rotate}deg)`;


  messageCard.classList.remove(
    "swipe-real",
    "swipe-fake"
  );


  if (diff > 30) {

    messageCard.classList.add(
      "swipe-real"
    );

  } else if (diff < -30) {

    messageCard.classList.add(
      "swipe-fake"
    );
  }
}


/* =========================================================
   スワイプ終了
========================================================= */

function endSwipe(event) {

  if (!dragging || answered) return;


  dragging = false;


  const diff =
    currentX - startX;


  if (diff > 100) {

    answer("real");

  } else if (diff < -100) {

    answer("fake");

  } else {

    // スワイプが足りなかった場合は元に戻す

    messageCard.style.transition =
      "transform 0.25s ease";

    messageCard.style.transform =
      "translateX(0) rotate(0deg)";

    messageCard.classList.remove(
      "swipe-real",
      "swipe-fake"
    );
  }
}


/* =========================================================
   スワイプキャンセル
========================================================= */

function cancelSwipe() {

  if (answered) return;


  dragging = false;


  messageCard.style.transition =
    "transform 0.25s ease";

  messageCard.style.transform =
    "translateX(0) rotate(0deg)";

  messageCard.classList.remove(
    "swipe-real",
    "swipe-fake"
  );
}


/* =========================================================
   回答
========================================================= */

function answer(type) {

  if (answered) return;


  answered = true;

  dragging = false;


  const q =
    questions[currentQuestion];


  const correct =
    type === q.type;


  /* -------------------------
     正解・不正解
  ------------------------- */

  if (correct) {

    score += 20;

    feedback.innerHTML =
      `<strong>🎉 正解！</strong><br><br>` +
      `${q.explanation}`;

  } else {

    feedback.innerHTML =
      `<strong>❌ 不正解</strong><br><br>` +
      `${q.explanation}`;
  }


  /* -------------------------
     スワイプ方向
  ------------------------- */

  const direction =
    type === "real"
      ? 1
      : -1;


  /* -------------------------
     ① カードを飛ばす
  ------------------------- */

  messageCard.style.transition =
    "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease";


  messageCard.style.transform =
    `translateX(${direction * 500}px) rotate(${direction * 20}deg)`;


  messageCard.style.opacity =
    "0";


  /* -------------------------
     ② 少し戻った位置へ
  ------------------------- */

  setTimeout(() => {

    messageCard.style.transition =
      "none";


    messageCard.style.transform =
      `translateX(${-direction * 80}px) rotate(${-direction * 4}deg)`;


    messageCard.style.opacity =
      "1";


    /* -------------------------
       ③ 中央へスムーズに戻す
    ------------------------- */

    requestAnimationFrame(() => {

      messageCard.style.transition =
        "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";


      messageCard.style.transform =
        "translateX(0) rotate(0deg)";

    });

  }, 300);


  /* -------------------------
     次の問題ボタン
  ------------------------- */

  const nextButton =
    document.createElement("button");


  nextButton.className =
    "main-btn";


  nextButton.innerText =
    currentQuestion === 4
      ? "結果を見る"
      : "次の問題へ";


  nextButton.addEventListener(
    "click",
    nextQuestion
  );


  feedback.appendChild(
    nextButton
  );
}


/* =========================================================
   次の問題
========================================================= */

function nextQuestion() {

  currentQuestion++;


  if (currentQuestion >= 5) {

    showResult();

    return;
  }


  showQuestion();
}


/* =========================================================
   結果表示
========================================================= */

function showResult() {

  gameScreen.classList.add("hidden");

  resultScreen.classList.remove("hidden");


  finalScore.innerText =
    `${score} / 100`;


  if (score === 100) {

    resultMessage.innerText =
      "全問正解！\n" +
      "怪しいメッセージをしっかり見分けられました。";

  } else if (score >= 60) {

    resultMessage.innerText =
      "よくできました！\n" +
      "怪しいポイントを意識して、落ち着いて確認しましょう。";

  } else {

    resultMessage.innerText =
      "もう一度挑戦してみましょう！\n" +
      "怪しいメッセージが届いたら、すぐに対応せず確認することが大切です。";
  }
}


/* =========================================================
   リスタート
========================================================= */

function restartGame() {

  startGame();
}


/* =========================================================
   スワイプイベント
========================================================= */

messageCard.addEventListener(
  "pointerdown",
  startSwipe
);


messageCard.addEventListener(
  "pointermove",
  moveSwipe
);


messageCard.addEventListener(
  "pointerup",
  endSwipe
);


messageCard.addEventListener(
  "pointercancel",
  cancelSwipe
);


/* =========================================================
   最初にゲーム開始
========================================================= */

startGame();