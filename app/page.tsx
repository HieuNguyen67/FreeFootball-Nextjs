import { fetchData } from "@/util/fetchData";
import TableDataHighlight from "@/components/table-data-hightlight";

const ServerComponent = async () => {
  const data = await fetchData();

  return (
    <>
      <div className="backgroundimg w-full lg:h-56 h-36 bg-cover bg-top bg-no-repeat"></div>
      <h1 className="text-center lg:text-3xl text-lg blue grid items-center bg-yelloww lg:h-24 h-16">
        XEM HIGHLIGHTS - LIVESTREAM BÓNG ĐÁ
      </h1>
      <div className="container mx-auto px-4">
        <TableDataHighlight data={data} />
      </div>
    </>
  );
};

export default ServerComponent;
