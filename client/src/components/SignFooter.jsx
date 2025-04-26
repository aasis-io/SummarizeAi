import React from "react";
import Robot from "./../assets/robot.png";
import { Link } from "react-router-dom";

const SignFooter = () => {
  return (
    <div className="bg-gradient-to-t from-[#94DDCA] via-[#B7E5D7] to-background font-poppins">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24 py-16">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-xl font-medium text-gray-700 mb-3">
              Enhance Your Notes with AI: Clear, Original, and Efficient
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Refine your notes with AI—clear, original, and efficient. Save
              time, stay authentic, and boost your writing with ease.
            </p>
            <Link
              to="/get-started"
              className="mt-6 inline-block bg-white text-main py-3 px-8 md:px-12 font-medium rounded-full hover:shadow-main hover:shadow-xl transition duration-300"
            >
              Sign up now. It's free
            </Link>
          </div>

          {/* Right Image */}
          <div className="w-48 md:w-64">
            <img src={Robot} alt="AI Robot" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignFooter;
