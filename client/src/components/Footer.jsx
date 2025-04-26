const footerItems = {
  tools: ["Plagiarism Checker", "Summarizer"],
  explore: ["Resources", "Blog", "Documents"],
  community: ["Community Central", "Support", "Help", "My Info"],
  company: ["About Us", "Partners", "Customers", "Contact Us"],
};

import Logo from "./../assets/Logo.svg";
import Facebook from "./../assets/facebook.png";
import Linkedin from "./../assets/linkedin.png";
import Youtube from "./../assets/youtube.png";
import Twitter from "./../assets/twitter.png";
import Instagram from "./../assets/instagram.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-24 font-poppins border-t border-gray-200">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-800">
          {Object.entries(footerItems).map(([category, items]) => (
            <div key={category} className="flex flex-col items-center">
              <div>
                <h4 className="font-semibold text-base mb-4 capitalize">
                  {category}
                </h4>
                <ul className="space-y-2 text-left">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-500 hover:text-main duration-150 text-[15px] cursor-pointer leading-6"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-12 pb-8">
        <Link>
          <img src={Logo} alt="" />
        </Link>
      </div>
      <p className="text-center">© 2025 SummarizeAI. All rights reserved. </p>
      <div className="flex justify-center gap-3 pt-6">
        <img src={Linkedin} alt="" className="w-5" />
        <img src={Instagram} alt="" className="w-5" />
        <img src={Facebook} alt="" className="w-5" />
        <img src={Twitter} alt="" className="w-5" />
        <img src={Youtube} alt="" className="w-5" />
      </div>
    </footer>
  );
};

export default Footer;
