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

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  const scale = interpolate(appear, [0, 1], [0.8, 1]);
  const opacity = interpolate(appear, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px 40px",
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 28,
        border: "1px solid rgba(255,255,255,0.12)",
        transform: `scale(${scale})`,
        opacity,
        width: 920,
      }}
    >
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: 22,
          backgroundColor: BLUE_PRIMARY,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 44,
          marginBottom: 24,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 42,
          fontWeight: 700,
          color: WHITE,
          margin: "0 0 12px",
          textAlign: "center",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: FONT_FAMILY_BODY,
          fontSize: 30,
          color: WHITE,
          opacity: 0.7,
          margin: 0,
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {description}
      </p>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const exitOpacity = interpolate(frame, [250, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      <div
        style={{
          marginTop: 200,
          textAlign: "center",
          transform: `scale(${headlineScale})`,
          marginBottom: 60,
        }}
      >
        <h2
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 64,
            fontWeight: 700,
            color: WHITE,
            margin: 0,
          }}
        >
          Unsere Lösungen
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          alignItems: "center",
        }}
      >
        <FeatureCard
          icon="💎"
          title="BlueLoyalty"
          description="Kundenbindung & Couponing für Ihre Apotheke"
          delay={25}
        />
        <FeatureCard
          icon="🚀"
          title="Marketing"
          description="Digitale Sichtbarkeit & Social Media automatisiert"
          delay={70}
        />
        <FeatureCard
          icon="👤"
          title="Recruiting"
          description="Fachkräfte finden mit 75% Erfolgsquote"
          delay={115}
        />
      </div>
    </AbsoluteFill>
  );
};
