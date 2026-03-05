import svgPaths from "./svg-msxhe26wi9";
import { imgVector } from "./svg-zgt9l";

function Group() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute inset-[23.89%_37.71%_22.02%_28.07%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-28.065px_-9.159px] mask-size-[99.996px_38.342px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.2227 20.7396">
          <path d={svgPaths.p14ceb230} fill="var(--fill-0, #0E0049)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0.46%_85.53%_0_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.176px] mask-size-[99.996px_38.342px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.469 38.1663">
          <path d={svgPaths.p10c46300} fill="var(--fill-0, #0E0049)" id="Vector_2" />
        </svg>
      </div>
      <div className="absolute inset-[26.72%_14.3%_29.03%_63.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-63.82px_-10.245px] mask-size-[99.996px_38.342px]" data-name="Vector_3" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.8782 16.9667">
          <path d={svgPaths.p2590d200} fill="var(--fill-0, #0E0049)" id="Vector_3" />
        </svg>
      </div>
      <div className="absolute inset-[28.45%_0_33.29%_85.38%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-85.374px_-10.909px] mask-size-[99.996px_38.342px]" data-name="Vector_4" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6218 14.6682">
          <path d={svgPaths.p2916f500} fill="var(--fill-0, #0E0049)" id="Vector_4" />
        </svg>
      </div>
      <div className="absolute inset-[28.47%_72.73%_33.35%_12.66%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-12.664px_-10.915px] mask-size-[99.996px_38.342px]" data-name="Vector_5" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6057 14.6414">
          <path d={svgPaths.pf11aff0} fill="var(--fill-0, #0E0049)" id="Vector_5" />
        </svg>
      </div>
      <div className="absolute inset-[0_73.03%_77.88%_18.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-18.485px_0px] mask-size-[99.996px_38.342px]" data-name="Vector_6" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.48176 8.48024">
          <path d={svgPaths.p7ff2e00} fill="var(--fill-0, #8245FE)" id="Vector_6" />
        </svg>
      </div>
      <div className="absolute inset-[0_0.09%_77.88%_91.42%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-91.421px_-0.001px] mask-size-[99.996px_38.342px]" data-name="Vector_7" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.4816 8.47973">
          <path d={svgPaths.p1f98a80} fill="var(--fill-0, #8245FE)" id="Vector_7" />
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[38.342px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Container">
      <Icon />
    </div>
  );
}