import FAQItem from "../FAQItem";

const FAQList = () => {
  return (
    <section
      id="preguntas-frecuentes"
      className="px-sections text-ecos-blue mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-6 py-14 md:space-y-8 md:py-20"
    >
      <h2 className="subtitles text-start uppercase md:text-center">Preguntas frecuentes</h2>
      <FAQItem />
    </section>
  );
};

export default FAQList;
