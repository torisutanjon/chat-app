"use client";

import { accountAPI } from "@/app/api";

interface ParamsTypes {
  params: {
    params: [verificationToken: string, userIDToken: string];
  };
}

const ConfirmVerification = ({ params }: ParamsTypes) => {
  const [userIDToken, verificationToken] = params.params;

  const verificationHandler = async () => {
    try {
      await accountAPI.confirmVerification(userIDToken, verificationToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
      <button
        className="relative h-[50px] w-[250px] rounded-[8px] bg-black/75 text-white text-[14px]"
        onClick={() => verificationHandler()}
      >
        Confirm Verification
      </button>
    </div>
  );
};

export default ConfirmVerification;
