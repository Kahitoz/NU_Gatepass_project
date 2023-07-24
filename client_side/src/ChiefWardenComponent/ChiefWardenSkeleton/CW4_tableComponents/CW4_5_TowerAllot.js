import React,{ useState,useEffect } from 'react'
import designs from '../../ChiefWardenStyling/CW4_TableCSS';
import moment from "moment";

 const CW4_5_TowerAllotTable = ({data}) => {
    const [pgNo, setPgNo] = useState(1);
  const [TbData, setTbData] = useState([]);
  useEffect(() => {
    const paginate = (array, page_size, page_number) => {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    };

    const paginatedData = paginate(data, 5, pgNo);
    setTbData(paginatedData);
  }, [pgNo, data]);

  const handleNextPage = () => {
    setPgNo((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (pgNo > 1) {
      setPgNo((prevPage) => prevPage - 1);
    }
  };
    
  return (
    <div>
      <div className={`${designs.d1}`}>
        <div className={`${designs.d2}`}>
          <h1 className={`${designs.d5}`}>S.no</h1>
          <h1 className={`${designs.d5}`}>Hostel Name</h1>
          <h1 className={`${designs.d5}`}>Tower Name</h1>
          <h1 className={`${designs.d5}`}>Alloted Warden</h1>
        </div>
      </div>
      <div className={`${designs.d3}`}>
        {TbData.map((item, idx) => (
          <div className={`${designs.d4} hover:bg-row_hover_bg hover:-translate-y-1 hover:duration-75`} key={idx}>
            <h1 className={`${designs.d5} `}>{idx+1+((pgNo-1)*5)}</h1>
            <h1 className={`${designs.d5} `}>{item.masterhostal_name}</h1>
            <h1 className={`${designs.d5} `}>{item.mastertowername}</h1>
            <h1 className={`${designs.d5}`}>{item.warden_name}</h1>
      
    </div>
  ))}
   
    { TbData.length>1 && <div className="flex justify-center mt-4">
    <button
      className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
      onClick={handlePreviousPage}
      disabled={pgNo === 1}
    >
      Previous
    </button>
    <button
      className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
      onClick={handleNextPage}
      disabled={TbData.length < 5}
    >
      Next
    </button>
  </div>}
</div>
</div>
);
}
export default CW4_5_TowerAllotTable;