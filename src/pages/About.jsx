import { picc1 } from "../assets"

const About = () => {
  return (
    <>
    {/* //first section - About Shatha */}
    <div className="relative overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F5EFE6]/60 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* النص */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#956907]"></span>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#956907]">The Brand</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#3d2f1a] leading-tight mb-6">
              About <span className="italic text-[#956907]">Shatha</span>
            </h1>
            
            <h5 className="text-xl md:text-2xl text-gray-700 italic mb-6 relative">
              <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-[2px] bg-[#956907]/50 hidden lg:block"></span>
              A little warmth. A lasting impression.
            </h5>
            
            <p className="text-base md:text-lg text-[#6b5b4a] leading-relaxed mb-8 max-w-lg">
              Shatha is a candle and perfume store inspired by the way scent can shape a mood and bring a moment to life. 
              From a quiet evening at home to a fragrance that becomes part of your day, our world is all about 
              warmth, atmosphere, and personal expression.
            </p>

            <div className="relative pl-6 border-l-2 border-[#956907]/40">
              <h5 className="text-lg text-[#3d2f1a] font-medium">
                Explore candles and perfumes, and find a scent that feels like you.
              </h5>
            </div>
          </div>

          {/* الصورة */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#956907]/20 to-[#c9a24a]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-xl group-hover:-translate-y-2 transition-transform duration-700">
              <img 
                src={picc1} 
                alt="Shatha" 
                className="w-full h-auto object-cover scale-100 group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d2f1a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-[#956907]/30 rounded-br-[2rem] -z-10 group-hover:scale-110 transition-transform duration-700"></div>
          </div>

        </div>
      </div>
    </div>

    {/* //second section - What Makes Us Different */}
    <div className="relative overflow-hidden pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5EFE6] via-transparent to-transparent opacity-60 pointer-events-none"></div>
      
      {/* العنوان */}
      <div className="relative flex flex-col items-center mt-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-[#956907]/50"></span>
          <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#956907]">Our Values</span>
          <span className="h-px w-8 bg-[#956907]/50"></span>
        </div>

        <div className="relative flex items-center justify-center gap-5">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#956907]"></span>
            <span className="h-px w-14 bg-gradient-to-r from-[#956907]/20 to-[#956907]"></span>
          </div>

          <h1 className="relative text-3xl md:text-4xl font-serif font-bold italic text-[#735109] text-center">
            What Makes Us
            <span className="relative inline-block ml-2 text-[#956907]">
              Different
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#956907] to-transparent"></span>
              <span className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-[#956907]"></span>
            </span>
          </h1>

          <div className="hidden sm:flex items-center gap-2">
            <span className="h-px w-14 bg-gradient-to-l from-[#956907]/20 to-[#956907]"></span>
            <span className="w-1.5 h-1.5 rotate-45 bg-[#956907]"></span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="w-10 h-px bg-[#956907]/30"></span>
          <span className="w-2 h-2 rotate-45 border border-[#956907]/60"></span>
          <span className="w-10 h-px bg-[#956907]/30"></span>
        </div>
      </div>

      <div className="container mx-auto mt-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 max-w-7xl">
        {/* Card 01 */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#956907] via-[#c9a24a] to-[#735109] rounded-[2rem] opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 ease-out"></div>
          
          <div className="relative h-full bg-white rounded-[2rem] p-1 transition-all duration-700 ease-out group-hover:-translate-y-2">
            <div className="relative h-full flex flex-col bg-gradient-to-b from-[#FBF8F3] to-[#EFE6D8] rounded-[1.85rem] p-8 overflow-hidden">
              
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#956907]/60 to-transparent"></div>
              
              <div className="absolute -bottom-8 -right-8 text-[#956907]/[0.05] group-hover:text-[#956907]/[0.10] transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6">
                <svg className="w-40 h-40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a6 6 0 006-6c0-3-3-5-3-9 0 0-3 2-3 5 0 1.5 1 2 1 3a2 2 0 11-4 0c0-1 1-1.5 1-3 0-3-3-5-3-5 0 4-3 6-3 9a6 6 0 006 6z" />
                </svg>
              </div>

              <div className="relative flex items-start justify-between gap-3">
                <div className="relative flex-shrink-0">
                  <span className="block font-serif text-[3rem] leading-none font-light text-[#956907]/25 group-hover:text-[#956907]/50 transition-colors duration-700">01</span>
                  <span className="absolute -bottom-1 left-0 h-px w-8 bg-[#956907] group-hover:w-12 transition-all duration-500"></span>
                </div>
                
                <div className="relative mt-1 text-right">
                  <span className="block text-2xl font-serif font-bold italic leading-none text-[#956907] group-hover:text-[#735109] transition-colors duration-500">
                    Warmth
                  </span>
                  <span className="mt-1.5 block h-[2px] w-full bg-gradient-to-r from-transparent to-[#956907]/60 group-hover:to-[#956907] transition-all duration-500"></span>
                </div>
              </div>

              <div className="relative z-10 mt-6 flex-1">
                <h3 className="text-xl font-bold text-[#3d2f1a] mb-3 leading-snug group-hover:text-[#735109] transition-colors duration-300">
                  A feeling, not just a fragrance
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We focus on the mood scent brings to everyday moments.
                </p>
              </div>

              <div className="relative z-10 mt-8 flex items-center gap-2">
                <span className="w-6 h-px bg-[#956907]/40 group-hover:w-16 group-hover:bg-[#956907] transition-all duration-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#956907]/40 group-hover:bg-[#956907] transition-colors duration-500"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 02 */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#956907] via-[#c9a24a] to-[#735109] rounded-[2rem] opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 ease-out"></div>
          
          <div className="relative h-full bg-white rounded-[2rem] p-1 transition-all duration-700 ease-out group-hover:-translate-y-2">
            <div className="relative h-full flex flex-col bg-gradient-to-b from-[#FBF8F3] to-[#EFE6D8] rounded-[1.85rem] p-8 overflow-hidden">
              
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#956907]/60 to-transparent"></div>
              
              <div className="absolute -bottom-8 -right-8 text-[#956907]/[0.05] group-hover:text-[#956907]/[0.10] transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6">
                <svg className="w-40 h-40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c3 4 6 7 6 11a6 6 0 01-12 0c0-4 3-7 6-11z" />
                </svg>
              </div>

              <div className="relative flex items-start justify-between gap-3">
                <div className="relative flex-shrink-0">
                  <span className="block font-serif text-[3rem] leading-none font-light text-[#956907]/25 group-hover:text-[#956907]/50 transition-colors duration-700">02</span>
                  <span className="absolute -bottom-1 left-0 h-px w-8 bg-[#956907] group-hover:w-12 transition-all duration-500"></span>
                </div>
                
                <div className="relative mt-1 text-right">
                  <span className="block text-2xl font-serif font-bold italic leading-none text-[#956907] group-hover:text-[#735109] transition-colors duration-500">
                    Expression
                  </span>
                  <span className="mt-1.5 block h-[2px] w-full bg-gradient-to-r from-transparent to-[#956907]/60 group-hover:to-[#956907] transition-all duration-500"></span>
                </div>
              </div>

              <div className="relative z-10 mt-6 flex-1">
                <h3 className="text-xl font-bold text-[#3d2f1a] mb-3 leading-snug group-hover:text-[#735109] transition-colors duration-300">
                  Space to be yourself
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Scent is personal. Our world leaves room for your own expression.
                </p>
              </div>

              <div className="relative z-10 mt-8 flex items-center gap-2">
                <span className="w-6 h-px bg-[#956907]/40 group-hover:w-16 group-hover:bg-[#956907] transition-all duration-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#956907]/40 group-hover:bg-[#956907] transition-colors duration-500"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 03 */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#956907] via-[#c9a24a] to-[#735109] rounded-[2rem] opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 ease-out"></div>
          
          <div className="relative h-full bg-white rounded-[2rem] p-1 transition-all duration-700 ease-out group-hover:-translate-y-2">
            <div className="relative h-full flex flex-col bg-gradient-to-b from-[#FBF8F3] to-[#EFE6D8] rounded-[1.85rem] p-8 overflow-hidden">
              
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#956907]/60 to-transparent"></div>
              
              <div className="absolute -bottom-8 -right-8 text-[#956907]/[0.05] group-hover:text-[#956907]/[0.10] transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6">
                <svg className="w-40 h-40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>

              <div className="relative flex items-start justify-between gap-3">
                <div className="relative flex-shrink-0">
                  <span className="block font-serif text-[3rem] leading-none font-light text-[#956907]/25 group-hover:text-[#956907]/50 transition-colors duration-700">03</span>
                  <span className="absolute -bottom-1 left-0 h-px w-8 bg-[#956907] group-hover:w-12 transition-all duration-500"></span>
                </div>
                
                <div className="relative mt-1 text-right">
                  <span className="block text-2xl font-serif font-bold italic leading-none text-[#956907] group-hover:text-[#735109] transition-colors duration-500">
                    Connection
                  </span>
                  <span className="mt-1.5 block h-[2px] w-full bg-gradient-to-r from-transparent to-[#956907]/60 group-hover:to-[#956907] transition-all duration-500"></span>
                </div>
              </div>

              <div className="relative z-10 mt-6 flex-1">
                <h3 className="text-xl font-bold text-[#3d2f1a] mb-3 leading-snug group-hover:text-[#735109] transition-colors duration-300">
                  Home and you, together
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Candles and perfumes share one collection, connecting atmosphere and identity.
                </p>
              </div>

              <div className="relative z-10 mt-8 flex items-center gap-2">
                <span className="w-6 h-px bg-[#956907]/40 group-hover:w-16 group-hover:bg-[#956907] transition-all duration-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#956907]/40 group-hover:bg-[#956907] transition-colors duration-500"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* //third section - Our Story (تصميم الورقة الفاخرة + الختم المتحرك) */}
    <div className="container mx-auto px-4 max-w-6xl mb-28 relative">
      
      {/* أوراق خلفية (تأثير التراكب) */}
      <div className="absolute inset-0 bg-[#EFE6D8] rounded-[1.5rem] rotate-[-2deg] scale-[0.98] shadow-sm transition-transform duration-500 group-hover:rotate-[-1deg]"></div>
      <div className="absolute inset-0 bg-[#F5EFE6] rounded-[1.5rem] rotate-[1deg] scale-[0.99] shadow-sm transition-transform duration-500 group-hover:rotate-[0.5deg]"></div>

      {/* البطاقة الأساسية */}
      <div className="relative group bg-[#FBF8F3] rounded-[1.5rem] shadow-md hover:shadow-2xl transition-all duration-500 border border-[#956907]/10 overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-stretch">
          
          {/* الجانب الأيسر: العنوان والختم */}
          <div className="w-full md:w-5/12 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#956907]/10 relative overflow-hidden">
            
            {/* خلفية دائرية خفيفة */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#956907]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

            <div className="flex items-center gap-2 mb-4 relative z-10">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#956907]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#956907]">Rooted in a feeling</span>
            </div>
            
            <div className="flex items-center justify-between gap-4 relative z-10">
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#3d2f1a] leading-none group-hover:text-[#735109] transition-colors duration-500">
                Our Story
              </h2>

              {/* الختم الدائري المتحرك */}
              <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <svg className="w-full h-full absolute inset-0 animate-[spin_15s_linear_infinite]" viewBox="0 0 100 100">
                  <path id="curve-story" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                  <text className="text-[8.5px] uppercase tracking-[0.2em] fill-[#956907]">
                    <textPath href="#curve-story">Shatha • Made with warmth • </textPath>
                  </text>
                </svg>
                <div className="w-2 h-2 rotate-45 bg-[#956907]"></div>
              </div>
            </div>
          </div>

          {/* الجانب الأيمن: المحتوى */}
          <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative">
            <h4 className="text-xl md:text-2xl font-serif text-[#735109] leading-snug mb-4">
              Sometimes, a feeling begins with a scent.
            </h4>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              That idea is at the heart of Shatha: the warmth of a room, the atmosphere of a moment, and the quiet expression of who you are. A world of fragrance for the spaces you love and the days you make your own.
            </p>
          </div>

        </div>
      </div>
    </div>
    
    </>
  )
}

export default About