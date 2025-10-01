import AngleDetail from "./camera/angle";
import CameraDetail from "./camera/camera";
import HeightDetail from "./camera/height";
import SightDetail from "./camera/sight";

const Camera = ({
  camera,
  setCamera,
  height,
  setHeight,
  angle,
  setAngle,
  fov,
  setFov,
}) => {
  return (
    <>
      <div className="w-full flex flex-row justify-between gap-8">
        <CameraDetail camera={camera} setCamera={setCamera} />
        <AngleDetail angle={angle} setAngle={setAngle} />
      </div>
      <div className="w-full flex flex-row justify-between gap-8">
        <HeightDetail height={height} setHeight={setHeight} />
        <SightDetail sight={fov} setSight={setFov} />
      </div>
    </>
  );
};

export default Camera;
