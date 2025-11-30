import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { easing } from "@/lib/motion";

const faqs = [
  {
    question: "What is $ACT and how does it work?",
    answer: "$ACT is the native token of the ARK Movement ecosystem. When you buy or sell $ACT, a small percentage of each transaction goes to the treasury, which funds real-world social impact missions. Additionally, holders earn passive reflections from every transaction.",
  },
  {
    question: "How can I buy $ACT tokens?",
    answer: "You can purchase $ACT on PancakeSwap using BNB. Simply connect your wallet (like MetaMask or Trust Wallet), swap BNB for $ACT using our contract address, and you're part of the movement. Make sure to set slippage to 12-15% for successful transactions.",
  },
  {
    question: "What percentage goes to charity?",
    answer: "5% of every transaction goes directly to the ARK Treasury, which exclusively funds vetted social impact missions. This is in addition to the 3% holder reflections and 2% burn mechanism that increases token scarcity.",
  },
  {
    question: "How are missions selected?",
    answer: "Missions are selected through community governance. Token holders can nominate causes they care about, and the community votes on which missions receive funding. All missions are vetted for legitimacy before being listed.",
  },
  {
    question: "Is the contract audited?",
    answer: "Yes, our smart contract has been fully audited by CertiK, one of the leading blockchain security firms. The audit report is publicly available, and we maintain transparency in all our operations.",
  },
  {
    question: "Can I nominate a cause for funding?",
    answer: "Absolutely! Any $ACT holder can nominate a cause through our Nominate page. Provide details about the cause, why it matters, and any supporting documentation. Approved nominations go to community vote.",
  },
  {
    question: "What networks is $ACT available on?",
    answer: "Currently, $ACT is available on Binance Smart Chain (BSC). We have plans for multi-chain expansion in Q2 2025, which will include Ethereum and other major networks.",
  },
  {
    question: "How do I track mission impact?",
    answer: "All funded missions are tracked on our Impact page. You can see real-time funding progress, mission updates, photos, and final impact reports. Every transaction is verifiable on-chain for full transparency.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="py-24 md:py-32 bg-white relative overflow-hidden" 
      data-testid="faq-section"
    >
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-ark-orange/5 to-transparent blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: easing.cinematic }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: easing.overshoot }}
            className="inline-block px-4 py-1.5 rounded-full bg-ark-magenta/10 text-ark-magenta text-sm font-medium mb-6"
          >
            FAQ
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-[-0.02em]">
            <motion.span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 0.8, ease: easing.cinematic, delay: 0.1 }}
              >
                Questions & Answers
              </motion.span>
            </motion.span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: easing.smooth }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to know about ARK and $ACT.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: easing.cinematic }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.05, ease: easing.smooth }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-0 bg-ark-cream/50 rounded-2xl px-6 data-[state=open]:bg-white data-[state=open]:shadow-premium transition-all duration-300"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-ark-orange hover:no-underline py-6 text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
