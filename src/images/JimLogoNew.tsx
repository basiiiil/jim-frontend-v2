import React from "react";
import { styled } from "@mui/material/styles";

type JimLogoNewProps = {
  col1: string;
  col2: string;
  col3: string;
};

const Wrapper = styled("div")({
  width: "100%",
});

const JimLogoNew = ({ col1, col2, col3 }: JimLogoNewProps) => (
  <Wrapper>
    <svg viewBox="0 0 86.212098 40.927869" width="100%">
      <g
        fontStyle="normal"
        fontVariant="normal"
        fontWeight={500}
        fontStretch="normal"
        fontSize="50.8px"
        fontFamily="Signika"
        letterSpacing="3.175px"
        fillOpacity={1}
        stroke="none"
        strokeWidth={0.264583}
      >
        <path
          d="M4.881 31.576q1.092.66 2.464 1.143 1.397.458 2.743.458 3.023 0 4.115-1.83 1.092-1.828 1.092-5.613V3.078q.711-.127 1.575-.178.863-.051 1.498-.051.66 0 1.474.05.838.052 1.549.179v21.894q0 2.845-.432 5.284-.406 2.413-1.55 4.216-1.142 1.803-3.276 2.82-2.108.99-5.486.99-1.981 0-4.14-.533-2.16-.56-3.861-1.626.228-1.22.787-2.413.559-1.22 1.448-2.134z"
          style={{
            lineHeight: 1.25,
            fontFamily: "'Signika Medium'",
            fontVariantLigatures: "normal",
            fontVariantCaps: "normal",
            fontVariantNumeric: "normal",
            fontVariantEastAsian: "normal",
          }}
          fill={col1}
        />
        <path
          d="M38.921 37.774q-.635.127-1.422.178-.762.05-1.55.05-.787 0-1.575-.05-.762-.051-1.397-.178V19.638q0-1.346-.508-2.032-.482-.685-1.752-.685h-.635q-.229-.991-.229-2.083 0-.508.051-1.042.05-.558.178-1.117 1.041-.127 1.981-.178.965-.05 1.6-.05h.762q2.083 0 3.277 1.32 1.219 1.32 1.219 3.581zM31.403 5.77q0-1.372.508-2.464.508-.28 1.371-.457.864-.203 1.677-.203.787 0 1.701.203.915.178 1.347.457.228.508.355 1.194.153.66.153 1.27 0 1.346-.508 2.438-.432.28-1.347.483-.914.178-1.701.178-.813 0-1.702-.178-.864-.203-1.346-.483-.508-1.092-.508-2.438z"
          style={{
            lineHeight: 1.25,
            fontFamily: "'Signika Medium'",
            fontVariantLigatures: "normal",
            fontVariantCaps: "normal",
            fontVariantNumeric: "normal",
            fontVariantEastAsian: "normal",
          }}
          fill={col2}
        />
        <path
          d="M51.892 3.103q1.016-.178 2.185-.229 1.168-.05 1.93-.05.788 0 1.83.05 1.066.051 2.056.229l4.37 15.011q.126.534.406 1.651.304 1.118.61 2.439.33 1.295.583 2.464.254 1.168.356 1.803h.305q.101-.635.355-1.803.28-1.169.585-2.464.304-1.321.584-2.439.305-1.117.457-1.65l4.369-15.012q1.041-.178 2.057-.229 1.016-.05 1.804-.05.762 0 1.93.05 1.168.051 2.21.229l2.692 34.595q-.66.178-1.524.254-.838.076-1.6.076-.711 0-1.372-.05-.635-.026-1.32-.153L76.657 20.4q-.076-1.498-.177-3.403l-.153-3.81q-.05-1.93-.076-3.48h-.305l-6.477 22.81q-.66.126-1.55.177-.888.05-1.574.05-.635 0-1.524-.05t-1.575-.178L56.795 9.707h-.28q-.05 1.55-.127 3.48-.05 1.905-.127 3.81-.076 1.905-.152 3.403L54.99 37.825q-.66.127-1.346.152-.686.051-1.397.051-.737 0-1.575-.076t-1.473-.254z"
          style={{
            lineHeight: 1.25,
            fontFamily: "'Signika Medium'",
            fontVariantLigatures: "normal",
            fontVariantCaps: "normal",
            fontVariantNumeric: "normal",
            fontVariantEastAsian: "normal",
          }}
          fill={col3}
        />
      </g>
    </svg>
  </Wrapper>
);

export default JimLogoNew;
