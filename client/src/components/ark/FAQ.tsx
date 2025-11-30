import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// todo: remove mock functionality
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
  return (
    <section className="py-20 md:py-28 bg-white" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about ARK and $ACT.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-100 rounded-xl px-6 data-[state=open]:border-ark-orange/30 data-[state=open]:bg-ark-cream/50"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-ark-orange hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
