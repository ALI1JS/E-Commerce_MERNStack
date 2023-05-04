

const OurValues = () => {
    return (
      <div className="">
        <h2 className="capitalize font-bold">Our Values</h2>
        <div className="w-full flex justify-center items-center flex-wrap gap-5 min-h-[100px] py-6">
          <div className="bg-white w-96 rounded hover:scale-y-110 transition-all px-3 py-8 cursor-pointer">
            <h2>Customer Service</h2>
            <p>Insert customer service value statement here...</p>
          </div>
          <div className="bg-white w-96 rounded hover:scale-110 transition-all px-3 py-8 cursor-pointer">
            <h2>Sustainability</h2>
            <p>Insert sustainability value statement here...</p>
          </div>
          <div className="bg-white w-96 rounded hover:scale-110 transition-all px-3 py-8 cursor-pointer">
            <h2>Social Responsibility</h2>
            <p>Insert social responsibility value statement here...</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default OurValues;