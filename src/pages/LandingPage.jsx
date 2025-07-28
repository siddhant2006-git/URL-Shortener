import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
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
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white py-6 text-center leading-tight">
        Shorten. Share. Track.
      </h1>

      <h2 className="text-sm sm:text-base md:text-lg text-gray-300 text-center mb-10 sm:mb-12 px-4 max-w-md sm:max-w-2xl">
        Create short links, QR codes, and analyze your traffic — all in one
        place.
      </h2>

      <form
        onSubmit={handleShorten}
        className="w-full flex flex-col sm:flex-row gap-3 items-center justify-center mb-12 sm:mb-16 max-w-3xl px-2"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your long URL"
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full sm:flex-1 py-3 px-4 bg-transparent text-sm sm:text-base border border-gray-600"
        />
        <Button
          className="w-full sm:w-auto h-10 bg-blue-50 text-black font-semibold"
          type="submit"
          variant="destructive"
        >
          Shorten!
        </Button>
      </form>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center items-stretch mb-16 px-2 w-full max-w-6xl">
        {[
          {
            icon: <FiLink size={36} />,
            title: "Shorten URLs",
            text: "Create short.\nmemorable links",
          },
          {
            icon: <BiQr size={36} />,
            title: "Generate QR Codes",
            text: "Turn your links into\nscannable QR codes",
          },
          {
            icon: <MdBarChart size={36} />,
            title: "Track Clicks",
            text: "Monitor the performance\nof your links",
          },
        ].map(({ icon, title, text }, idx) => (
          <div
            key={idx}
            className="border border-[#282c34] bg-[#13181f] rounded-xl p-5 flex flex-col items-center text-center"
          >
            <div className="text-white mb-3">{icon}</div>
            <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}

      <div className="w-full">
        <h2 className="text-white text-xl sm:text-2xl font-semibold mb-4 ml-4">
          FAQ&apos;s
        </h2>
      </div>

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
