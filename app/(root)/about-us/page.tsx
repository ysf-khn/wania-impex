import { Mountain, Globe, Users, Heart, Sparkles } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="bg-stone-50">
      {/* Heritage Hero */}
      <section className="min-h-[70vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-stone-900/40 z-10" />
        <Image
          src="/aboutUs/aboutus3.jpg"
          alt="Artisan workshop"
          fill
          className="object-cover object-top"
        />
        <div className="relative z-20 container mx-auto px-4 md:px-8 h-full flex items-center">
          <div className="max-w-2xl bg-stone-100/90 backdrop-blur-sm p-8 mt-32 rounded-xl">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-stone-800">
              Where Metal Whispers Ancient Secrets
            </h1>
            <p className="text-lg text-stone-600 font-body mb-8">
              Wania Impex: Where Moradabad&apos;s metalcraft legacy meets
              bohemian soul. For three generations, we&apos;ve transformed
              sacred traditions into mystical artifacts that whisper to new age
              sanctuaries across the globe.
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-heading font-bold text-stone-800">
                  Iqbal & Hammad
                </p>
                <p className="text-sm text-stone-600">
                  Custodians of Moradabad&apos;s Metal Soul
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soulful Craft Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Sparkles className="w-12 h-12 mx-auto text-amber-600 mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              More Than Manufacturers - We&apos;re Memory Weavers
            </h2>
            <p className="text-stone-600 font-body text-lg">
              Every piece that leaves our workshop carries three generations of
              whispered prayers into homes across multiple countries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="/aboutUs/aboutus2.jpg"
                  alt="Artisan hands at work"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 p-4">
                  <p className="text-stone-100 font-body italic">
                    &quot;Our hammers dance to the rhythm of ancestral
                    wisdom&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-6 bg-amber-50/50 rounded-xl border border-stone-200">
                <h3 className="font-heading text-xl font-bold mb-4 text-stone-800">
                  The Wania Impex Promise
                </h3>
                <div className="space-y-4">
                  <p className="text-stone-600 font-body">
                    <Heart className="inline mr-2 w-5 h-5 text-amber-600" />
                    Every curve shaped by father-son collaboration
                  </p>
                  <p className="text-stone-600 font-body">
                    <Users className="inline mr-2 w-5 h-5 text-amber-600" />
                    Our family workforce is driven by empowered female artisans
                  </p>
                  <p className="text-stone-600 font-body">
                    <Globe className="inline mr-2 w-5 h-5 text-amber-600" />
                    Geometry meets global aesthetics
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-amber-500 pl-4">
                <blockquote className="text-stone-600 italic font-body">
                  &quot;When you hold our copper pyramid, you&apos;re touching
                  the same craftsmanship that adorned Mughal palaces. When our
                  incense burner graces your altar, know it carries
                  Moradabad&apos;s soul.&quot;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div>
                    <p className="font-heading font-bold">M. Iqbal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders&apos; Testament */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Founder&apos;s Portrait */}
            <div className="w-full md:w-1/2 relative h-[600px] rounded-2xl overflow-hidden border-4 border-amber-500/20 shadow-xl">
              <Image
                src="/aboutUs/iqbal.jpg"
                alt="M. Iqbal"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Personal Message */}
            <div className="w-full md:w-1/2 space-y-8">
              <div className="border-l-4 border-amber-500 pl-4">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                  A Father-Son Covenant in Metal
                </h2>
                <blockquote className="text-stone-600 font-body text-lg italic">
                  &quot;When we first struck brass in 2008, we made a promise -
                  to let every piece tell our city&apos;s story. Today, Wania
                  Impex isn&apos;t just our workshop, it&apos;s a bridge
                  connecting Moradabad&apos;s heritage to the world&apos;s
                  spiritual seekers.&quot;
                </blockquote>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-stone-800">
                      M. Iqbal
                    </h3>
                    <p className="text-amber-600 font-body mb-4">
                      Co-founder & Guiding Force
                    </p>
                    <p className="text-stone-600">
                      &quot;True craftsmanship isn&apos;t just skill, it&apos;s
                      preserving the soul of our city while embracing evolution.
                      Our diverse workforce isn&apos;t just a statistic,
                      it&apos;s Moradabad&apos;s sons & daughters continuing
                      legacy through fresh eyes.&quot;
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-stone-800">
                      Hammad Danish
                    </h3>
                    <p className="text-amber-600 font-body mb-4">
                      Co-founder & Creative Visionary
                    </p>
                    <p className="text-stone-600">
                      &quot;My father taught me metal speaks truth. My
                      contribution? Ensuring its voice resonates with
                      today&apos;s spiritual needs, be it through crystal grids
                      or altar tools that blend ancient geometry with
                      contemporary design.&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-amber-50 rounded-xl">
                <p className="font-body text-stone-600">
                  We invite you to our workshop - smell the molten metal, hear
                  the chisels sing, and see how ordinary brass transforms into
                  vessels of sacred energy. This isn&apos;t just our story,
                  it&apos;s yours too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Empowerment */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-heading">
                Guardians of Moradabad&apos;s Beating Heart
              </h2>
              <p className="text-stone-600 font-body">
                Our workshop hums with multiple stories - mothers who craft
                magic while their children sleep, grandfathers teaching ancient
                patina techniques, daughters reinventing temple designs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl">
                  <p className="font-heading text-2xl text-amber-600">
                    Multiple
                  </p>
                  <p className="text-stone-600 text-sm">Families Sustained</p>
                </div>
                <div className="p-4 bg-white rounded-xl">
                  <p className="font-heading text-2xl text-amber-600">15+</p>
                  <p className="text-stone-600 text-sm">
                    Heritage Techniques Preserved
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/aboutUs/aboutus7.jpg"
                alt="Artisans at work"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Process Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Where Magic Takes Form
            </h2>
            <p className="text-stone-600 font-body max-w-xl mx-auto">
              Witness the transformation of raw metal into sacred objects
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                src: "/aboutUs/aboutus1.jpg",
                alt: "Metal casting process",
                caption: "Crafting Innovations in Every Corner",
              },
              {
                src: "/aboutUs/aboutus4.jpg",
                alt: "Engraving details",
                caption: "Whispering Stories into Materials",
              },
              {
                src: "/aboutUs/aboutus5.jpg",
                alt: "Patina application",
                caption: "Breathing Life into Surfaces",
              },
              {
                src: "/aboutUs/aboutus6.jpg",
                alt: "Quality inspection",
                caption: "Consecrating Each Piece",
              },
            ].map((image, index) => (
              <div
                key={index}
                className="relative group h-64 md:h-80 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex items-end p-4">
                  <p className="text-stone-100 font-body italic text-sm md:text-base">
                    {image.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder&apos;s Promise */}
      <section className="py-16 bg-stone-900 text-stone-100">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Mountain className="w-12 h-12 mx-auto text-amber-400 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">
              The Pillars of Our Craft
            </h2>
            <p className="text-stone-300 font-body text-lg mb-12">
              Foundations that distinguish every creation
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Sparkles,
                  title: "Timeless Artistry",
                  text: "Where ancestral techniques meet modern spiritual needs",
                },
                {
                  icon: Globe,
                  title: "Global Consciousness",
                  text: "Serving sacred spaces across multiple nations",
                },
                {
                  icon: Users,
                  title: "Collective Wisdom",
                  text: "Generations of artisans shaping each piece",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 bg-stone-800/30 rounded-xl hover:bg-stone-800/50 transition-colors"
                >
                  <item.icon className="w-8 h-8 mx-auto text-amber-400 mb-4" />
                  <h3 className="font-heading text-xl mb-2">{item.title}</h3>
                  <p className="text-stone-300 font-body text-sm">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
