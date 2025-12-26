import { useEffect, useState } from "react";

const OTPCountdown = ({ initialTime = 120 }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <p className="mt-2 text-sm text-richblack-600">
      {timeLeft > 0 ? (
        <>
          OTP expires in{" "}
          <span className="font-semibold text-red-500">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </>
      ) : (
        <span className="font-semibold text-red-600">
          OTP expired. Please request a new one.
        </span>
      )}
    </p>
  );
};

export default OTPCountdown;
