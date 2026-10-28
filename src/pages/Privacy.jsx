export default function PrivacyPolicy() {
  return (
    <section className="container mb-5" data-route="privacy">
      <div className="legal-page mx-auto py-4 px-3">
        <h3>Privacy Policy</h3>
        <p className="text-muted small">Last updated: 19 October 2026</p>

        <p>
          This website is a personal portfolio run by Vincent du Plessis in South Africa. This
          policy explains what personal information is collected when you use it, why, and what
          your rights are under the Protection of Personal Information Act (POPIA) and, where it
          applies, the GDPR.
        </p>

        <h5 className="mt-4">1. What I collect</h5>
        <p className="mb-1">
          <strong>Contact form.</strong> If you send a message, I receive your name, email
          address, subject (if you give one) and the message itself. You choose what to include.
        </p>
        <p className="mb-1">
          <strong>Page view statistics.</strong> I use GoatCounter, a privacy-friendly analytics
          service, to count visits. It records which page was viewed, the page title, the
          referring site, and general technical details such as browser, screen size and
          country. It does not use cookies and does not build profiles of individual visitors.
        </p>
        <p>
          <strong>Server logs.</strong> The hosting provider GitHub Pages (github.com) may keep
          standard technical logs, such as IP address and time of request, for security and
          reliability.
        </p>

        <h5 className="mt-4">2. Why I collect it</h5>
        <ul>
          <li>To read and reply to messages you send me.</li>
          <li>To understand which parts of the site are used so I can improve it.</li>
          <li>To keep the site secure and working.</li>
        </ul>

        <h5 className="mt-4">3. Who processes it</h5>
        <p>
          Contact form messages are handled by <strong>Web3Forms</strong>, which delivers them to
          my inbox. Analytics are provided by <strong>GoatCounter</strong>. These services may
          process data outside South Africa. I do not sell your information or use it for
          marketing, and I only share it with these service providers so the site can work.
        </p>

        <h5 className="mt-4">4. How long I keep it</h5>
        <p>
          Messages are kept only as long as needed to deal with your enquiry, and no longer than
          12 months unless we are in ongoing contact. Analytics data is aggregated and contains
          no personal details.
        </p>

        <h5 className="mt-4">5. Your rights</h5>
        <p>
          You may ask to see the personal information I hold about you, have it corrected or
          deleted, or object to its processing. Email me at{" "}
          <a href="mailto:vinduples@gmail.com">vinduples@gmail.com</a> and I will respond within
          a reasonable time. If you are unhappy with how I handle your information, you can
          complain to South Africa's Information Regulator (
          <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">
            inforegulator.org.za
          </a>
          ).
        </p>

        <h5 className="mt-4">6. Security</h5>
        <p>
          I take reasonable steps to protect information, but no method of transmission over the
          internet is completely secure.
        </p>

        <h5 className="mt-4">7. Third-party content</h5>
        <p>
          Some site resources (such as fonts, scripts or icons) may load from external servers,
          which can see your IP address when your browser requests them. Links to other websites,
          such as GitHub and LinkedIn, are governed by those sites' own policies.
        </p>

        <h5 className="mt-4">8. Changes</h5>
        <p>
          I may update this policy from time to time. The date at the top shows when it last
          changed.
        </p>
      </div>
    </section>
  );
}