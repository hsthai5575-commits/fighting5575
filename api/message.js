// Vercel 서버리스 함수: 응원 문장 15개 중 하나를 골라 이름과 함께 보냅니다.
const MESSAGES = [
  "{name}, 오늘도 충분히 잘하고 있어요.",
  "{name}의 작은 한 걸음이 큰 변화를 만들어요.",
  "{name}, 천천히 가도 괜찮아요. 멈추지만 않으면 돼요.",
  "{name}, 오늘 해낸 일은 생각보다 훨씬 대단해요.",
  "{name}, 힘들 땐 잠깐 쉬어 가도 돼요.",
  "{name}의 노력은 반드시 빛을 볼 거예요.",
  "{name}, 어제보다 조금 나아졌다면 그걸로 충분해요.",
  "{name}의 웃음이 누군가에게 힘이 되고 있어요.",
  "{name}, 실수해도 괜찮아요. 배우는 중이니까요.",
  "오늘 하루도 {name}답게, 멋지게 보내요.",
  "{name}, 스스로를 조금 더 믿어 봐요.",
  "{name}, 덕분에 세상이 조금 더 따뜻해요.",
  "{name}, 지금 이 순간도 잘 버티고 있어요.",
  "{name}의 내일은 오늘보다 더 반짝일 거예요.",
  "{name}, 오늘도 정말 수고 많았어요."
];

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "GET 요청만 받아요." });
  }

  const raw = typeof req.query.name === "string" ? req.query.name : "";
  const name = raw.trim().slice(0, 20) || "여러분";

  const template = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  const message = template.split("{name}").join(name);

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ name, message });
};
