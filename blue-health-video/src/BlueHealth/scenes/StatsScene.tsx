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

const AnimatedNumber: React.FC<{
  value: number;
  suffix: string;
  label: string;
  delay: number;
}> = ({ value, suffix, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const countProgress = interpolate(frame - delay, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const displayValue = Math.round(value * countProgress);
  const scale = interpolate(appear, [0, 1], [0.5, 1]);
  const opacity = interpolate(appear, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${scale})`,
        opacity,
        marginBottom: 60,
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 110,
          fontWeight: 800,
          color: BLUE_PRIMARY,
          lineHeight: 1,
        }}
      >
        {displayValue.toLocaleString("de-DE")}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY_BODY,
          fontSize: 36,
          color: WHITE,
          opacity: 0.8,
          marginTop: 12,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const exitOpacity = interpolate(frame, [170, 180], [1, 0], {
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
      <AnimatedNumber
        value={8000}
        suffix="+"
        label="Partner-Apotheken"
        delay={10}
      />
      <AnimatedNumber
        value={100}
        suffix="+"
        label="Digitale Projekte"
        delay={50}
      />
      <AnimatedNumber
        value={75}
        suffix="%"
        label="Erfolgsquote Recruiting"
        delay={90}
      />
    </AbsoluteFill>
  );
};
