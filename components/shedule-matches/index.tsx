"use client";


import { useEffect, useState } from "react";
import { fetchCompetitions, Competition } from "@/util/fetchCompetitions";
import CompetitionsSelect from "@/components/competitions-select";
import MatchesTable from "@/components/table-data-matches";
import Backdrop from "@/components/backdrop";

const ScheduleMatches = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<
    number | null
  >(null);

  useEffect(() => {
    const getCompetitions = async () => {
      try {
        const data = await fetchCompetitions();
        setCompetitions(data); 
      } catch (error) {
        console.error("Failed to fetch competitions:", error);
      }
    };

    getCompetitions();
  }, []);


  if (!competitions.length) {
    return (
      <div className="text-white">
        <Backdrop isLoading={true} />
      </div>
    );
  }

  return (
    <>
     
      <div className="container mx-auto min-h-screen text-white px-5">
        <CompetitionsSelect
          competitions={competitions}
          onCompetitionChange={(id) => setSelectedCompetitionId(id)}
        />
        {selectedCompetitionId && (
          <MatchesTable competitionId={selectedCompetitionId} />
        )}
      </div>
    </>
  );
};

export default ScheduleMatches;
