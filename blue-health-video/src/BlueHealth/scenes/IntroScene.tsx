import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLUE_PRIMARY, FONT_FAMILY, WHITE } from "../constants";

const PlusIcon: React.FC<{ delay: number; x: number; y: number }> = ({
  delay,
  x,
  y,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  const rotation = interpolate(frame - delay, [0, 120], [0, 360], {
    extrapolateRight: "extend",
  });

  const opacity = interpolate(scale, [0, 0.5], [0, 0.15], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontSize: 60,
        color: WHITE,
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        fontWeight: 300,
      }}
    >
      +
    </div>
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  const dotScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12 },
  });

  const taglineOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [50, 80], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [100, 120], [1, 0], {
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
      <PlusIcon delay={20} x={150} y={300} />
      <PlusIcon delay={35} x={800} y={250} />
      <PlusIcon delay={45} x={100} y={1400} />
      <PlusIcon delay={55} x={850} y={1500} />
      <PlusIcon delay={30} x={500} y={200} />
      <PlusIcon delay={60} x={200} y={1000} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${logoScale})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 0,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 120,
              fontWeight: 700,
              color: WHITE,
              letterSpacing: -2,
            }}
          >
            blue
          </span>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              backgroundColor: BLUE_PRIMARY,
              marginLeft: 4,
              marginRight: 4,
              transform: `scale(${dotScale})`,
              alignSelf: "flex-end",
              marginBottom: 18,
            }}
          />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 120,
              fontWeight: 300,
              color: WHITE,
              letterSpacing: -2,
            }}
          >
            health
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 700,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <p
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            color: WHITE,
            opacity: 0.8,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Digitalisierungspartner
        </p>
        <p
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            color: WHITE,
            opacity: 0.8,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          für Apotheken
        </p>
      </div>
    </AbsoluteFill>
  );
};
