import { motion } from "framer-motion";

interface LegalContentProps {
  type: "privacy" | "terms";
}

export default function LegalContent({ type }: LegalContentProps) {
  const isPrivacy = type === "privacy";
  
  return (
    <section className="py-20 md:py-28 bg-white" data-testid={`legal-${type}-section`}>
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isPrivacy ? "Privacy Policy" : "Terms of Service"}
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: November 30, 2024
          </p>

          <div className="prose prose-gray max-w-none">
            {isPrivacy ? (
              <>
                <h2>1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you
                  create an account, make a donation, nominate a cause, or contact us
                  for support. This may include your name, email address, wallet address,
                  and transaction history.
                </p>

                <h2>2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to provide, maintain, and improve
                  our services, process transactions, send you technical notices and
                  support messages, and communicate with you about products, services,
                  and events.
                </p>

                <h2>3. Information Sharing</h2>
                <p>
                  We do not share your personal information with third parties except
                  as described in this policy. We may share information with service
                  providers who perform services on our behalf, when required by law,
                  or to protect our rights and the safety of others.
                </p>

                <h2>4. Blockchain Data</h2>
                <p>
                  Please note that blockchain transactions are public and permanent.
                  When you make transactions using $ACT tokens, your wallet address
                  and transaction history will be visible on the blockchain.
                </p>

                <h2>5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to
                  protect your personal information against unauthorized access,
                  alteration, disclosure, or destruction.
                </p>

                <h2>6. Your Rights</h2>
                <p>
                  You have the right to access, correct, or delete your personal
                  information. You may also opt out of marketing communications at
                  any time by contacting us.
                </p>

                <h2>7. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact
                  us at privacy@arkmovement.io.
                </p>
              </>
            ) : (
              <>
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the ARK Movement website and services, you
                  agree to be bound by these Terms of Service. If you do not agree
                  to these terms, please do not use our services.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                  ARK Movement provides a Web3 platform for social impact through
                  cryptocurrency. Our services include the $ACT token ecosystem,
                  mission funding, community governance, and related features.
                </p>

                <h2>3. Risk Disclosure</h2>
                <p>
                  Cryptocurrency investments involve significant risk. The value of
                  $ACT tokens can fluctuate dramatically. You should only invest what
                  you can afford to lose. ARK Movement does not provide financial advice.
                </p>

                <h2>4. User Responsibilities</h2>
                <p>
                  You are responsible for maintaining the security of your wallet
                  and private keys. You agree not to use our services for any illegal
                  activities or in violation of any applicable laws.
                </p>

                <h2>5. Donations and Missions</h2>
                <p>
                  Donations made through the platform are final and non-refundable.
                  While we vet all missions, ARK Movement cannot guarantee specific
                  outcomes of charitable activities.
                </p>

                <h2>6. Intellectual Property</h2>
                <p>
                  All content, trademarks, and intellectual property on this website
                  are owned by ARK Movement or its licensors. You may not reproduce,
                  distribute, or create derivative works without permission.
                </p>

                <h2>7. Limitation of Liability</h2>
                <p>
                  ARK Movement shall not be liable for any indirect, incidental,
                  special, or consequential damages arising from your use of our
                  services or inability to access them.
                </p>

                <h2>8. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Continued
                  use of our services after changes constitutes acceptance of the
                  new terms.
                </p>

                <h2>9. Contact</h2>
                <p>
                  For questions about these Terms of Service, contact us at
                  legal@arkmovement.io.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
