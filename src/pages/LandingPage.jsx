import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Spotlight } from "@/components/ui/spotlight-new";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLink } from "react-icons/fi";
import { BiQr } from "react-icons/bi";
import { MdBarChart } from "react-icons/md";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 lg:px-16 xl:px-32 max-w-screen-xl mx-auto">
      <Spotlight />

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white py-6 text-center">
        Shorten. Share. Track.
      </h1>

      <h2 className="text-sm sm:text-base md:text-lg text-white text-center mb-12">
        Create short links, QR codes, and analyze your traffic.
      </h2>

      <form
        onSubmit={handleShorten}
        className="w-full flex flex-col sm:flex-row gap-3 items-center justify-center mb-10 max-w-3xl"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your longggggggggggggg URL"
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full sm:flex-1 py-3 px-4 bg-transparent text-sm sm:text-base"
        />
        <Button
          className="w-full sm:w-auto h-12 sm:h-full bg-white text-black"
          type="submit"
          variant="destructive"
        >
          Shorten!
        </Button>
      </form>

      {/* Cards Section */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 justify-center items-center mb-20 sm:mb-36">
        {[
          {
            icon: <FiLink size={44} />,
            title: "Shorten URLs",
            text: "Create short.\nmemorable links",
          },
          {
            icon: <BiQr size={44} />,
            title: "Generate QR Codes",
            text: "Turn your links into\nscannable QR codes",
          },
          {
            icon: <MdBarChart size={44} />,
            title: "Track Clicks",
            text: "Monitor the performance\nof your links",
          },
        ].map(({ icon, title, text }, idx) => (
          <div
            key={idx}
            className="border border-[#282c34] bg-[#13181f] rounded-xl p-6 sm:p-8 w-full sm:w-72 flex flex-col items-center text-center max-w-sm"
          >
            <div className="text-white mb-4 sm:mb-6">{icon}</div>
            <h3 className="text-white font-semibold text-xl mb-2">{title}</h3>
            <p className="text-gray-400 text-base leading-relaxed whitespace-pre-line">
              {text}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <h2 className="text-white text-2xl sm:text-3xl w-full text-left mb-4 sm:mb-6 px-2 sm:px-4">
        FAQ&apos;s
      </h2>

      <Accordion
        type="multiple"
        collapsible
        className="w-full px-2 sm:px-4 text-sm sm:text-base"
      >
        <AccordionItem
          className="py-1 mb-4 border-[#282c34] rounded-xl bg-[#13181f] border"
          value="item-1"
        >
          <AccordionTrigger className="ml-4">
            How URL shortener works?
          </AccordionTrigger>
          <AccordionContent className="ml-4">
            When you enter a long URL, our system generates a shorter version of
            it. This shortened URL will redirect to the original long URL when
            accessed.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          className="py-1 mb-4 border-[#282c34] rounded-xl bg-[#13181f] border"
          value="item-2"
        >
          <AccordionTrigger className="ml-4">
            Is it free to use?
          </AccordionTrigger>
          <AccordionContent className="ml-4">
            Yes, it is completely free to use. You only need to sign up if you
            don’t have an account, or simply log in with your existing account.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className="py-1 mb-4 border-[#282c34] rounded-xl bg-[#13181f] border"
        >
          <AccordionTrigger className="ml-4">
            Do I have to create an account to use?
          </AccordionTrigger>
          <AccordionContent className="ml-4">
            Yes, creating an account lets you manage your URLs, view analytics,
            and customize your shortened links.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;