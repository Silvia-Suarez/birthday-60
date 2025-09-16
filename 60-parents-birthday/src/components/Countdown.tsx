import { useEffect, useState } from "react";

const Countdown = () => {
  const targetDate = new Date("2025-11-03T19:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / (1000)) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [new Date().getTime()]);

  return (
    <section className="bg-soft-pink py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-montserrat text-deep-blue mb-6">
        ⏳ La cuenta regresiva ya empezó…
      </h2>
      <div className="flex justify-center gap-6 text-3xl font-bold text-coral">
        <div>{timeLeft.days}d</div>
        <div>{timeLeft.hours}h</div>
        <div>{timeLeft.minutes}m</div>
        <div>{timeLeft.seconds}s</div>
      </div>
    </section>
  );
};

export default Countdown;
