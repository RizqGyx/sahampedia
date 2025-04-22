import React from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book, Link as LinkIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabTitle } from "@/lib/generalFunction";
import { journalSources } from "../lib/dummyData";

const Reference = () => {
  TabTitle("SahamPedia | Reference");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 p-8 md:p-12 mb-12 text-white"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="flex items-center justify-center mb-6">
            <Book className="h-12 w-12 text-blue-200" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Referensi Jurnal dan Sumber
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto text-center">
            Daftar referensi jurnal dan sumber yang digunakan dalam pengembangan
            platform SahamPedia Insight Hub.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journalSources.map((journal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{journal.title}</CardTitle>
                      <CardDescription>
                        {journal.authors} ({journal.year})
                      </CardDescription>
                    </div>
                    <LinkIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-gray-600">{journal.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Book className="h-4 w-4 mr-1" />
                    <span>
                      {journal.journal}, {journal.volume}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    asChild
                  >
                    <a
                      href={journal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Lihat Jurnal
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reference;
