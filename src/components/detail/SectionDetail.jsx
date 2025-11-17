const SectionDetail = ({ title, children }) => {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-zinc-900 mb-3">
        {title}
      </h2>
      <div className="text-[15px] leading-7 text-zinc-700">
        {children}
      </div>
    </section>
  );
};

export default SectionDetail;
