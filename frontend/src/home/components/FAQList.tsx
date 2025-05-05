import FAQItem from "./FAQItem";

const FAQList = () => {
  return (
    <section className="justyfi-center ms-52 mt-24 flex max-w-[1920px] flex-col items-center">
      <h2 className="mb-8 text-start font-[roboto] text-[40px]">Preguntas frecuentes</h2>
      <FAQItem />
    </section>
  );
};

export default FAQList;
