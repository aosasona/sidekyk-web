import { useState } from "react";

const features = {
  1: {
    title: "Feature 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod",
  },
};

export default function FeatureList() {
  const [currentFeature, setCurrentFeature] = useState(1);

  function cycle() {
    if (currentFeature === 6) {
      setCurrentFeature(1);
    } else {
      setCurrentFeature(currentFeature + 1);
    }
  }

  return (
    <div className="flex relative flex-col-reverse items-center w-full h-full lg:flex-row">
      <img src={`mockups/${currentFeature}.PNG`} className="object-contain w-5/6 mx-auto -bottom-[50%]" />
    </div>
  );
}
