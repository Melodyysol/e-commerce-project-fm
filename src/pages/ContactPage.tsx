import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import DeveloperImage from "../assets/images/developerImage.png";
import Header from "../components/Header";

export const ContactPage = () => {
  return (
    <main>
      <Header />
      {/* Developer Section */}
      <section className="w-full mb-20 100 py-20">
        <div className="w-10/12 mx-auto text-base-content">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-10">
            Meet the Developer
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-10 justify-center">
            <img
              src={DeveloperImage}
              alt="Developer"
              className="w-48 h-48 rounded-full object-cover"
              data-testId="developer-image"
            />
            <div>
              <h3 className="text-2xl font-semibold">Abdulwaris Atere</h3>
              <p className="mt-4 max-w-md leading-loose text-lg">
                Abdulwaris Atere is a passionate web developer with a love for
                creating intuitive and user-friendly applications. With a
                background in both frontend and backend development, Abdulwaris
                enjoys working on projects that challenge his skills and allow
                him to learn new technologies. When he's not coding, Abdulwaris
                loves hiking, cooking, and spending time with his family.
              </p>
            </div>
          </div>
        </div>
        {/* Contact Section */}
        <div className="w-10/12 mx-auto my-10 text-base-content">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-10">
            Get in Touch
          </h2>
          <p className="text-center text-lg mb-6">
            Have questions or want to say hello? Feel free to reach out!
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:issaabdulwaris212@gmail.com"
              className="btn btn-primary"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 text-base-content py-10 animate-pulse">
        <div className="w-10/12 mx-auto text-center mb-4">
          <h2 className="text-2xl font-bold">SHS</h2>
          <p className="mt-2">Your SHS online store for all things comfy.</p>
        </div>
        <div className="w-10/12 mx-auto text-center mb-4">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p className="mt-2">Email: issaabdulwaris212@gmail.com</p>
          <p className="mt-1">Phone: +234 80 3825 7481</p>
          <div className="mt-1 flex justify-center gap-6 items-center">
            Socials:{" "}
            <a
              target="_blank"
              href="https://instagram.com/issaabdulwaris212/"
              className="link link-primary"
            >
              <FaInstagram />
            </a>{" "}
            |{" "}
            <a
              target="_blank"
              href="https://www.linkedin.com/in/issa-abdulwaris-b4329639b/"
              className="link link-primary"
            >
              <FaLinkedinIn />
            </a>{" "}
            |{" "}
            <a
              target="_blank"
              href="https://x.com/melody_shiller"
              className="link link-primary"
            >
              <FaTwitter />
            </a>{" "}
            |{" "}
            <a
              target="_blank"
              href="https://github.com/Melodyysol"
              className="link link-primary"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} SHS. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};
