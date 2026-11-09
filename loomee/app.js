const scenes = {
  meet: {
    label: "01 / HELLO, LITTLE FRIEND",
    title: "从今天起，一起看世界。",
    description:
      "一个小小的肩上伙伴，一声自然的问候。我们希望陪伴就这样开始，融进孩子的日常。",
    name: "初次见面",
  },
  curiosity: {
    label: "02 / A WORLD OF WHYS",
    title: "每一个“为什么”，都值得回应。",
    description:
      "蚂蚁要去哪里？书里的动物为什么躲起来？我们希望小小肩宠能结合眼前的世界，陪孩子把好奇心继续问下去。",
    name: "十万个为什么",
  },
  english: {
    label: "03 / LEARNING, NATURALLY",
    title: "让英语，长在生活里。",
    description:
      "读绘本、搭积木、看见一种新的颜色。用简单的英语自然接话，让开口交流成为玩耍的一部分。",
    name: "生活中的英语浸润",
  },
  safety: {
    label: "04 / A LITTLE MORE CARE",
    title: "多一份留意，多一份关心。",
    description:
      "我们希望它能识别身边的危险环境与行为，在需要时提醒孩子，并让家长及时了解情况。",
    name: "危险识别与提醒",
    status: "危险识别、自动提醒和家长通知仍在研发验证中；不能替代成人看护。",
  },
  memory: {
    label: "05 / LITTLE THINGS, REMEMBERED",
    title: "小小的一天，也有好多成长。",
    description:
      "今天对什么好奇，聊过什么有趣的话题。我们希望把这些小小瞬间留住，帮助家长更懂孩子，也让下一次陪伴更有默契。",
    name: "记录每天的成长",
    status: "自动成长记录尚未交付，长期记忆可靠性仍待验证。",
  },
  bedtime: {
    label: "06 / GOOD NIGHT, LITTLE EXPLORER",
    title: "把今天，讲成一个睡前故事。",
    description:
      "到了晚上，把小伙伴放在床边。让白天一起遇见的人、事与小小发现，成为故事里温柔的一页。",
    name: "睡前故事与守护",
  },
};

const sceneVideo = document.querySelector("#scene-video");
const mainVideo = document.querySelector("#main-video");
const sceneButtons = [...document.querySelectorAll(".scene-choice")];
let activeScene = "meet";

function selectScene(key) {
  const scene = scenes[key];
  if (!scene || activeScene === key) return;
  activeScene = key;
  sceneVideo.pause();
  sceneVideo.poster = `assets/images/${key}.webp`;
  sceneVideo.querySelector("source").src = `assets/videos/${key}.mp4`;
  const fallback = sceneVideo.querySelector("a");
  fallback.href = `assets/videos/${key}.mp4`;
  sceneVideo.setAttribute("aria-label", `${scene.name}概念演示`);
  sceneVideo.load();
  document.querySelector("#scene-label").textContent = scene.label;
  document.querySelector("#scene-title").textContent = scene.title;
  document.querySelector("#scene-description").textContent = scene.description;
  document.querySelector("#scene-status").textContent =
    scene.status || "场景展示产品目标体验，非现有成品功能承诺。";
  sceneButtons.forEach((button) => {
    const selected = button.dataset.scene === key;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}
sceneButtons.forEach((button) =>
  button.addEventListener("click", () => selectScene(button.dataset.scene)),
);
[mainVideo, sceneVideo].forEach((video) => {
  video.addEventListener("play", () => {
    [mainVideo, sceneVideo]
      .filter((other) => other !== video)
      .forEach((other) => other.pause());
  });
});

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu(returnFocus = false) {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "展开导航");
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  mobileNav.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "收起导航" : "展开导航");
});
mobileNav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (
    !mobileNav.hidden &&
    !mobileNav.contains(event.target) &&
    !menuButton.contains(event.target)
  )
    closeMenu();
});
window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});
