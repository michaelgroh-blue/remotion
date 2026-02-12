import { Composition } from "remotion";
import { BlueHealthReel } from "./BlueHealth/BlueHealthReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BlueHealthReel"
        component={BlueHealthReel}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
