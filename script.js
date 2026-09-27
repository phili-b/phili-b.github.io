// Scroll reveal and the animated Bayer-mosaic hero background.
document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    sections.forEach((s) => s.classList.add("visible"));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12 });
    sections.forEach((s) => io.observe(s));
  }

  bayerBackground(document.getElementById("bayer"));
});

// RGGB colour filter array: each pixel's brightness drifts like light over a sensor.
function bayerBackground(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const cell = 14;
  let cols = 0, rows = 0, phase = [];

  function colours() {
    const css = getComputedStyle(document.documentElement);
    return {
      r: css.getPropertyValue("--r").trim(),
      g: css.getPropertyValue("--g").trim(),
      b: css.getPropertyValue("--b").trim(),
    };
  }
  let c = colours();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { c = colours(); });

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / cell);
    rows = Math.ceil(h / cell);
    phase = Array.from({ length: cols * rows }, () => Math.random() * Math.PI * 2);
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const even = (y & 1) === 0, left = (x & 1) === 0;
        ctx.fillStyle = even ? (left ? c.r : c.g) : (left ? c.g : c.b);
        // A slow diagonal wave plus per-pixel shimmer.
        const wave = Math.sin((x + y) * 0.18 - t * 0.0006);
        const shimmer = Math.sin(phase[y * cols + x] + t * 0.0015);
        ctx.globalAlpha = Math.max(0, 0.08 + 0.22 * (wave * 0.6 + shimmer * 0.4 + 0.5) / 1.5);
        ctx.fillRect(x * cell + 1, y * cell + 1, cell - 2, cell - 2);
      }
    }
    ctx.globalAlpha = 1;
  }

  resize();
  window.addEventListener("resize", resize);

  if (reduceMotion) {
    draw(0);
    return;
  }
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
  (function loop(t) {
    if (visible && !document.hidden) draw(t);
    requestAnimationFrame(loop);
  })(0);
}
