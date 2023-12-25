import React from "react";
import TitleSection from "@/components/landing-page/title-section";
import { Button } from "@/components/ui/button";

function HomaPage() {
  return (
    <section className="gap-4 px-4 mt-10 overflow-hidden sm:px-6 sm:flex sm:flex-col md:justify-center md:items-center">
      <div>
        <TitleSection
          pill="Your Workspace, Perfected"
          title="dfdsafdsafdsafsd"
        />
        <div className="bg-white p-[2px] mt-[6] rounded-xl bg-gradient-to-r from-primary to-brand-primaryBlue sm:w-[300px]">
          <Button
            variant="secondary"
            className="w-full rounded-[10px] p-6 text-2xl bg-background"
          >
            fdsafsa
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomaPage;
