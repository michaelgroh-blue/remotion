import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BLUE_DARK, BLUE_PRIMARY } from "./constants";

export const Background: React.FC = () => {
	const frame = useCurrentFrame();

	const gradientPosition = interpolate(frame, [0, 900], [0, 100]);

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(${135 + gradientPosition * 0.5}deg, ${BLUE_DARK} 0%, ${BLUE_PRIMARY} 50%, ${BLUE_DARK} 100%)`,
				backgroundSize: "200% 200%",
			}}
		/>
	);
};
