export const Loading = () => {
  return (
    <section className="bg-base-300 h-[86vh] flex flex-col items-center justify-center">
      <div className="w-30 h-30 bg-base-content rounded-full animate-pulse absolute"></div>
      <div className="w-10 h-10 bg-base-100 rounded-full animate-ping absolute"></div>
      <div className="w-20 h-20 bg-accent rounded-full animate-ping absolute"></div>
    </section>
  );
};
