function Button() {
  return (
    <div className="bg-[#8445ff] h-[39.95px] relative rounded-[20px] shrink-0 w-[145.363px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[73px] not-italic text-[16px] text-center text-white top-[7.35px]">Assignments</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[39.95px] relative rounded-[20px] shrink-0 w-[91.806px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[46px] not-italic text-[#171717] text-[16px] text-center top-[7.35px]">Tasks</p>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex gap-[3.993px] items-start pb-[1.183px] pl-[7.173px] pr-[1.183px] pt-[7.173px] relative rounded-[24px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.183px] border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Button />
      <Button1 />
    </div>
  );
}