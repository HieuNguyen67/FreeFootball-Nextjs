import { fetchData } from "@/util/fetchData";
import TableDataHighlight from "@/components/table-data-hightlight";

const ServerComponent = async () => {
  const data = await fetchData();

  return (
    <>
      <div className="backgroundimg w-full h-56 bg-cover bg-top bg-no-repeat"></div>
      <h1 className="text-center lg:text-3xl text-lg blue grid items-center bg-yelloww h-24">
        XEM HIGHLIGHTS - LIVESTREAM BÓNG ĐÁ
      </h1>
      <div className="container mx-auto px-4">
        <TableDataHighlight data={data} />
      </div>
    </>
  );
};

export default ServerComponent;
