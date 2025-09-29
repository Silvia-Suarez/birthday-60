import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
        seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "d", value: timeLeft.days },
    { label: "h", value: timeLeft.hours },
    { label: "m", value: timeLeft.minutes },
    { label: "s", value: timeLeft.seconds },
  ];

  return (
    <section className="bg-coral dark:bg-blue-200 py-20 text-center">
      <h2 className="text-2xl md:text-5xl pb-10 font-montserrat text-white-ivory font-bold mb-6">
        La cuenta regresiva ya empezó…
      </h2>

      <div className="flex justify-center px-3 md:px-0 gap-6">
        {timeUnits.map((unit) => (
          <AnimatePresence key={`${unit.label}-${unit.value}`} mode="popLayout">
            <motion.div
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-coral rounded-2xl shadow-xl px-6 py-4 text-3xl font-bold text-coral dark:text-white w-20 h-24 flex items-center justify-center relative overflow-hidden"
            >
              {unit.value}
              <span className="text-lg ml-1">{unit.label}</span>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </section>
  );
};

export default Countdown;
