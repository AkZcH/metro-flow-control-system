import React from "react";

const WelcomeCard = ({ username }) => {
  return (
    <div className="bg-gradient-to-r from-[#0066ff] to-[#00e0ff] text-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold">Welcome back, {username} 👋</h2>
      <p className="text-gray-100 mt-2">Ready to book your next ride?</p>
    </div>
  );
};

export default WelcomeCard;
