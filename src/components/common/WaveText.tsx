import { motion } from "framer-motion";

export default function WaveText({ text = "Hôm nay tôi đi làm vui quá" }) {
  const mid = Math.floor(text.length / 2);

  const leftPart = text.slice(0, mid).split("");
  const rightPart = text.slice(mid).split("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize: "2rem",
        overflow: "hidden",
      }}
    >
      <motion.span
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { x: 0, scale: 1 },
          visible: {
            x: [-600, 0],
            transition: {
              delay: 0,
              type: "tween",
              ease: "easeOut",
              duration: 1.2,
            },
          },
        }}
      >
        {/* Left side */}
        {leftPart.map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { x: 0, scale: 1 },
              visible: (i) => ({
                scale: [1, 1.5, 1], // chữ to → nhỏ → vừa
                transition: {
                  delay: i * 0.05,
                  ease: "easeOut",
                  duration: 0.5,
                },
              }),
            }}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>

      <motion.span
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { x: 0, scale: 1 },
          visible: {
            x: [600, 0],
            transition: {
              delay: 0,
              type: "tween",
              ease: "easeOut",
              duration: 1.2,
            },
          },
        }}
      >
        {/* Right side */}
        {rightPart.map((char, i) => (
          <motion.span
            key={i + mid}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { x: 0, scale: 0 },
              visible: (i) => ({
                x: [0, 0], // nhún sang phải → về trung tâm
                scale: [1, 1.5, 1],
                transition: {
                  delay: i * -0.05 + 0.8,
                  ease: "easeOut",
                  duration: 0.5,
                },
              }),
            }}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}
