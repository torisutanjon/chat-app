"use client";

import { TopNav } from "../components";
import { useState, useEffect } from "react";

const Home = () => {
  const [login, setLogin] = useState<boolean>();
  const [component, setComponent] = useState(<></>);

  const showAddComponent = (data: JSX.Element) => {
    setComponent(data);
  };

  const hideAddComponent = (data: JSX.Element) => {
    setComponent(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex flex-col items-center justify-center">
      <TopNav
        isLogined={login}
        showAddComponent={showAddComponent}
        hideAddComponent={hideAddComponent}
      />
      <main className="relative h-[90%] w-full flex flex-col items-center justify-between">
        <div className="relative h-[85%] w-[90%]">
          <div className="relative h-full w-full flex items-center justify-center">
            <p className="text-black/25">Kindly enter a chat room first</p>
          </div>
        </div>
      </main>
      {component}
    </div>
  );
};

export default Home;
