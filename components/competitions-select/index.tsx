
import { FC } from "react";
import { Competition } from "@/util/fetchCompetitions";

interface CompetitionsSelectProps {
  competitions: Competition[];
  onCompetitionChange: (id: number) => void;
}

const CompetitionsSelect: FC<CompetitionsSelectProps> = ({
  competitions,
  onCompetitionChange,
}) => {
  return (
    <div className="container mx-auto lg:px-5 lg:my-10 my-5">
      <label className="text-xl text-white">Giải đấu:</label>
      <select
        onChange={(e) => onCompetitionChange(Number(e.target.value))} 
        className="w-full p-2 border-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-transparent mt-3"
      >
        <option
         
          className="blue bg-yellow text-xs"
        >
          Chọn giải đấu
        </option>
        {competitions.map((competition) => (
          <option
            key={competition.id}
            value={competition.id}
            className="blue bg-yelloww text-xs"
          >
            {competition["full-name"]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompetitionsSelect;
