
const Features = () => {

    const craftData = [
        {id:1 , name: "100% Natural Soy Wax" , para:"Clean, slow burn", icon:"🌿"},
        {id:2 , name: "Wooden Wick" , para:"Soft crackling flame", icon:"🪵"},
        {id:3 , name: "Hand Poured" , para:"Small batch, with care", icon:"🤲"},
        {id:4 , name: "40–45 Hour Burn" , para:"Long-lasting luxury", icon:"⏱️"},
        {id:5 , name: "Perfect Gift" , para:"Beautifully packaged", icon:"🎁"},
    ]
  return (
    <>
    <div className="flex flex-wrap justify-center items-start gap-3 ">
      { craftData.map((data) =>(
        <div key={data.id} className="flex flex-col items-center text-center p-8 mt-20 rounded-bl-4xl rounded-tr-4xl bg-[#efdce4] ">
         
                         <h5 className="text-4xl mb-2">{data.icon}</h5>

          <h3 className="font-semibold mb-1">{data.name}</h3>

          <p className="">{data.para}</p>
           

        </div>
      ))
}</div>
    </>
  )
}

export default Features
