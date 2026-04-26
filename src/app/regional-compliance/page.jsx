"use client";
import React from 'react';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
export default function RegionalCompliance() {
  return (
    <div className="min-h-screen bg-brand-warm/30 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/privacy"
          className="inline-flex items-center text-sm font-bold text-brand-earth/40 hover:text-brand-earth mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Privacy Policy
        </Link>

        <header className="mb-16">
          <h1 className="font-serif text-5xl text-brand-earth mb-6">
            Regional Compliance Addendum
          </h1>
          <p className="text-brand-earth/60 text-lg leading-relaxed">
            Effective Date: April 25, 2026. This Addendum supplements the Privacy Policy and Terms
            of Use for specific jurisdictions.
          </p>
        </header>

        <div className="glass-card rounded-[48px] p-8 md:p-16 space-y-12 border border-brand-earth/5 shadow-2xl text-brand-earth">
          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">1. General Applicability</h2>
            <p>
              1.1 This Addendum supplements the Privacy Policy and Terms of Use and applies where
              required by applicable data protection and consumer protection laws in specific
              jurisdictions.
            </p>
            <p>
              1.2 In the event of any conflict between this Addendum and the general Privacy Policy
              or Terms of Use, the provisions of this Addendum shall prevail to the extent required
              by applicable law.
            </p>
            <p>
              1.3 This Addendum applies to users located in or whose data is processed under the
              laws of the European Economic Area, the United Kingdom, Nigeria, and other applicable
              jurisdictions.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">
              2. European Economic Area (GDPR Compliance)
            </h2>
            <p>
              <b>2.1 Legal Framework</b>
            </p>
            <p>
              2.1.1 Processing of personal data for users located in the European Economic Area is
              governed by the General Data Protection Regulation (GDPR).
            </p>
            <p>
              2.1.2 For the purposes of GDPR, the Platform acts as a Data Controller in relation to
              user account data and as a Data Processor where processing is conducted on behalf of
              guides or partners.
            </p>

            <p>
              <b>2.2 Lawful Bases for Processing</b>
            </p>
            <p>
              2.2.1 Processing is carried out under one or more lawful bases, including contractual
              necessity, legal obligation, legitimate interest, and explicit consent.
            </p>

            <p>
              <b>2.3 Data Subject Rights</b>
            </p>
            <p>
              2.3.1 Users have the right to access, rectification, erasure (“right to be
              forgotten”), restriction, and data portability.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">3. United Kingdom (UK GDPR)</h2>
            <p>
              3.1 Processing of personal data for users in the United Kingdom is governed by the UK
              GDPR and the Data Protection Act 2018.
            </p>
            <p>
              3.2 Users in the United Kingdom are entitled to rights equivalent to those under EU
              GDPR.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">4. Nigeria (NDPR Compliance)</h2>
            <p>
              4.1 Processing of personal data for users in Nigeria is governed by the Nigeria Data
              Protection Regulation (NDPR).
            </p>
            <p>
              4.2 Consent must be obtained before processing personal data unless another lawful
              basis applies.
            </p>
            <p>
              4.3 Users have the right to access, correct, and request deletion of their personal
              data.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">5. Other Jurisdictions</h2>
            <p>
              5.1 The Platform complies with applicable data protection laws in African (e.g.,
              Kenya, South Africa, Ghana) and Caribbean jurisdictions where it operates.
            </p>
            <p>
              5.2 In Kenya, compliance aligns with the Data Protection Act, 2019. In South Africa,
              it aligns with POPIA. In Ghana, it aligns with the Data Protection Act, 2012.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">
              6. Caribbean and International Jurisdictions
            </h2>
            <p>
              6.1 The Platform shall comply with applicable data protection and consumer laws in
              Caribbean jurisdictions where services are offered, such as Jamaica and Barbados.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">
              7. Payment & Financial Compliance
            </h2>
            <p>
              7.1 Payment processing may involve global providers such as Stripe and Flutterwave.
              These providers may process financial data in accordance with their own regulatory
              obligations.
            </p>
            <p>
              7.2 The Platform complies with applicable anti-money laundering (AML) and
              counter-terrorism financing (CTF) regulations.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">
              8. Consumer Protection & Liability
            </h2>
            <p>
              8.1 EU and UK Consumers may have additional rights under consumer protection laws,
              including withdrawal rights for certain bookings where applicable.
            </p>
            <p>
              8.2 The Platform acts as an intermediary and does not assume liability for services
              provided by guides, except where required by law.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">9. Dispute Resolution</h2>
            <p>
              9.1 EU Users may access alternative dispute resolution mechanisms as provided under EU
              law.
            </p>
            <p>
              9.2 Nigeria and African users may resolve disputes through mediation, arbitration, or
              courts of competent jurisdiction.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">10. Data Breach Notification</h2>
            <p>
              10.1 In the event of a data breach, affected users shall be notified in accordance
              with applicable laws (e.g., within 72 hours for GDPR jurisdictions).
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">11. Updates to This Addendum</h2>
            <p>
              11.1 This Addendum may be updated to reflect regulatory changes. Continued use of the
              Platform constitutes acceptance of updated provisions.
            </p>
          </section>

          <div className="pt-12 border-t border-brand-earth/10">
            <p className="text-xs text-brand-earth/40 italic">
              Questions about regional compliance? Contact our Data Privacy Officer via the Help
              Center. Last update: April 25, 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
