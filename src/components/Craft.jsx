import { pic1 } from "../assets"

const items = [
  {id:1 , title:"Sourced" , para:"Essential oils and absolutes from growers we know by name — bergamot from Calabria, rose from Isparta." , icon:1},
  {id:2 , title:"Composed" , para:"Each accord is balanced by hand in small trial batches until the throw feels effortless, never sharp. " , icon:2},
  {id:3 , title:"Poured" , para:"Blended into a coconut-and-soy wax, hand-poured in tens, and cured for two weeks before it ships."  , icon:3},
]

const Craft = () => {
  return (
    <div className="bg-[#FAF5EB] mt-15 py-12">
    <div className=" container mx-auto p-6 flex  gap-10  ">
      <div>
        <img src={pic1} alt="pic"/>
      </div>
      <div className="w-160 flex flex-col justify-center items-center ">
<h1 className="text-[#473428] font-bold text-4xl font-serif ">Made slowly, in small batches, by people who love a good scent.</h1>
<p className="text-[#634735] mt-10 text-lg"> We are a maison of perfumers and makers who believe fragrance should feel personal. Nothing leaves the atelier until it smells the way a memory should.</p>
<div>
    <div className="mt-7">
      {items.map((item) =>(
      <div key={item.id} className="flex items-center justify-center gap-4">
        <div className=" p-3 rounded font-mono border-[#c88ea7] border-2">{item.icon}</div>
     <div>
           <h2 className="text-[#B28421] font-bold text-xl mb-3">{item.title}</h2>
        <p className="text-md text-[#4f3808]">{item.para}</p>
     </div>
      </div>
      ))}

</div>

      </div>
    </div>
    </div>
    </div>
  )
}

export default Craft
