import FAQItem from "../FAQItem";

const FAQList = () => {
  return (
    <section className="mb-24 flex w-full flex-col items-center px-2.5 text-[#19233A] lg:p-0">
      <h2 className="mb-8 w-full text-center text-5xl font-medium lg:mb-36">
        Preguntas frecuentes
      </h2>
      <FAQItem />
    </section>
  );
};

export default FAQList;
