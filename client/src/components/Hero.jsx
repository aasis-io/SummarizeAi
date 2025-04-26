import HeroImg from "./../assets/ai.svg";

const Hero = () => {
  return (
    <section className="w-full flex items-center justify-center px-4 sm:px-8">
      <div className="container pt-16 lg:pb-16 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-4xl sm:text-5xl font-medium font-caudex leading-tight">
              Summarize Fast,
              <br />
              <span className="text-main">
                Check for Plagiarism <br /> Instantly
              </span>
            </h2>
            <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 mx-auto md:mx-0 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>
            <p className="mt-4 text-lg font-medium font-poppins text-gray-700">
              Turn long notes into clear insights – while staying original!
            </p>
            <a
              href="#features"
              className="mt-6 inline-block bg-main text-white py-3 px-12 font-medium rounded-full hover:bg-hover duration-300 hover:cursor-pointer"
            >
              Get started now
            </a>
          </div>
          <div className="w-72 md:w-1/2 flex pt-10 lg:p-0 justify-center">
            <img src={HeroImg} alt="Hero" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
