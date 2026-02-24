import { CheckCircle2 } from "lucide-react";

const assetImages = [
  "https://ijmb.ng/wp-content/uploads/2023/03/group-five-african-college-students-spending-time-together-campus-university-yard-black-afro-friends-studying-education-theme-1024x681.jpg",
  "https://ijmb.ng/wp-content/uploads/2020/12/iStock-1176677792.jpg",
  "https://ijmb.ng/wp-content/uploads/2020/12/iStock-1210745478.jpg",
  "https://ijmb.ng/wp-content/uploads/2024/03/2149156387-1024x682.jpg",
  "https://ijmb.ng/wp-content/uploads/2023/03/young-student-learning-library-1.jpg",
  "https://ijmb.ng/wp-content/uploads/2023/08/lp2.pdf.png",
];

const requirements = [
  "Minimum of five O'Level credits in relevant subjects.",
  "Accepts WAEC, NECO, or NABTEB results.",
  "Awaiting result candidates can apply and update later.",
  "Subject combination must align with intended university course.",
];

const reasons = [
  "IJMB is accepted by over 95% of Nigerian universities.",
  "No JAMB/UTME pressure after successful completion.",
  "Direct Entry into 200 level in many institutions.",
  "Certificate does not expire like UTME score.",
  "Affordable compared to first-year private university fees.",
  "High admission success rate compared to UTME route.",
  "Structured nine-month learning with experienced tutors.",
  "Available study centres across Nigeria.",
  "Flexible for full-time and part-time learners.",
];

const news = [
  "IJMB Form 2026/27 is Now On Sale – Register Today!",
  "Where to Buy IJMB Textbooks in Nigeria: Complete Guide",
  "IJMB Results 2025 – Official Notice to All Candidates and Parents",
];

const Home = () => {
  return (
    <div className="bg-white text-slate-800">
      <section className="hero-overlay relative overflow-hidden px-4 py-16 text-white sm:py-20 md:py-24">
        <img src={assetImages[0]} alt="IJMB students" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950/90 via-emerald-800/85 to-emerald-700/80" />
        <div className="container mx-auto text-center">
          <h1 className="animate-fade-up text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl">Register For IJMB 2026/27</h1>
          <p className="animate-fade-up mx-auto mt-4 max-w-3xl text-lg font-medium sm:text-xl md:mt-5 md:text-2xl [animation-delay:120ms]">
            Gain Admission into 200L Without UTME. Study your desired course.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 animate-fade-up sm:mt-8 sm:flex-row sm:gap-4 [animation-delay:240ms]">
            <button className="animate-float rounded-md bg-white px-6 py-3 font-bold text-emerald-900 transition hover:bg-emerald-50">Register Now</button>
            <button className="rounded-md border border-white px-6 py-3 font-bold transition hover:bg-white/10">Learn More</button>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-12 sm:py-14 md:grid-cols-3 md:gap-8 md:py-16">
        {[
          ["01", "Register", "Fill the official IJMB registration form online and select your study centre."],
          ["02", "Pay For Form", "Complete your payment of ₦8,750 to validate your registration and secure a slot."],
          ["03", "Resume Studies", "Print your documents and resume lectures at your chosen IJMB study centre."],
        ].map(([number, title, text]) => (
          <div key={title} className="ijmb-card animate-fade-up p-5 sm:p-6">
            <p className="text-3xl font-extrabold text-emerald-800">{number}</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">{title}</h3>
            <p className="mt-3 text-sm text-slate-600">{text}</p>
          </div>
        ))}
      </section>

      <section className="container mx-auto grid gap-4 px-4 pb-12 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 md:pb-16">
        {assetImages.slice(1, 4).map((image) => (
          <img key={image} src={image} alt="IJMB campus" className="h-48 w-full rounded-xl object-cover shadow-md transition hover:scale-[1.02] sm:h-52 md:h-56" />
        ))}
      </section>

      <section className="bg-slate-50 py-12 sm:py-14 md:py-16">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 md:gap-10">
          <div className="animate-fade-up">
            <h2 className="text-2xl font-extrabold text-emerald-900 sm:text-3xl">WHAT IS IJMB?</h2>
            <p className="mt-5 leading-7 text-slate-700">
              IJMB (Interim Joint Matriculation Board) is a nine-month Advanced Level programme moderated by Ahmadu Bello University (ABU Zaria). It allows students gain Direct Entry admission into 200 level in participating universities in Nigeria.
            </p>
            <p className="mt-4 leading-7 text-slate-700">
              The programme is officially recognized by NUC and is one of the most trusted alternatives to UTME for candidates seeking a higher chance of admission.
            </p>
          </div>
          <div className="animate-fade-up rounded-2xl bg-white p-6 shadow-md sm:p-8 [animation-delay:120ms]">
            <h3 className="text-xl font-extrabold text-emerald-900 sm:text-2xl">No UTME? No Worries!</h3>
            <p className="mt-4 text-slate-700">Gain admission without stress and avoid yearly UTME uncertainty.</p>
            <ul className="mt-6 space-y-3">
              {requirements.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 sm:py-14 md:py-16">
        <h2 className="text-center text-2xl font-extrabold text-emerald-900 sm:text-3xl">9 Reasons Why You Should Enroll For IJMB</h2>
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
          {reasons.map((reason) => (
            <div key={reason} className="ijmb-card py-4">{reason}</div>
          ))}
        </div>
      </section>

      <section className="py-12 text-white sm:py-14 md:py-16" style={{ background: "linear-gradient(90deg, #064e3b 0%, #047857 100%)" }}>
        <div className="container mx-auto grid gap-4 px-4 sm:gap-5 md:grid-cols-3 md:gap-6">
          {[
            ["15,000+", "Candidates apply yearly."],
            ["12,000+", "Candidates gain admission yearly."],
            ["95%", "Universities accept IJMB for Direct Entry."],
          ].map(([value, label]) => (
            <div key={value} className="rounded-xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur-sm sm:p-6">
              <p className="text-3xl font-extrabold sm:text-4xl">{value}</p>
              <p className="mt-3 text-sm text-emerald-50">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 sm:py-14 md:py-16">
        <h2 className="text-2xl font-extrabold text-emerald-900 sm:text-3xl">IJMB Tuition & Fees</h2>
        <p className="mt-4 max-w-4xl leading-7 text-slate-700">
          IJMB tuition varies by study centre and usually ranges from ₦190,000 to ₦300,000, covering lectures, course materials, and related training costs. Registration form fee is ₦8,750.
        </p>
        <button className="mt-6 rounded-md bg-emerald-700 px-6 py-3 font-bold text-white transition hover:bg-emerald-800">See Detailed Fees</button>
      </section>

      <section className="bg-slate-50 py-12 sm:py-14 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-extrabold text-emerald-900 sm:text-3xl">News & Events</h2>
          <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3">
            {news.map((item, i) => (
              <article key={item} className="ijmb-card">
                <img src={assetImages[(i + 3) % assetImages.length]} alt={item} className="mb-4 h-40 w-full rounded-lg object-cover" />
                <h3 className="text-lg font-bold text-slate-900">{item}</h3>
                <p className="mt-3 text-sm text-slate-600">Read the full update and get official admission information.</p>
                <button className="mt-4 text-sm font-bold text-emerald-700">Discover More</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="container mx-auto px-4 py-12 sm:py-14 md:py-16">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-800 to-green-700 p-6 text-center text-white shadow-xl sm:p-8 md:p-10">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Are you Working?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-emerald-50">
            The IJMB programme offers flexibility to fit your schedule. Study full-time or part-time and still progress toward Direct Entry admission.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <button className="rounded-md bg-white px-6 py-3 font-bold text-emerald-900">Get Started</button>
            <button className="rounded-md border border-white px-6 py-3 font-bold">Frequently Asked Questions</button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 sm:pb-20">
        <h3 className="mb-6 text-center text-xl font-extrabold text-emerald-900 sm:text-2xl">Referenced IJMB Assets Used</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assetImages.map((image) => (
            <img key={image} src={image} alt="Referenced IJMB asset" className="h-44 w-full rounded-lg object-cover shadow sm:h-48" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
