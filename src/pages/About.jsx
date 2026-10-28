import { Link } from 'react-router-dom'

const IMG = import.meta.env.BASE_URL + 'images/'

export default function About() {
  return (
    <section className="container mb-5 pt-5 mt-3">
      <h3 className="display-4 fw-bold my-4"><span className="capital-red">A</span>bout</h3>

      <div className="clearfix mb-4">
        <img
          src={IMG + 'ilya-pavlov-OqtafYT5kTw-unsplash.jpg'}
          alt="Close-up of HTML code on a computer screen"
          className="img-fluid rounded-4 float-md-end me-md-4 mb-3"
          style={{ maxWidth: '200px' }}
          decoding="async"
          loading="lazy"
        />

        <h4>Hi, I'm Vincent, a Web Developer from South Africa.</h4>
        <p className="lead mb-4">
          I program a lot of front-end code on the web and am fluent in
          JavaScript, HTML and CSS.
          According to the creator of C++, <i>Bjarne Stroustrup</i>, every programmer
          should know at least three programming languages. I enjoy coding in Python and PHP
          as well. I like bare-bones code that gets the job done. I stick to textbook solutions,
          aiming for fast, clean, efficient code, but I do get my hands dirty with bloated
          spaghetti code.
          If you need help with something web-related or have a job offer, let me know <Link to="/contact">here</Link>.
        </p>
      </div>
    </section>
  )
}