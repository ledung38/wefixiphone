"use client";
import { AnimateDiv } from "@/components/common/Animate";
import { TextGradient } from "@/components/common/TextGradient";
import { CommentStar } from "@/components/icons/home";
import { Container } from "@/components/ui";
import ListComment from "@/modules/home/components/ListComment";
import { ratingsExample } from "@/modules/home/contants";
import { motion } from "motion/react";

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-b from-white to-primary/80">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30" />
      </div>

      <Container>
        {/* Section Header */}
        <motion.div
          className="text-center space-y-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <TextGradient className="text-4xl sm:text-5xl font-black  mb-2 inline-block">
            Loved by Our Clients
            <CommentStar className="mb-2 max-sm:size-[28px] inline-block ml-3" />
          </TextGradient>
          <motion.p
            variants={itemVariants}
            className="text-lg max-w-3xl mx-auto text-slate-600 dark:text-slate-300 "
          >
            {`Real feedback from real customers who've experienced our premium
            on-site iPhone repair service.`}
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <AnimateDiv
          variants={{
            hidden: { opacity: 0, transform: "scale(0.9)" },
            visible: { opacity: 1, transform: "scale(1)" },
          }}
          initial="hidden"
          animate={"visible"}
          className="w-full"
          transition={{ type: "spring", delay: 0.5 }}
        >
          <ListComment data={ratingsExample} />
        </AnimateDiv>
        {/* Stats Section */}
        {/* <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-8 lg:px-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { number: "500+", label: "Happy Clients", icon: "😊" },
            { number: "99%", label: "Satisfaction Rate", icon: "⭐" },
            { number: "5★", label: "Average Rating", icon: "🏆" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-5xl mb-2">{stat.icon}</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                {stat.number}
              </p>
              <p className="text-foreground/70 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Social Proof */}
        {/* <motion.div
          className="mt-12 p-8 rounded-2xl bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              Follow Us & See More
            </h3>
            <p className="text-muted max-w-2xl mx-auto">
              Check out our Instagram @wefixiphone for more customer
              reviews, before & after galleries, and exclusive repair tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="https://www.instagram.com/wefixiphone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all"
              >
                Follow on Instagram
              </a>
              <a
                href="https://www.facebook.com/wefixiphone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-semibold rounded-lg transition-all"
              >
                Like on Facebook
              </a>
            </div>
          </div>
        </motion.div> */}
      </Container>
    </section>
  );
};

export default Testimonials;
