import { useEffect } from "react";
import { gsap } from "gsap";
import _ from "lodash";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

const DECAY = 2;
const SPREAD = 60;
const GRAVITY = 1200;
gsap.registerPlugin(Physics2DPlugin);

class ConfettiCannon {
  canvas: HTMLCanvasElement;
  dpr: number;
  ctx: CanvasRenderingContext2D;
  confettiSpriteIds: string[];
  confettiSprites: any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.dpr = window.devicePixelRatio || 1;
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.scale(this.dpr, this.dpr);

    this.confettiSpriteIds = [];
    this.confettiSprites = {};

    this.render = this.render.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setCanvasSize = this.setCanvasSize.bind(this);

    this.setupListeners();
    this.setCanvasSize();

    // Demo auto-fire
    setTimeout(this.handleClick, 1000);
  }

  setupListeners() {
    gsap.ticker.add(this.render);
    window.addEventListener("click", this.handleClick);
    window.addEventListener("resize", this.setCanvasSize);
  }

  setCanvasSize() {
    this.canvas.width = window.innerWidth * this.dpr;
    this.canvas.height = window.innerHeight * this.dpr;
    this.canvas.style.width = window.innerWidth + "px";
    this.canvas.style.height = window.innerHeight + "px";
  }

  handleClick() {
    const x = window.innerWidth / 2;
    const y = window.innerHeight;
    const particles = 200;
    const velocity = 1000 * 10;

    [0, 45, 90, 135, 180, 225, 270, 315].forEach((angle) => {
      this.addConfettiParticles(particles, angle, velocity, x, y);
    });
  }

  addConfettiParticles(
    amount: number,
    angle: number,
    velocity: number,
    x: number,
    y: number
  ) {
    let i = 0;
    while (i < amount) {
      const r = _.random(4, 6) * this.dpr;
      const d = _.random(15, 25) * this.dpr;
      const colors = ["tomato", "orange", "slateblue", "mediumseagreen"];
      const color = colors[_.random(0, colors.length - 1)];
      const tilt = _.random(10, -10);
      const tiltAngleIncremental = _.random(0.05, 0.07);

      const id = _.uniqueId();
      const sprite = {
        [id]: {
          angle,
          velocity,
          x,
          y,
          r,
          d,
          color,
          tilt,
          tiltAngleIncremental,
          tiltAngle: 0,
        },
      };

      Object.assign(this.confettiSprites, sprite);
      this.confettiSpriteIds.push(id);
      this.tweenConfettiParticle(id);
      i++;
    }
  }

  tweenConfettiParticle(id: string) {
    const minAngle = this.confettiSprites[id].angle - SPREAD / 2;
    const maxAngle = this.confettiSprites[id].angle + SPREAD / 2;
    const minVelocity = this.confettiSprites[id].velocity / 4;
    const maxVelocity = this.confettiSprites[id].velocity;

    const velocity = _.random(minVelocity, maxVelocity);
    const angle = _.random(minAngle, maxAngle);
    const friction = _.random(0.1, 0.25);

    gsap.to(this.confettiSprites[id], {
      duration: DECAY,
      physics2D: {
        velocity,
        angle,
        gravity: GRAVITY,
        friction,
      },
      d: 0,
      ease: "power4.in",
      onComplete: () => {
        _.pull(this.confettiSpriteIds, id);
        delete this.confettiSprites[id];
      },
    });
  }

  updateConfettiParticle(id: string) {
    const sprite = this.confettiSprites[id];
    const tiltAngle = 0.0005 * sprite.d;
    sprite.angle += 0.01;
    sprite.tiltAngle += tiltAngle + sprite.tiltAngleIncremental;
    sprite.tilt = Math.sin(sprite.tiltAngle - sprite.r / 2) * sprite.r * 2;
    sprite.y += Math.sin(sprite.angle + sprite.r) * 4;
    sprite.x += Math.cos(sprite.angle) * 2;
  }

  drawConfetti() {
    this.confettiSpriteIds.forEach((id) => {
      const sprite = this.confettiSprites[id];
      this.ctx.beginPath();
      this.ctx.lineWidth = sprite.d / 1.5;
      this.ctx.strokeStyle = sprite.color;
      this.ctx.moveTo(sprite.x * 2 + sprite.tilt + sprite.r, sprite.y);
      this.ctx.lineTo(
        sprite.x * 2 + sprite.tilt,
        sprite.y + sprite.tilt + sprite.r
      );
      this.ctx.stroke();
      this.updateConfettiParticle(id);
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawConfetti();
  }
}

const Confetti = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
      new ConfettiCannon(canvas);
    }
  }, []);

  return (
    <canvas
      id="canvas"
      className="absolute top-0 w-full h-full cursor-pointer"
    />
  );
};

export default Confetti;
