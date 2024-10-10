
export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 bg-green-300" style={{height:'500rem'}}>
        <h1>Responsive Container</h1>
        <p>
          This container is responsive and adjusts based on the screen size.
        </p>
        <div className="lg:flex">
          <div className="lg:w-4/12 w-12/12 bg-pink-400 mx-2">
            <div className="lg:flex flex-col">
              <div className="lg:w-6/12 w-12/12 bg-red-400 mx-2">Col</div>
              <div className="lg:w-6/12 w-12/12 bg-red-400 mx-2">Col</div>
            </div>
          </div>
          <div className="lg:w-4/12 w-12/12 bg-pink-400 mx-2">Col</div>{" "}
          <div className="lg:w-4/12 w-12/12 bg-pink-400 mx-2">Col</div>
        </div>
        
      </div>
    </>
  );
}
