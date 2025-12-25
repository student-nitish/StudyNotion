const Card = ({ cardData, currentCard, setCurrentCard }) => {

  return (
    <div
    

      className={`hover:scale-95  flex mb-6 flex-col items-start gap-2 w-[250px] min-h-[180px] p-4 rounded-md shadow ${cardData.heading==currentCard ? " bg-white hover:scale-95 hover:drop-shadow-yellow-bottom-right ":" bg-richblack-600 hover:drop-shadow-white-bottom-right "}  text-black cursor-pointer`}
    >
      <div className={ ` ${cardData.heading==currentCard ? " text-richblack-900":" text-white "} text-lg font-medium  `} >{cardData.heading}</div>
      <div className=" text-sm">{cardData.description}</div>
      <div className='flex flex-row gap-7'>
        <div className='text-richblack-800'>{cardData.level}</div>
        <div  className=" text-richblue-600">{cardData.lessionNumber}</div>
      </div>
    </div>
  );
};
export default Card;


