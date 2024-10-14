
"use client"
import "@/styles/Home.scss";

import { useEffect, useState } from "react";

import { fetchCompetitions, Competition } from "@/util/fetchCompetitions";
import LeagueTable from "@/components/table-league";
import CompetitionsSelect from "@/components/competitions-select";
import Backdrop from "@/components/backdrop";

const Home = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<number | null>(null);

  useEffect(() => {
    const loadCompetitions = async () => {
      const fetchedCompetitions = await fetchCompetitions();
      setCompetitions(fetchedCompetitions);
    };

    loadCompetitions();
  }, []);

  const handleCompetitionChange = (id: number) => {
    setSelectedCompetitionId(id);
  };

  if (!competitions.length) {
    return (
      <div className="text-white">
        <Backdrop isLoading={true} />
      </div>
    );
  }

  return (
    <>
      <div className="backgroundimg2  w-12/12 lg:h-56 h-36 bg-cover bg-top bg-no-repeat"></div>
      <h1 className="text-center lg:text-3xl text-lg blue grid items-center bg-yelloww lg:h-24 h-16">
        XEM BXH BÓNG ĐÁ
      </h1>
      <div className="container mx-auto p-5">
        <CompetitionsSelect
          competitions={competitions}
          onCompetitionChange={handleCompetitionChange}
        />
        {selectedCompetitionId && (
          <LeagueTable competitionId={selectedCompetitionId} />
        )}
      </div>
    </>
  );
};

export default Home;

