import React from "react";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import JimLogoNew from "../../images/JimLogoNew";
import { flatten } from "lodash";

type BounceFieldProps = {
  size: "sm" | "md" | "lg" | "xl";
};

type LoadingBouncerProps = {
  size: "sm" | "md" | "lg" | "xl";
  fullscreen: boolean;
};

// const gradient = keyframes`
// 0% {
// 		background-position: 0% 50%;
// 	}
// 	50% {
// 		background-position: 100% 50%;
// 	}
// 	100% {
// 		background-position: 0% 50%;
// 	}
// `

// const Gradient = styled.div`
//   background: linear-gradient(
//     -45deg,
//     #c53c59,
//     #be355a,
//     #b62e5c,
//     #ae275d,
//     #a5215e,
//     #a12264,
//     #9c246a,
//     #97266f,
//     #942f7a,
//     #903785,
//     #8b3f8f,
//     #844799
//   );
//   background-size: 600% 600%;
//   animation: ${gradient} 2s ease-in-out infinite;
//   height: 80%;
//   width: 100%;
//   position: absolute;
// `

const bounce = keyframes`
0%, 100% {
    transform: translateY(-8%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
`;

const Bounce = styled("div")`
  animation: ${bounce} 1s infinite;
`;

// const randCol = keyframes`
// 0%, 100% {
//     color: #c53c59;
//   }
//   25% {
//     color: #991A5F;
//   }
//   50% {
//     color: #844799;
//   }
//   75% {
//     color: #991A5F;
//   }
// `
// const ColorWrapper = styled.div`
//   animation: ${randCol} 4s infinite;
// `

// const PageWrapper = tw.div`flex w-screen h-screen justify-center items-center bg-white overflow-hidden`;
// const OtherWrapper = tw.div`flex w-full h-full justify-center items-center bg-white overflow-hidden`;

const PageWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
});

const OtherWrapper = styled(PageWrapper)({
  width: "100%",
  height: "100%",
});

const BounceField = styled("div")<BounceFieldProps>(
  () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "5rem",
    height: "8rem",
  }),
  ({ size }) =>
    size === "sm" && {
      width: "3rem",
      height: "2rem",
    },
  ({ size }) =>
    size === "md" && {
      width: "6rem",
      height: "4rem",
    },
  ({ size }) =>
    size === "lg" && {
      width: "9rem",
      height: "6rem",
    },
  ({ size }) =>
    size === "xl" && {
      width: "12rem",
      height: "8rem",
    }
);

const LoadingBouncer = ({ size, fullscreen }: LoadingBouncerProps) =>
  fullscreen ? (
    <PageWrapper>
      <BounceField size={size}>
        {/* <Gradient /> */}
        <Bounce>
          {/* <JimLogoInverted width="100%" col="#fff" tw="z-20" /> */}
          <JimLogoNew col1="#991A5F" col2="#991A5F" col3="#991A5F" />
        </Bounce>
      </BounceField>
    </PageWrapper>
  ) : (
    <OtherWrapper>
      <BounceField size={size}>
        {/* <Gradient /> */}
        <Bounce>
          {/* <JimLogoInverted width="100%" col="#fff" tw="z-20" /> */}
          <JimLogoNew col1="#991A5F" col2="#991A5F" col3="#991A5F" />
        </Bounce>
      </BounceField>
    </OtherWrapper>
  );

export default LoadingBouncer;
