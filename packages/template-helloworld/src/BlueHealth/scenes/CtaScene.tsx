import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLUE_PRIMARY, FONT_FAMILY, WHITE } from "../constants";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineAppear = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const buttonAppear = spring({
    frame: frame - 40,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  const urlOpacity = interpolate(frame, [60, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = Math.sin(frame * 0.08) * 0.03 + 1;

  const logoScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
          transform: `scale(${headlineAppear})`,
        }}
      >
        <h1
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 72,
            fontWeight: 700,
            color: WHITE,
            textAlign: "center",
            lineHeight: 1.2,
            margin: 0,
            padding: "0 60px",
          }}
        >
          Bereit für die
          <br />
          <span style={{ color: BLUE_PRIMARY }}>digitale Zukunft?</span>
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          transform: `scale(${buttonAppear * pulse})`,
        }}
      >
        <div
          style={{
            padding: "30px 80px",
            backgroundColor: BLUE_PRIMARY,
            borderRadius: 60,
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 700,
            color: WHITE,
          }}
        >
          Jetzt starten
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 350,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity: urlOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            transform: `scale(${logoScale * 0.6})`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 80,
              fontWeight: 700,
              color: WHITE,
            }}
          >
            blue
          </span>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: BLUE_PRIMARY,
              margin: "0 3px",
              alignSelf: "flex-end",
              marginBottom: 12,
            }}
          />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 80,
              fontWeight: 300,
              color: WHITE,
            }}
          >
            health
          </span>
        </div>
        <p
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 32,
            color: WHITE,
            opacity: 0.6,
            margin: 0,
          }}
        >
          blue.health/apotheke
        </p>
      </div>
    </AbsoluteFill>
  );
};
