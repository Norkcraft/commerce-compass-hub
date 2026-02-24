import { Link, useLocation } from "react-router-dom";
import { ijmbRoutes } from "@/data/ijmbRoutes";

const IjmbInfoPage = () => {
  const { pathname } = useLocation();
  const page = ijmbRoutes.find((item) => item.path === pathname);

  if (!page) {
    return null;
  }

  return (
    <div className="bg-white px-4 py-14 sm:py-16">
      <div className="container mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">IJMB Route</p>
        <h1 className="mt-3 text-3xl font-extrabold text-emerald-900 sm:text-4xl">{page.title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">{page.description}</p>

        <div className="mt-8 rounded-xl border border-emerald-100 bg-emerald-50/40 p-6">
          <h2 className="text-lg font-bold text-emerald-900">Highlights</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {page.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/ijmb-registration-2026-27" className="rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800">
            Register Now
          </Link>
          <Link to="/contact-us" className="rounded-md border border-emerald-700 px-5 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-50">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IjmbInfoPage;
