import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Private Consultation — Begin The Conversation",
  description:
    "Request acquisition, schedule a private consultation, or speak with a SROJA design advisor. Collectible handcrafted design deserves correspondence, not checkout.",
};

const EXPECT = [
  {
    step: "Within one working day",
    text: "An advisor replies personally.",
  },
  {
    step: "The conversation",
    text: "Rooms, light, editions — by email, call, or visit.",
  },
  {
    step: "The acquisition",
    text: "Reserved, certified, delivered insured.",
  },
] as const;

export default function ConsultationPage() {
  return (
    <>
      <section className="relative bg-ivory-bright pb-20 pt-44 md:pb-28 md:pt-56">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">Private Consultation</p>
            <h1 className="display mt-6 max-w-5xl text-6xl leading-[0.98] text-charcoal md:text-[7rem]">
              No cart.
              <span className="italic text-stone-dark"> A conversation.</span>
            </h1>
            <p className="lede mt-10 max-w-2xl text-lg text-stone-dark md:text-xl">
              Prefer to talk before you buy? Tell us about the room — an advisor
              does the rest.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ivory-mute bg-ivory py-24 md:py-32">
        <div className="mx-auto grid max-w-[1700px] gap-16 px-6 lg:grid-cols-12 lg:px-12">
          {/* What to expect */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-brass">What To Expect</p>
              <ol className="mt-8 space-y-10">
                {EXPECT.map((e, i) => (
                  <li key={e.step} className="border-l border-brass/40 pl-6">
                    <p className="display text-3xl text-brass/60">0{i + 1}</p>
                    <p className="display mt-2 text-2xl text-charcoal">{e.step}</p>
                    <p className="mt-3 text-sm leading-relaxed text-stone-dark">{e.text}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-14 border-t border-ivory-mute pt-8 text-sm leading-relaxed text-stone-dark">
                <p className="eyebrow mb-4 text-brass">The Maison</p>
                <p>
                  <a href={`mailto:${SITE.email}`} className="link-line text-charcoal">
                    {SITE.email}
                  </a>
                </p>
                <address className="mt-3 not-italic">
                  {SITE.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <p className="mt-3">Visits by appointment.</p>
              </div>
            </Reveal>
          </div>

          {/* The form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1}>
              <InquiryForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
