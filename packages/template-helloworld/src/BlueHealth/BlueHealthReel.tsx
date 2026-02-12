import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./Background";
import { IntroScene } from "./scenes/IntroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { StatsScene } from "./scenes/StatsScene";
import { CtaScene } from "./scenes/CtaScene";

export const BlueHealthReel: React.FC = () => {
	return (
		<AbsoluteFill>
			<Background />

			{/* Scene 1: Intro – blue.health Logo (0-4s) */}
			<Sequence durationInFrames={120}>
				<IntroScene />
			</Sequence>

			{/* Scene 2: Problem Statement (4-9s) */}
			<Sequence from={120} durationInFrames={150}>
				<ProblemScene />
			</Sequence>

			{/* Scene 3: Features/Solutions (9-18s) */}
			<Sequence from={270} durationInFrames={270}>
				<FeaturesScene />
			</Sequence>

			{/* Scene 4: Stats/Numbers (18-24s) */}
			<Sequence from={540} durationInFrames={180}>
				<StatsScene />
			</Sequence>

			{/* Scene 5: CTA (24-30s) */}
			<Sequence from={720}>
				<CtaScene />
			</Sequence>
		</AbsoluteFill>
	);
};
