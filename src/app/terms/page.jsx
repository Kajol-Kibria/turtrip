"use client";
import React from 'react';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-brand-warm/30 pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-bold text-brand-earth/40 hover:text-brand-earth mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <header className="mb-10 md:mb-16">
          <h1 className="font-serif text-3xl md:text-5xl text-brand-earth mb-4 md:mb-6">Terms of Use</h1>
          <p className="text-brand-earth/60 text-lg leading-relaxed">
            Effective Date: April 25, 2026. By accessing Manjaro Global, you enter into a legally
            binding agreement. We reserve the right to modify these terms at any time.
          </p>
        </header>

        <div className="glass-card rounded-3xl md:rounded-[48px] p-6 md:p-16 space-y-8 md:space-y-12 border border-brand-earth/5 shadow-2xl text-brand-earth">
          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">1. Acceptance of Terms</h2>
            <p>1.1 These Terms of Use govern access to and use of the Platform.</p>
            <p>1.2 By using the Platform, you agree to be bound by these Terms.</p>
            <p>1.3 If you do not agree, you must discontinue use immediately.</p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">2. Description of Services</h2>
            <p>
              2.1 The Platform provides a marketplace connecting travelers with local guides and
              tour providers.
            </p>
            <p>
              2.2 The Platform facilitates discovery, booking, communication, and payment
              processing.
            </p>
            <p>
              2.3 The Platform does not directly provide travel services unless explicitly stated.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">3. User Accounts</h2>
            <p>3.1 Users must create an account to access certain features.</p>
            <p>
              3.2 Users are responsible for maintaining the confidentiality of their account
              credentials.
            </p>
            <p>3.3 Users must provide accurate and complete information.</p>
            <p>
              3.4 We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">4. Booking and Payments</h2>
            <p>4.1 Bookings are confirmed only after payment is successfully processed.</p>
            <p>4.2 Payments are held in escrow and released to guides after service completion.</p>
            <p>4.3 Currency conversion may apply based on user location and payment method.</p>
            <p>4.4 Users are responsible for reviewing all booking details before confirming.</p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">5. Cancellations and Refunds</h2>
            <p>5.1 Cancellation policies are determined by guides and displayed on each listing.</p>
            <p>5.2 Refund eligibility depends on the applicable cancellation policy.</p>
            <p>5.3 The Platform may intervene in disputes at its discretion.</p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">6. User Conduct</h2>
            <p>
              6.1 Users agree not to use the Platform for unlawful, fraudulent, or abusive purposes.
            </p>
            <p>6.2 Users must not misrepresent identity, qualifications, or services.</p>
            <p>6.3 Users must respect other users and comply with local laws.</p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">7. Guide Responsibilities</h2>
            <p>7.1 Guides are responsible for the accuracy of their listings.</p>
            <p>7.2 Guides must deliver services as described.</p>
            <p>7.3 Guides must comply with applicable licensing and safety regulations.</p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">8. Platform Role and Liability</h2>
            <p>8.1 The Platform acts as an intermediary between users.</p>
            <p>8.2 The Platform does not guarantee the quality, safety, or legality of services.</p>
            <p>8.3 Users assume responsibility for their interactions and experiences.</p>
            <p>
              8.4 To the maximum extent permitted by law, the Platform is not liable for indirect or
              consequential damages.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">9. Dispute Resolution</h2>
            <p>
              9.1 Users agree to attempt resolution through the Platform before pursuing legal
              action.
            </p>
            <p>
              9.2 The Platform may mediate disputes but is not obligated to provide binding
              resolutions.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">10. Intellectual Property</h2>
            <p>
              10.1 All content on the Platform, excluding user-generated content, is owned by the
              Platform.
            </p>
            <p>
              10.2 Users grant the Platform a license to use uploaded content for operational and
              promotional purposes.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">11. Termination</h2>
            <p>
              11.1 We may suspend or terminate access to the Platform for violations of these Terms.
            </p>
            <p>11.2 Users may terminate their account at any time.</p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">12. Governing Law</h2>
            <p>
              12.1 These Terms are governed by applicable international and local laws depending on
              user jurisdiction.
            </p>
            <p>
              12.2 Disputes may be subject to arbitration or courts as determined by the Platform.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">13. Amendments</h2>
            <p>13.1 We reserve the right to modify these Terms at any time.</p>
            <p>13.2 Continued use of the Platform constitutes acceptance of updated Terms.</p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">14. Contact</h2>
            <p>
              14.1 Users may contact the Platform through official support channels for inquiries
              regarding these Terms.
            </p>
          </section>

          <div className="pt-12 border-t border-brand-earth/10 text-center">
            <Link
              href="/regional-compliance"
              className="text-brand-teal font-bold hover:underline mb-8 inline-block"
            >
              View Regional Compliance Addendum
            </Link>
            <p className="text-sm font-bold text-brand-earth opacity-60">
              © 2026 Manjaro Global. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
