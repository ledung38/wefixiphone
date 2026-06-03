import { AnimateDiv } from "@/components/common/Animate";
import { TextGradient } from "@/components/common/TextGradient";
import { MapPin } from "lucide-react";

const HomeAreas = () => {
  const areas = [
    "Bankstown",
    "Punchbowl",
    "Lakemba",
    "Yagoona",
    "Greenacre",
    "Campsie",
    "Canterbury",
    "Marrickville",
    "Revesby",
    "Padstow",
    "Panania",
    "Lidcombe",
    "Auburn",
    "Parramatta",
    "Fairfield",
    "Strathfield",
    "Burwood",
    "Homebush",
    "Sydney Olympic Park",
    "Sydney CBD",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full py-12 md:py-16 bg-[#c8e1f5] z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 5">
        {/* Section header */}
        <AnimateDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <TextGradient
            as="h2"
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Service Areas
          </TextGradient>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            We proudly serve all of Sydney and surrounding areas
          </p>
        </AnimateDiv>

        {/* Areas grid */}
        <AnimateDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {areas.map((area, index) => (
            <AnimateDiv
              key={index}
              variants={itemVariants as any}
              className="p-4 rounded-xl bg-white hover:scale-105 border border-border/50 hover:border-primary/50 flex items-center gap-3 transition-all duration-300 cursor-pointer group border-l-4 border-primary dark:border-primary/30 dark:bg-card"
            >
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-muted group-hover:text-primary ">
                {area}
              </span>
            </AnimateDiv>
          ))}
        </AnimateDiv>

        {/* Additional info */}
        <AnimateDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted max-w-2xl mx-auto">
            {`Don't see your area listed? Contact us to discuss custom service
            arrangements for your location.`}
          </p>
        </AnimateDiv>
      </div>
    </section>
  );
};

export default HomeAreas;
