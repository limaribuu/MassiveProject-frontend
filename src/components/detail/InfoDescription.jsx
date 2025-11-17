import InfoSidebar from "./InfoSidebar";

const InfoDescription = ({ text, sidebarData }) => {
  return (
    <section className="mt-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6 text-[15px] leading-7 text-zinc-700 text-justify">
          <p className="whitespace-pre-line">{text}</p>
        </div>

        <div className="lg:w-1/3 lg:flex lg:justify-end">
          <InfoSidebar data={sidebarData} />
        </div>
      </div>
    </section>
  );
};

export default InfoDescription;
