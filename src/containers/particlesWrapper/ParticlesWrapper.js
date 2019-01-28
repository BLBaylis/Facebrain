import React from "react";
import Particles from "react-particles-js";

const ParticlesWrapper = React.memo(({ params }) => {
  return <Particles className="particles" params={params} />;
});

export default ParticlesWrapper;
