import React from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabTitle } from "@/lib/generalFunction";
import { journalSources } from "../lib/dummyData";

const Reference = () => {
  TabTitle("SahamPedia | Reference");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">
            Referensi Jurnal dan Sumber
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Halaman ini berisi daftar referensi jurnal dan sumber yang digunakan
            dalam pengembangan platform SahamPedia Insight Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journalSources.map((journal, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle className="text-xl">{journal.title}</CardTitle>
                <CardDescription>
                  {journal.authors} ({journal.year})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-gray-600">{journal.description}</p>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <Link className="h-4 w-4 mr-1" />
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
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reference;
