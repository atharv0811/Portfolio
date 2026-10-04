import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Hero } from "@/components/hero/hero";
import { Process } from "@/components/process/process";
import { SelectedWork } from "@/components/projects/selected-work";
import { Services } from "@/components/services/services";
import { ExpertiseStrip } from "@/components/skills/expertise-strip";
import { TechnicalExpertise } from "@/components/skills/technical-expertise";
import { Testimonials } from "@/components/testimonials/testimonials";
import { JsonLd } from "@/components/ui/json-ld";
import { Values } from "@/components/values/values";
import { personSchema, websiteSchema } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema()]} />
      <Hero />
      <ExpertiseStrip />
      <SelectedWork />
      <Services />
      <TechnicalExpertise />
      <About />
      <Process />
      <Values />
      <Testimonials />
      <Contact />
    </>
  );
}
