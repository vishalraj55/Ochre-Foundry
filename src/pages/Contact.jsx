import { useState } from "react";
import { ArrowUpRight, Radio, MapPin, Clock } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

const tierOptions = ["Outpost Pod", "Settlement Block", "Colony Grid", "Not sure yet"];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    org: "",
    coordinates: "",
    tier: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter a name so we know who to relay back to.";
    if (!form.org.trim()) next.org = "Which crew or organization is this for?";
    if (!form.message.trim()) next.message = "Give us a line on what you need.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <>
      <section className="container-px pt-16 pb-24 grid lg:grid-cols-[1fr_1.1fr] gap-16">
        <div>
          <Reveal>
            <p className="eyebrow mb-3">Contact</p>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-titanium-300">
              Send us your coordinates.
            </h1>
            <p className="mt-5 text-titanium-500 leading-relaxed max-w-md">
              Earth-Mars signal lag applies to every channel below — expect a first
              response within one Earth week, faster if you're already on-site
              relay.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <Radio size={18} className="mt-1 text-rust-400 shrink-0" />
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-titanium-500">Relay</p>
                <p className="text-titanium-300">relay@ochrefoundry.mars — channel OF-9</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={18} className="mt-1 text-rust-400 shrink-0" />
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-titanium-500">Print sites</p>
                <p className="text-titanium-300">Elysium Planitia · Hellas Basin · Arcadia Planitia</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={18} className="mt-1 text-rust-400 shrink-0" />
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-titanium-500">Response window</p>
                <p className="text-titanium-300">Within 1 Earth week, most requests</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          {submitted ? (
            <div className="card p-10 text-center">
              <p className="eyebrow mb-3 justify-center">Relay sent</p>
              <h2 className="font-display text-2xl text-titanium-300">
                Your message is queued on channel OF-9.
              </h2>
              <p className="mt-4 text-titanium-500 leading-relaxed">
                We'll respond to {form.name.split(" ")[0] || "you"} at the contact
                you'd normally use for {form.org || "your organization"} within one
                Earth week.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="card p-8 space-y-6">
              <div>
                <label htmlFor="name" className="font-mono text-xs uppercase tracking-wide text-titanium-500">
                  Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={update("name")}
                  className="mt-2 w-full rounded-sm border border-basalt-600 bg-basalt-950 px-4 py-3 text-titanium-300 outline-none focus-visible:border-printline-400"
                  placeholder="Anaya Fitch"
                />
                {errors.name && <p className="mt-2 text-xs text-rust-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="org" className="font-mono text-xs uppercase tracking-wide text-titanium-500">
                  Organization
                </label>
                <input
                  id="org"
                  value={form.org}
                  onChange={update("org")}
                  className="mt-2 w-full rounded-sm border border-basalt-600 bg-basalt-950 px-4 py-3 text-titanium-300 outline-none focus-visible:border-printline-400"
                  placeholder="Hellas Research Station"
                />
                {errors.org && <p className="mt-2 text-xs text-rust-400">{errors.org}</p>}
              </div>

              <div>
                <label htmlFor="coordinates" className="font-mono text-xs uppercase tracking-wide text-titanium-500">
                  Site coordinates <span className="text-titanium-500 normal-case">(optional)</span>
                </label>
                <input
                  id="coordinates"
                  value={form.coordinates}
                  onChange={update("coordinates")}
                  className="mt-2 w-full rounded-sm border border-basalt-600 bg-basalt-950 px-4 py-3 text-titanium-300 outline-none focus-visible:border-printline-400"
                  placeholder="24.6°N 87.9°E"
                />
              </div>

              <div>
                <label htmlFor="tier" className="font-mono text-xs uppercase tracking-wide text-titanium-500">
                  Interested in
                </label>
                <select
                  id="tier"
                  value={form.tier}
                  onChange={update("tier")}
                  className="mt-2 w-full rounded-sm border border-basalt-600 bg-basalt-950 px-4 py-3 text-titanium-300 outline-none focus-visible:border-printline-400"
                >
                  <option value="">Select a tier</option>
                  {tierOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-wide text-titanium-500">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  className="mt-2 w-full rounded-sm border border-basalt-600 bg-basalt-950 px-4 py-3 text-titanium-300 outline-none focus-visible:border-printline-400"
                  placeholder="Crew size, timeline, anything you already know about the site."
                />
                {errors.message && <p className="mt-2 text-xs text-rust-400">{errors.message}</p>}
              </div>

              <button type="submit" className="btn-primary w-full justify-center">
                Send relay <ArrowUpRight size={16} />
              </button>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}
