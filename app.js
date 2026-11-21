// Comparison slider: drag, click, or arrow keys; scene tabs swap the image pair.
(() => {
  const box = document.getElementById("cmp");
  if (!box) return;
  const handle = box.querySelector(".handle");
  const on = box.querySelector(".cmp-on"), off = box.querySelector(".cmp-off");
  let pos = 50, dragging = false;
  const set = (p) => {
    pos = Math.min(100, Math.max(0, p));
    box.style.setProperty("--pos", pos + "%");
    handle.setAttribute("aria-valuenow", Math.round(pos));
  };
  const fromEvent = (e) => {
    const r = box.getBoundingClientRect();
    set(((e.clientX - r.left) / r.width) * 100);
  };
  box.addEventListener("pointerdown", (e) => { dragging = true; box.setPointerCapture(e.pointerId); fromEvent(e); });
  box.addEventListener("pointermove", (e) => { if (dragging) fromEvent(e); });
  box.addEventListener("pointerup", () => { dragging = false; });
  box.addEventListener("pointercancel", () => { dragging = false; });
  handle.addEventListener("keydown", (e) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") { set(pos - step); e.preventDefault(); }
    if (e.key === "ArrowRight") { set(pos + step); e.preventDefault(); }
    if (e.key === "Home") { set(0); e.preventDefault(); }
    if (e.key === "End") { set(100); e.preventDefault(); }
  });

  const tabs = document.querySelectorAll(".tabs button");
  tabs.forEach((t) => t.addEventListener("click", () => {
    tabs.forEach((b) => b.setAttribute("aria-selected", b === t ? "true" : "false"));
    const s = t.dataset.scene;
    on.src = `/media/${s}_on.jpg`;
    off.src = `/media/${s}_off.jpg`;
    document.getElementById("cmp-mag").innerHTML = t.dataset.mag;
    document.getElementById("cmp-credit").textContent = t.dataset.credit;
    set(50);
  }));
  // Preload the other scenes after the page settles.
  window.addEventListener("load", () => tabs.forEach((t) => {
    ["on", "off"].forEach((k) => { const i = new Image(); i.src = `/media/${t.dataset.scene}_${k}.jpg`; });
  }));
})();

// Trailer: a poster until clicked, then the privacy-enhanced YouTube player.
(() => {
  const yt = document.getElementById("yt");
  if (!yt) return;
  yt.querySelector(".yt-play").addEventListener("click", () => {
    const f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/CqrjdGFEYAg?autoplay=1&rel=0";
    f.title = "DeepTexel trailer";
    f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    yt.replaceChildren(f);
  });
})();
