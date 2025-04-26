import { Link } from "react-router-dom";
import Plagiarism from "./../assets/plagiarism.png";
import Summary from "./../assets/writing.png";

const Features = () => {
  return (
    <>
      <div id="features" className="flex justify-center py-14 px-4 sm:px-8">
        <div className="font-poppins text-gray-700 text-center max-w-3xl">
          <h2 className="font-semibold text-xl mb-5">
            AI that refines your notes, not replaces them.
          </h2>
          <p className="leading-7">
            Our intelligent summarizer and plagiarism checker work alongside you
            to create concise, original, and insightful content—effortlessly.
            Save time, enhance clarity, and maintain authenticity. Welcome to
            the future of smarter writing.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block bg-white text-main py-3 px-12 font-medium rounded-full hover:bg-hover hover:text-white duration-300 hover:cursor-pointer"
          >
            Sign up now.
          </Link>
        </div>
      </div>
      <section className="py-6 px-4 sm:px-8 lg:pb-20 lg:pt-8">
        <div className="container">
          <div className="flex flex-col justify-center items-center mb-12">
            <div className="text-center">
              <h3 className="text-3xl text-gray-700 font-caudex font-semibold mb-2">
                What we offer
              </h3>
              <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>
            </div>
          </div>

          <div className="flex flex-col items-center md:flex-row gap-6 justify-center font-poppins text-gray-700">
            <Link
              to="/summarize"
              className="p-6 sm:p-9 flex box-shadow gap-6 sm:gap-8 items-center bg-[#F9F7F4] shadow-sm rounded-md max-w-[475px] w-full"
            >
              <img
                src={Summary}
                alt="Summarizer"
                className="w-14 h-14 sm:w-16 sm:h-16"
              />
              <div>
                <h4 className="text-xl font-medium mb-2">Summarizer</h4>
                <p>Effortless summaries for clear and concise notes.</p>
              </div>
            </Link>
            <Link
              to="/plagiarism-checker"
              className="p-6 sm:p-9 flex gap-6 box-shadow sm:gap-8 items-center bg-[#F9F7F4] shadow-sm rounded-md max-w-[475px] w-full"
            >
              <img
                src={Plagiarism}
                alt="Plagiarism Checker"
                className="w-14 h-14 sm:w-16 sm:h-16"
              />
              <div>
                <h4 className="text-xl font-medium mb-2">Plagiarism Checker</h4>
                <p>Ensure academic integrity with advanced detection.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
