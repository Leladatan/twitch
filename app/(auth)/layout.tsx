import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Twitch Authorized",
  description: "Twitch Authorized desc",
};

const LayoutAuth = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-bl from-indigo-600 via-purple-600 to-purple-800">
      {children}
    </div>
  );
};

export default LayoutAuth;