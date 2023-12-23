import AboutCard from "@/components/aboutCard";
import chain from "../public/chain.svg";
import hearts from "../public/hearts.svg";
import dice from "../public/dice.svg";
import hat from "../public/hat.svg";

export default function About() {
  return (
    <div
      id="about"
      className="rounded min-h-screen 
      space-y-5 scroll-mt-40"
    >
      <h1 className="text-3xl font-extrabold pl-4">About the Project</h1>
      <div className="grid grid-cols-12 grid-rows-2 gap-4 h-1/2">
        <AboutCard
          colSpan="col-span-6"
          bgColor="bg-secondary"
          title="On-chain"
          description="Fintechies thrive fully on-chain. Their metadata is encoded in
              base64 and stored on-chain. Their pictures are rendered in
              Solidity as adorable ASCII art."
          image={chain}
          imageAlt="Chain"
        />
        <AboutCard
          colSpan="col-span-6"
          bgColor="bg-primary"
          title="Soulbound Connection"
          description="Fintechies are devoted to their owners, 
          and resist any transfer to another. A badge of honor, 
          they symbolise your commitment to the NUS Fintech Society"
          image={hearts}
          imageAlt="Heart"
        />
        <AboutCard
          colSpan="col-span-5"
          bgColor="bg-[#83C282]"
          title="Generative Traits"
          description="Every Fintechie is born with distinct personalities
          and a specturm of colors. No two Fintechies are the same."
          image={dice}
          imageAlt="Dice"
        />
        <AboutCard
          colSpan="col-span-7"
          bgColor="bg-[#EC5B5B]"
          title="Hat "
          description="Fintechies love to wear hats. Each hat is more
          than just an accessory, it is a symbol of your specific role
          with the society."
          image={hat}
          imageAlt="Hat"
        />
      </div>
    </div>
  );
}
