export default function Credits() {
  return (
    <section data-route="credits">
      <div className="legal-page mx-auto py-4 px-3">
        <h3>Credits</h3>
        <p className="text-muted small">
          Thanks to the people whose work helped build this site.
        </p>

        <h5 className="mt-4">Icons</h5>
        <ul>
          <li>
            <a
              href="https://www.flaticon.com/free-icons/mouse-clicker"
              title="mouse clicker icons"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mouse clicker icons created by Upnow Graphic - Flaticon
            </a>
          </li>
        </ul>

        <h5 className="mt-4">Photos</h5>
        <ul>
          <li>
            Photo by Ilya Pavlov on{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
          </li>
          <li>
            Photo by Christopher Gower on{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
          </li>
        </ul>

        <h5 className="mt-4">Built with</h5>
        <ul>
          <li>
            <a href="https://getbootstrap.com" target="_blank" rel="noopener noreferrer">
              Bootstrap
            </a>{" "}
            and Bootstrap Icons
          </li>
          <li>
            <a href="https://www.vantajs.com" target="_blank" rel="noopener noreferrer">
              Vanta.js
            </a>{" "}
            and{" "}
            <a href="https://threejs.org" target="_blank" rel="noopener noreferrer">
              three.js
            </a>{" "}
            for the animated background
          </li>
          <li>
            <a href="https://brm.io/matter-js/" target="_blank" rel="noopener noreferrer">
              Matter.js
            </a>{" "}
            for the game physics
          </li>
          <li>
            <a href="https://www.goatcounter.com" target="_blank" rel="noopener noreferrer">
              GoatCounter
            </a>{" "}
            for analytics and{" "}
            <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer">
              Web3Forms
            </a>{" "}
            for the contact form
          </li>
        </ul>
      </div>
    </section>
  );
}