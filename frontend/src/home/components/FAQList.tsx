import FAQItem from "./FAQItem";

const FAQList = () => {
  return (
    <section className="my-24 flex flex-col items-center">
      <h2 className="mb-8 text-start font-[roboto] text-[40px]">Preguntas frecuentes</h2>
      <FAQItem />
    </section>
  );
};

export default FAQList;
