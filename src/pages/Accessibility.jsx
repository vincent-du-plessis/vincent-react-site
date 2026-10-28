export default function Accessibility() {
  return (
    <section className="container mb-5" data-route="accessibility">
      <div className="legal-page mx-auto py-4 px-3">
        <h3>Accessibility Statement</h3>
        <p className="text-muted small">Last updated: 19 October 2026</p>

        <p>
          I want this website to be usable by as many people as possible, including people who use
          assistive technology. I aim to follow the Web Content Accessibility Guidelines (WCAG) 2.1
          at level AA.
        </p>

        <h5 className="mt-4">What I do</h5>
        <ul>
          <li>Use semantic HTML and labelled form fields so screen readers can navigate the site.</li>
          <li>Provide text labels for icon links, such as GitHub, LinkedIn, WhatsApp and email.</li>
          <li>Support keyboard navigation, with visible focus on links and buttons.</li>
          <li>Offer light and dark themes, and a layout that adapts to phones, tablets and desktops.</li>
          <li>Offer my CV as a downloadable PDF as well as an embedded view.</li>
        </ul>

        <h5 className="mt-4">Known limitations</h5>
        <ul>
          <li>
            The animated background on the welcome page is decorative. It may be distracting to
            some people, and it can't be hidden if your device is set to reduce motion. I apologize
            for any inconvenience.
          </li>
          <li>
            The embedded CV viewer depends on your browser's PDF support. If it does not work for
            you, use the download link.
          </li>
          <li>
            I am not able to guarantee that every page meets every requirement, and some content
            may not yet be fully accessible.
          </li>
        </ul>

        <h5 className="mt-4">Feedback</h5>
        <p>
          If you find something on this site hard to use, or need information in a different
          format, please email <a href="mailto:vinduples@gmail.com">vinduples@gmail.com</a>. Tell
          me which page and what the problem was, and I will do my best to fix it.
        </p>
      </div>
    </section>
  );
}