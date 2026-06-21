import Header from "../components/Header";

export const AboutPage = () => {
  return (
    <main>
      <Header />
      <section className="w-10/12 mx-auto mt-20 text-base-content">
        <h1
          className="text-center text-4xl md:text-6xl font-bold"
          data-testId="header-message"
        >
          We love{" "}
          <span className="bg-primary text-gray-300 rounded-2xl py-4 px-8 md:text-3xl">
            SHS
          </span>
        </h1>
        <p className="mt-10 max-w-2xl mx-auto leading-loose text-lg">
          At SHS, we are passionate about creating a cozy and inviting
          shopping experience for our customers. Our mission is to provide a
          wide range of high-quality sneakers that bring comfort and joy to your
          everyday life. Whether you're looking for stylish sneakers,
          or unique gifts, we've got you covered. We believe that
          shopping should be a delightful experience, and we strive to make
          every visit to SHS a memorable one. Thank you for being a part of
          our community!
        </p>
      </section>
    </main>
  );
};
