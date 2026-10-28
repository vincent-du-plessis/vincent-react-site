const CV_FILE = import.meta.env.BASE_URL +
  'public/Vincent%20du%20Plessis%E2%80%99s%20Curriculum%20Vitae%20%282%29.pdf'

export default function CurriculumVitae() {
  return (
    <section className="container pt-3 overflow-auto h-100 mb-5">
      <div>
        <h3>Curriculum Vitae</h3>
        <iframe
          className="cv-frame"
          loading="lazy"
          src={CV_FILE + '#view=FitH'}
          title="Curriculum Vitae"
        />
        <p className="mt-2">
          <a href={CV_FILE} download>Download my CV (PDF)</a>
        </p>
      </div>
    </section>
  )
}