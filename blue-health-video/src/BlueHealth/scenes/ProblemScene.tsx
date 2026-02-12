import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BLUE_PRIMARY,
  FONT_FAMILY,
  FONT_FAMILY_BODY,
  WHITE,
} from "../constants";

const ProblemCard: React.FC<{
  icon: string;
  title: string;
  delay: number;
  yOffset: number;
}> = ({ icon, title, delay, yOffset }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, mass: 0.6 },
  });

  const translateX = interpolate(slideIn, [0, 1], [300, 0]);
  const opacity = interpolate(slideIn, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: yOffset,
        left: 80,
        right: 80,
        display: "flex",
        alignItems: "center",
        gap: 30,
        padding: "35px 40px",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        transform: `translateX(${translateX}px)`,
        opacity,
      }}
    >
      <span style={{ fontSize: 56 }}>{icon}</span>
      <span
        style={{
          fontFamily: FONT_FAMILY_BODY,
          fontSize: 38,
          color: WHITE,
          fontWeight: 500,
        }}
      >
        {title}
      </span>
    </div>
  );
};

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const subtitleOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [140, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 350,
          textAlign: "center",
          padding: "0 60px",
          transform: `scale(${headlineScale})`,
        }}
      >
        <h1
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 80,
            fontWeight: 700,
            color: WHITE,
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Ihre Apotheke.
        </h1>
        <h1
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 80,
            fontWeight: 700,
            color: BLUE_PRIMARY,
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Digital.
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          top: 620,
          textAlign: "center",
          padding: "0 100px",
          opacity: subtitleOpacity,
        }}
      >
        <p
          style={{
            fontFamily: FONT_FAMILY_BODY,
            fontSize: 34,
            color: WHITE,
            opacity: 0.7,
            lineHeight: 1.5,
          }}
        >
          Die zwei größten Herausforderungen im Apothekenmarkt:
        </p>
      </div>

      <ProblemCard icon="👥" title="Personalmangel" delay={45} yOffset={850} />
      <ProblemCard
        icon="📉"
        title="Kundenabwanderung"
        delay={65}
        yOffset={1010}
      />
    </AbsoluteFill>
  );
};
