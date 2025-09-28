import React from "react";

function about() {
  return (
    <div>
      <div>
        <div className="p-16 max-w-3xl">
            <h2 className="font-bold text-5xl leading-tight text-orange-500 mb-6">Your Fitness Journey Starts Here</h2>
            <p className="text-xl mb-6">For over 10 years, IronFit has been transforming lives through fitness. We're more than just a gym - we're a community dedicated to helping you achieve your health and wellness goals.</p>
            <div className="flex flex-wrap gap-4 bg-gray-200">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                    <span className="text-3xl font-bold text-white block">10+</span>
                    <span className="text-gray-200 text-sm">Years of Excellence</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                    <span className="text-3xl font-bold text-white block">5000+</span>
                    <span className="text-gray-200 text-sm">Happy Members</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                    <span className="text-3xl font-bold text-white block">20+</span>
                    <span className="text-gray-200 text-sm">Expert Trainers</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default about;
