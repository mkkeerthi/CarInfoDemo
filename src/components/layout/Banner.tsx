interface BannerProps {
  title: string;
  subtitle: string;
}

export default function Banner({ title, subtitle }: BannerProps) {
  return (
    <section id="banner" className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-r from-emerald-900/40 to-neutral-900 p-8 md:p-12">
      <div className="relative z-10 max-w-2xl">
        <h1 id="banner-title" className="text-3xl font-bold text-white md:text-4xl">
          {title}
        </h1>
        <p id="banner-subtitle" className="mt-3 text-lg text-neutral-300">
          {subtitle}
        </p>
      </div>
      <i className="fa-solid fa-car-side absolute -right-6 -top-6 text-8xl text-emerald-500/10" aria-hidden="true" />
    </section>
  );
}
