import React from "react";
import { Layout } from "@/components/layout/Layout";
import { ImplementationHero } from "@/components/implementation/ImplementationHero";
import { ImplementationNav } from "@/components/implementation/ImplementationNav";
import { TechnicalArchitecture } from "@/components/implementation/TechnicalArchitecture";
import { DataSources } from "@/components/implementation/DataSources";
import { ChatbotImplementation } from "@/components/implementation/ChatbotImplementation";
import { ToolsTechnologies } from "@/components/implementation/ToolsTechnologies";
import { motion } from "framer-motion";
import { TabTitle } from "@/lib/generalFunction";

const Implementation = () => {
  TabTitle("SahamPedia | Implementation");

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <ImplementationHero />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-1">
            <ImplementationNav />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-24"
          >
            <TechnicalArchitecture />
            <DataSources />
            <ChatbotImplementation />
            <ToolsTechnologies />
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Implementation;
