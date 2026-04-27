"use client";
import React from 'react';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
export default function PrivacyPolicy() {
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
          <h1 className="font-serif text-3xl md:text-5xl text-brand-earth mb-4 md:mb-6">Privacy Policy</h1>
          <p className="text-brand-earth/60 text-lg leading-relaxed">
            Effective Date: April 25, 2026. This Privacy Policy explains how <b>Manjaro Global</b>{' '}
            handling your data. We reserve the right to modify this policy at any time.
          </p>
        </header>

        <div className="glass-card rounded-3xl md:rounded-[48px] p-6 md:p-16 space-y-8 md:space-y-12 border border-brand-earth/5 shadow-2xl text-brand-earth">
          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">1. Introduction</h2>
            <p>
              1.1 This Privacy Policy explains how Manjaro Global (“the Platform”, “we”, “us”, or
              “our”) collects, uses, discloses, and protects personal data of users who access or
              use our services.
            </p>
            <p>
              1.2 This Policy applies to all users, including travelers, guides, agents, and
              administrators across all jurisdictions in which the Platform operates.
            </p>
            <p>
              1.3 By accessing or using the Platform, you acknowledge that you have read and
              understood this Privacy Policy and agree to the collection and use of your data in
              accordance with its terms.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">2. Scope of Data Collection</h2>
            <p>
              2.1 We collect personal data that you voluntarily provide when registering, booking,
              or interacting with the Platform.
            </p>
            <p>
              2.2 Personal data may include identification information such as full name, email
              address, phone number, date of birth, nationality, and profile photograph.
            </p>
            <p>
              2.3 For guides and providers, additional data may include government-issued
              identification, certifications, bank or wallet details, and verification videos.
            </p>
            <p>
              2.4 We may collect transactional data including booking history, payment details, and
              service interactions.
            </p>
            <p>
              2.5 Technical data such as IP address, device type, browser type, operating system,
              and usage behavior may be collected automatically.
            </p>
            <p>
              2.6 Location data may be collected where required to provide services such as trip
              tracking, search results, and safety features.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">3. Purpose of Data Processing</h2>
            <p>
              3.1 Personal data is processed to provide and maintain the Platform’s services,
              including account creation, booking management, and communication between users.
            </p>
            <p>
              3.2 Data is used to facilitate secure payments, including escrow handling and currency
              conversions via integrated payment providers.
            </p>
            <p>
              3.3 Data is used to verify user identity, prevent fraud, and ensure trust within the
              marketplace.
            </p>
            <p>
              3.4 Data may be used to personalize user experience, including recommendations, search
              results, and localized content.
            </p>
            <p>
              3.5 Data may be used to communicate important updates, notifications, and customer
              support responses.
            </p>
            <p>
              3.6 Data may be used for internal analytics, system improvement, and performance
              optimization.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">4. Legal Basis for Processing</h2>
            <p>
              4.1 Processing of personal data is based on contractual necessity where required to
              provide services requested by the user.
            </p>
            <p>
              4.2 Processing may be based on legitimate interests, including fraud prevention,
              platform security, and service improvement.
            </p>
            <p>
              4.3 Processing may be based on user consent where explicitly obtained, including
              marketing communications.
            </p>
            <p>
              4.4 Processing may be required to comply with legal obligations under applicable laws
              and regulations.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">5. Data Sharing and Disclosure</h2>
            <p>
              5.1 Personal data may be shared with other users where necessary to complete a booking
              or provide services, including sharing traveler details with guides.
            </p>
            <p>
              5.2 Data may be shared with third-party service providers including payment
              processors, cloud hosting providers, analytics services, and communication tools.
            </p>
            <p>
              5.3 Data may be disclosed to regulatory authorities, law enforcement agencies, or
              courts where required by law.
            </p>
            <p>
              5.4 In the event of a merger, acquisition, or asset sale, user data may be transferred
              to a successor entity.
            </p>
            <p>5.5 We do not sell personal data to third parties.</p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">6. International Data Transfers</h2>
            <p>
              6.1 As a global platform, data may be transferred across borders to jurisdictions
              where data protection laws may differ.
            </p>
            <p>
              6.2 We implement appropriate safeguards to ensure that such transfers comply with
              applicable data protection laws.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">7. Data Retention</h2>
            <p>
              7.1 Personal data is retained only for as long as necessary to fulfill the purposes
              outlined in this Policy.
            </p>
            <p>
              7.2 Transactional and financial data may be retained for longer periods to comply with
              legal and regulatory requirements.
            </p>
            <p>
              7.3 Users may request deletion of their data, subject to legal and operational
              limitations.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">8. Data Security</h2>
            <p>
              8.1 We implement technical and organizational measures to protect personal data
              against unauthorized access, loss, misuse, or alteration.
            </p>
            <p>
              8.2 Security measures include encryption, access controls, secure servers, and regular
              system monitoring.
            </p>
            <p>8.3 Despite these measures, no system can guarantee absolute security.</p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">9. User Rights</h2>
            <p>9.1 Users have the right to access, correct, or update their personal data.</p>
            <p>
              9.2 Users have the right to request deletion of their data, subject to legal
              constraints.
            </p>
            <p>9.3 Users have the right to object to or restrict certain processing activities.</p>
            <p>9.4 Users may withdraw consent for processing where consent is the legal basis.</p>
            <p>9.5 Requests can be made through the Platform or designated support channels.</p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">
              10. Cookies and Tracking Technologies
            </h2>
            <p>
              10.1 The Platform uses cookies and similar technologies to enhance user experience and
              analyze usage.
            </p>
            <p>10.2 Users may manage cookie preferences through browser settings.</p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">11. Children’s Privacy</h2>
            <p>
              11.1 The Platform is not intended for individuals under the age of 18 without parental
              consent.
            </p>
            <p>
              11.2 We do not knowingly collect data from minors without appropriate authorization.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">12. Changes to This Policy</h2>
            <p>12.1 We may update this Privacy Policy from time to time.</p>
            <p>
              12.2 Users will be notified of significant changes through the Platform or other
              communication channels.
            </p>
          </section>

          <section className="space-y-6 text-sm text-brand-earth/70 leading-relaxed">
            <h2 className="font-serif text-2xl text-brand-teal">13. Contact Information</h2>
            <p>
              13.1 Users may contact us regarding privacy concerns through official support channels
              provided on the Platform.
            </p>
          </section>

          <div className="pt-12 border-t border-brand-earth/10">
            <Link
              href="/regional-compliance"
              className="text-brand-teal font-bold hover:underline mb-4 inline-block"
            >
              View Regional Compliance Addendum
            </Link>
            <p className="text-xs text-brand-earth/40 italic">
              Questions about our privacy practices? Contact us at legal@aturtrip.global
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
