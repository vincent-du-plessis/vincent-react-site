import { Link } from 'react-router-dom'

const IMG = import.meta.env.BASE_URL + 'images/'

export default function Blog() {
  return (
    <section className="container mb-5 pt-5 mt-3">
      <h3 className="display-4 fw-bold my-4"><span className="capital-red">B</span>log</h3>

      <div className="clearfix">
        <img
          src={IMG + 'christopher-gower-m_HRfLhgABo-unsplash.jpg'}
          alt="A modern laptop on a desk in front of a large monitor, with a cup of coffee and a smartphone beside it"
          className="img-fluid rounded-4 float-md-end ms-md-4 mb-3"
          style={{ maxWidth: '320px' }}
          width="320"
          height="240"
          decoding="async"
          loading="lazy"
        />

        <h4>My Origin Story</h4>

        <p>
          At the start of the 2019 pandemic, I was introduced to web development. I learned the fundamentals: HTML, CSS and JavaScript. Early on, I also taught myself to touch type, and I now average 56 words per minute. That makes software development easier to learn and helps keep burnout away.
        </p>

        <p>
          I came across quite a few technologies in the build-up to where I am now. Open source and the freedom to learn on the web make the barrier to entry small for anyone who wants awesome skills. I started small. I found a PC in my parents' garage and turned it on, and it greeted me with a BIOS message: "Missing boot device." I found an HDD that connects with a PATA cable and plugged it in. After some trouble with the jumper settings on the drive, I somehow got Windows XP running.
        </p>

        <p>
          Like most achievements in life, this wasn't possible without help from others. A friend got Windows 10 up and running on my machine and online. Most importantly, he improved my YouTube algorithm by sending me upwards of 50 links to web development tutorials.
        </p>

        <p>
          Armed with a Gen 2 PC and a whole lot of tutorials, I weathered the storm of mundane HTML, interesting CSS and exhilarating JavaScript. Not long after, I installed Linux on one of my drives and my open-source fandom began. I studied long and hard, with absolute mavericks of software engineering to look up to and guide me on my journey online.
        </p>

        <p>
          I could call myself a web developer with confidence the day I made a single page for an online newspaper company. I mirrored their whole site's HTML and CSS by hand and improved a little of it along the way.
        </p>

        <p>
          As for my future, it might come at a fork. A few software engineers I look up to are pulling me in different directions, and I'm wondering whether my second programming language should be C++ or C#. I'm in no rush to decide. Vars are vars, loops are loops and OOP is OOP. I know I'd be happy with either, and I'll probably circle back to the other.
        </p>

        <p>
          Enough about me. :) If you're looking for a web developer, please <Link to="/contact">contact me</Link>. I'd be glad to make your acquaintance. Thanks for reading, and have a stellar day!
        </p>
      </div>
    </section>
  )
}