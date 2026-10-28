export default function Cookies() {
  return (
    <section className="container mb-5" data-route="cookies">
      <div className="legal-page mx-auto py-4 px-3">
        <h3>Cookie Notice</h3>
        <p className="text-muted small">Last updated: 19 October 2026</p>

        <p>
          This site does not use tracking or advertising cookies, so there is no cookie banner to
          accept.
        </p>

        <h5 className="mt-4">Analytics</h5>
        <p>
          Visits are counted with GoatCounter, which works without cookies and does not follow you
          across websites or identify you personally.
        </p>

        <h5 className="mt-4">Local storage</h5>
        <p>
          The site may save your light or dark theme choice in your browser's local storage so it
          is remembered next time. This stays on your device, is not sent to me, and does not
          track you. You can clear it at any time in your browser settings.
        </p>

        <h5 className="mt-4">Third parties</h5>
        <p>
          The contact form is processed by Web3Forms. If that service sets any cookies of its own,
          they are covered by its policy rather than this one.
        </p>

        <h5 className="mt-4">Managing cookies and storage</h5>
        <p>
          You can block or delete cookies and stored site data in your browser settings. The site
          works normally either way, apart from not remembering your theme.
        </p>
      </div>
    </section>
  );
}