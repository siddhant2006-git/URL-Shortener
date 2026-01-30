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
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto font-sans">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground py-6 lg:py-8 text-center leading-tight tracking-tight text-balance">
        Shorten. Share. Track.
      </h1>

      <h2 className="text-base sm:text-lg lg:text-xl text-muted-foreground text-center mb-8 lg:mb-12 px-4 max-w-2xl lg:max-w-4xl leading-relaxed text-pretty">
        Create short links, QR codes, and analyze your traffic — all in one
        place.
      </h2>

      <form
        onSubmit={handleShorten}
        className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center mb-12 lg:mb-16 max-w-4xl px-4"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your long URL"
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full sm:flex-1 py-4 px-5 bg-background text-foreground text-base lg:text-lg border border-border rounded-lg shadow-sm focus:ring-2 focus:ring-ring focus:outline-none transition-all duration-200 placeholder:text-muted-foreground"
        />
        <Button
          className="w-full sm:w-auto h-12 lg:h-14 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all duration-200 shadow-sm hover:shadow-md text-base lg:text-lg px-6 lg:px-8"
          type="submit"
          variant="destructive"
        >
          Shorten!
        </Button>
      </form>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center items-stretch mb-16 lg:mb-20 px-4 w-full max-w-7xl">
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
            className="card-base border border-border bg-background rounded-xl p-6 lg:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="text-foreground mb-4">{icon}</div>
            <h3 className="text-foreground font-medium text-xl lg:text-2xl mb-3 leading-tight">{title}</h3>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed whitespace-pre-line">{text}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}

      <div className="w-full mb-16">
        <h2 className="text-foreground text-3xl lg:text-4xl font-medium mb-8 lg:mb-10 text-center">
          FAQ&apos;s
        </h2>

        <Accordion
          type="multiple"
          collapsible
          className="w-full px-4 lg:px-6 text-base lg:text-lg"
        >
          <AccordionItem
            className="py-2 mb-4 border border-border bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow"
            value="item-1"
          >
            <AccordionTrigger className="ml-4 text-foreground font-medium text-base lg:text-lg hover:text-secondary-foreground transition-colors">
              How URL shortener works?
            </AccordionTrigger>
            <AccordionContent className="ml-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
              When you enter a long URL, our system generates a shorter version
              of it. This shortened URL will redirect to the original long URL
              when accessed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            className="py-2 mb-4 border border-border bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow"
            value="item-2"
          >
            <AccordionTrigger className="ml-4 text-foreground font-medium text-base lg:text-lg hover:text-secondary-foreground transition-colors">
              Is it free to use?
            </AccordionTrigger>
            <AccordionContent className="ml-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
              Yes, it is completely free to use. You only need to sign up if you
              don&apos;t have an account, or simply log in with your existing
              account.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="py-2 mb-4 border border-border bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <AccordionTrigger className="ml-4 text-foreground font-medium text-base lg:text-lg hover:text-secondary-foreground transition-colors">
              Do I have to create an account to use?
            </AccordionTrigger>
            <AccordionContent className="ml-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
              Yes, creating an account lets you manage your URLs, view
              analytics, and customize your shortened links.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;
