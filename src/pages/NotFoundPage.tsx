import Header from "../components/Header";
import NotFoundImage from "../assets/images/not-found-image.jpeg";

const NotFoundPage = () => {
  return (
    <main>
      <Header />
      <section className="flex flex-col items-center justify-center h-screen">
        <img
          src={NotFoundImage}
          alt="Not Found"
          className="mt-6 w-full max-w-md"
        />
      </section>
    </main>
  );
};
export default NotFoundPage;
