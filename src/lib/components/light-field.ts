// Light field: a WebGL2 particle film. Every particle has a home in six
// hand-built formations, one per stage of the story, and the scroll position
// decides which pair it is travelling between:
//   0 Pain         shattered shards, cold
//   1 Power        a rising column of light
//   2 Accountability  calm ripples, the reach of one action
//   3 Healing      a whole, mended sphere
//   4 Futures      a coil that unwinds into a rising line
//   5 Brotherhood  men in a circle, joined, around a centre light (the mark)

export type LightField = {
  /** Story position, 0 to 5 (one unit per chapter). */
  setTarget: (f: number) => void
  setPointer: (x: number, y: number) => void
  resize: () => void
  start: () => void
  stop: () => void
  destroy: () => void
}

const FORMATIONS = 6
const TAU = Math.PI * 2

function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function build(n: number) {
  const r = rng(7)
  const gauss = () => (r() + r() + r() - 1.5) * 0.8
  const unit = (): [number, number, number] => {
    const z = r() * 2 - 1
    const a = r() * TAU
    const s = Math.sqrt(1 - z * z)
    return [s * Math.cos(a), s * Math.sin(a), z]
  }
  const f = Array.from({ length: FORMATIONS }, () => new Float32Array(n * 3))
  const seeds = new Float32Array(n * 4)

  // Shards for formation 0.
  const SHARDS = 46
  const shards = Array.from({ length: SHARDS }, () => {
    const d = unit()
    const rad = 0.3 + 1.05 * Math.sqrt(r())
    return { c: [d[0] * rad * 1.15, d[1] * rad * 0.95, d[2] * rad * 0.8], u: unit(), v: unit(), s: 0.18 + r() * 0.32 }
  })
  const FIGURES = 14
  const RINGS = 10

  for (let i = 0; i < n; i++) {
    const o = i * 3
    const set = (k: number, x: number, y: number, z: number) => {
      f[k][o] = x
      f[k][o + 1] = y
      f[k][o + 2] = z
    }

    // 0 Pain: flat triangular shards, with loose dust between them.
    if (r() < 0.86) {
      const s = shards[i % SHARDS]
      const a = r()
      const b = r() * (1 - a)
      set(0, s.c[0] + (s.u[0] * a + s.v[0] * b) * s.s, s.c[1] + (s.u[1] * a + s.v[1] * b) * s.s, s.c[2] + (s.u[2] * a + s.v[2] * b) * s.s)
    } else {
      const d = unit()
      const rad = 1.6 * Math.cbrt(r())
      set(0, d[0] * rad, d[1] * rad, d[2] * rad * 0.6)
    }

    // 1 Power: a column, broad and dense at its base, tapering as it rises.
    {
      const h = Math.pow(r(), 0.8)
      const rad = (0.44 * Math.pow(1 - h, 0.65) + 0.015) * Math.sqrt(r())
      const a = r() * TAU
      const spark = r() < 0.08
      const y = spark ? 0.9 + r() * 0.7 : -1.25 + 2.35 * h
      const sr = spark ? 0.25 * r() : rad
      set(1, Math.cos(a) * sr, y, Math.sin(a) * sr)
    }

    // 2 Accountability: concentric ripples on a still surface, tilted toward us.
    {
      const k = Math.floor(Math.sqrt(r()) * RINGS)
      const rad = 0.14 + k * 0.135 + gauss() * 0.006
      const a = r() * TAU
      const x = Math.cos(a) * rad
      const z = Math.sin(a) * rad
      const tilt = 1.12
      const yy = gauss() * 0.006
      set(2, x, yy * Math.cos(tilt) - z * Math.sin(tilt) - 0.05, yy * Math.sin(tilt) + z * Math.cos(tilt))
    }

    // 3 Healing: a whole sphere, a bright shell around a soft core.
    {
      const shell = r() < 0.78
      const t = (i + 0.5) / n
      const z = 1 - 2 * t
      const s = Math.sqrt(1 - z * z)
      const a = i * 2.39996323
      const rad = shell ? 0.95 + gauss() * 0.01 : 0.85 * Math.cbrt(r())
      if (shell) set(3, s * Math.cos(a) * rad, z * rad, s * Math.sin(a) * rad)
      else {
        const d = unit()
        set(3, d[0] * rad, d[1] * rad, d[2] * rad)
      }
    }

    // 4 Futures: a tight coil that loosens and straightens as it climbs.
    {
      const s = r()
      const R = 0.46 * Math.pow(1 - s, 1.3) + 0.01
      const a = s * TAU * 5.5
      const cx = -1.35 + 2.75 * s
      const cy = -0.75 + 1.45 * Math.pow(s, 1.5)
      set(4, cx + gauss() * 0.015, cy + R * Math.sin(a) + gauss() * 0.015, R * Math.cos(a))
    }

    // 5 Brotherhood: figures seated in a circle, joined by a ring, around a centre light.
    {
      const pick = r()
      if (pick < 0.52) {
        const k = i % FIGURES
        const a = (k / FIGURES) * TAU + Math.PI / 2
        const head = r() < 0.4
        const R = head ? 0.94 : 0.84
        const sig = head ? 0.035 : 0.06
        set(5, Math.cos(a) * R + gauss() * sig, Math.sin(a) * R + gauss() * sig, gauss() * sig)
      } else if (pick < 0.84) {
        const a = r() * TAU
        set(5, Math.cos(a) * (0.84 + gauss() * 0.01), Math.sin(a) * (0.84 + gauss() * 0.01), gauss() * 0.01)
      } else {
        const a = r() * TAU
        const rad = 0.15 * Math.sqrt(r())
        set(5, Math.cos(a) * rad, Math.sin(a) * rad, gauss() * 0.02)
      }
    }

    seeds[i * 4] = r()
    seeds[i * 4 + 1] = r()
    seeds[i * 4 + 2] = r()
    seeds[i * 4 + 3] = r()
  }
  return { f, seeds }
}

const VERT = `#version 300 es
in vec3 aP0; in vec3 aP1; in vec3 aP2; in vec3 aP3; in vec3 aP4; in vec3 aP5;
in vec4 aS;
uniform int uA;
uniform float uT, uTime, uScale, uSize, uAspect;
uniform vec2 uOff, uRot;
uniform vec3 uCol[6];
uniform float uBri[6];
out vec3 vCol;
out float vA;

vec3 pick(int k) {
  if (k == 0) return aP0;
  if (k == 1) return aP1;
  if (k == 2) return aP2;
  if (k == 3) return aP3;
  if (k == 4) return aP4;
  return aP5;
}

void main() {
  // Each particle leaves on its own beat, so a formation dissolves and
  // re-forms as a wave rather than all at once.
  float tt = clamp(uT * 1.5 - aS.x * 0.5, 0.0, 1.0);
  tt = tt * tt * (3.0 - 2.0 * tt);
  vec3 p = mix(pick(uA), pick(uA + 1), tt);

  float ph = aS.w * 6.2832;
  float travel = sin(3.14159 * tt);
  vec3 n = vec3(
    sin(p.y * 2.7 + uTime * 0.7 + ph),
    sin(p.z * 2.3 + uTime * 0.6 + ph * 1.3),
    sin(p.x * 2.5 + uTime * 0.8 + ph * 0.7));
  p += n * (0.012 + travel * 0.3);

  // Slow sway plus pointer parallax.
  float cy = cos(uRot.x), sy = sin(uRot.x), cx = cos(uRot.y), sx = sin(uRot.y);
  p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
  p = vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
  p *= uScale;
  p.xy += uOff;

  // Perspective camera at z = 4.2, 40 degree vertical field of view.
  float w = 4.2 - p.z;
  float fy = 2.7475;
  gl_Position = vec4(p.x * fy / uAspect, p.y * fy, 0.0, w);

  bool flare = aS.y > 0.965;
  gl_PointSize = uSize * (0.55 + aS.y * 1.1) * (flare ? 4.0 : 1.0) * 4.2 / w;

  vec3 col = mix(uCol[uA], uCol[uA + 1], tt);
  float warm = (float(uA) + tt) / 5.0;
  if (aS.z > 0.8) col = mix(col, vec3(0.66, 0.29, 0.14), 0.6 * warm);
  vCol = col;
  float twinkle = 0.78 + 0.22 * sin(uTime * 1.4 + ph * 3.0);
  vA = mix(uBri[uA], uBri[uA + 1], tt) * twinkle * (flare ? 0.18 : 1.0) * (1.0 + travel * 0.35);
}`

const FRAG = `#version 300 es
precision mediump float;
in vec3 vCol;
in float vA;
out vec4 o;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  o = vec4(vCol * a * vA, 0.0);
}`

// Cold grey to the brand's signal yellow, one step per stage.
const COLORS = [
  [0.56, 0.6, 0.66],
  [0.9, 0.84, 0.72],
  [0.98, 0.78, 0.5],
  [1.0, 0.74, 0.36],
  [1.0, 0.79, 0.28],
  [1.0, 0.8, 0.22],
]
const BRIGHTNESS = [0.55, 0.62, 0.62, 0.85, 0.62, 0.72]

export function createLightField(canvas: HTMLCanvasElement): LightField | null {
  const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, powerPreference: "high-performance" })
  if (!gl) return null

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader")
    return s
  }
  const prog = gl.createProgram()!
  try {
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link")
  } catch {
    return null
  }
  gl.useProgram(prog)

  const small = Math.min(window.innerWidth, window.innerHeight) < 600
  const count = small ? 7000 : 13000
  const { f, seeds } = build(count)

  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  const buffers: WebGLBuffer[] = []
  const attach = (name: string, data: Float32Array, size: number) => {
    const loc = gl.getAttribLocation(prog, name)
    const b = gl.createBuffer()!
    buffers.push(b)
    gl.bindBuffer(gl.ARRAY_BUFFER, b)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0)
  }
  f.forEach((data, k) => attach(`aP${k}`, data, 3))
  attach("aS", seeds, 4)

  const u = (name: string) => gl.getUniformLocation(prog, name)
  const uA = u("uA")
  const uT = u("uT")
  const uTime = u("uTime")
  const uScale = u("uScale")
  const uSize = u("uSize")
  const uAspect = u("uAspect")
  const uOff = u("uOff")
  const uRot = u("uRot")
  gl.uniform3fv(u("uCol"), COLORS.flat())
  gl.uniform1fv(u("uBri"), BRIGHTNESS)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE)
  gl.clearColor(15 / 255, 14 / 255, 12 / 255, 1)

  let target = 0
  let current = 0
  let px = 0
  let py = 0
  let ex = 0
  let ey = 0
  let raf = 0
  let last = 0
  let time = 0
  let running = false

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    canvas.width = Math.max(1, Math.round(w * dpr))
    canvas.height = Math.max(1, Math.round(h * dpr))
    gl.viewport(0, 0, canvas.width, canvas.height)
    const aspect = w / Math.max(1, h)
    gl.uniform1f(uAspect, aspect)
    // World half-height at the focal plane is about 1.53.
    const halfW = 1.53 * aspect
    if (aspect >= 1) {
      // Text sits on the left, so the light sits right of centre.
      gl.uniform2f(uOff, Math.min(halfW * 0.42, 1.25), 0.02)
      gl.uniform1f(uScale, 0.95)
    } else {
      // Text sits low on tall screens, so the light rises into the top half.
      gl.uniform2f(uOff, 0, 0.62)
      gl.uniform1f(uScale, Math.min(0.78, halfW / 1.6))
    }
    gl.uniform1f(uSize, 2.1 * dpr * Math.min(1.35, Math.max(0.8, Math.min(w, h) / 820)))
  }

  const frame = (now: number) => {
    raf = running ? requestAnimationFrame(frame) : 0
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016)
    last = now
    time += dt
    current += (target - current) * Math.min(1, dt * 6)
    if (Math.abs(target - current) < 0.0005) current = target
    ex += (px - ex) * Math.min(1, dt * 3)
    ey += (py - ey) * Math.min(1, dt * 3)

    const a = Math.min(FORMATIONS - 2, Math.floor(current))
    const local = current - a
    // The formation lands at about 62% of the chapter, where its copy peaks.
    const t = Math.min(1, Math.max(0, (local - 0.1) / 0.52))
    gl.uniform1i(uA, a)
    gl.uniform1f(uT, t)
    gl.uniform1f(uTime, time)
    gl.uniform2f(uRot, Math.sin(time * 0.13) * 0.3 + ex * 0.22, -0.06 + Math.sin(time * 0.11) * 0.05 + ey * 0.12)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, count)
  }

  resize()

  return {
    setTarget: (v) => {
      target = v
    },
    setPointer: (x, y) => {
      px = x
      py = y
    },
    resize,
    start: () => {
      if (running) return
      running = true
      last = 0
      raf = requestAnimationFrame(frame)
    },
    stop: () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    },
    destroy: () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      buffers.forEach((b) => gl.deleteBuffer(b))
      gl.deleteVertexArray(vao)
      gl.deleteProgram(prog)
    },
  }
}
