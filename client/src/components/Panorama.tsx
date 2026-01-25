import { Pannellum } from "pannellum-react";

export default function Panorama() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
      <h2 className="mb-4 text-2xl font-bold text-[#002855] dark:text-white">360° Office Tour</h2>
      <div className="overflow-hidden rounded-xl">
        <Pannellum
          width="100%"
          height="500px"
          image="https://pannellum.org/images/alma.jpg"
          pitch={10}
          yaw={180}
          hfov={110}
          autoLoad
          showZoomCtrl={true}
          mouseZoom={true}
          showFullscreenCtrl={true}
        >
          <Pannellum.Hotspot
            type="info"
            pitch={-5}
            yaw={0}
            text="Welcome to Tatweer!"
            handleClick={(_evt, name) => console.log(name)}
          />
          <Pannellum.Hotspot
            type="info"
            pitch={-2}
            yaw={90}
            text="Conference Room"
          />
        </Pannellum>
      </div>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        Drag to look around • Scroll to zoom • Click hotspots for info
      </p>
    </div>
  );
}
