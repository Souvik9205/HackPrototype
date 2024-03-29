import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

function Home() {
  return (
    <div className="grid grid-cols-4 overflow-hidden">
      <div className="col-span-3 items-center justify-center">
        <div className="p-3">
          <h1 className="text-4xl sm:text-6xl font-bold p-3 font-serif">
            Auto Video Evaluator
          </h1>
          <p className="text-sm sm:text-xl p-3 mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            reprehenderit dolore magnam qui blanditiis fugiat, facere fugit
            laborum quae asperiores quia esse voluptas autem rerum tempore
            aliquid quas ad ratione?Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Expedita aut magni ab ad earum, aspernatur
            cupiditate optio temporibus nulla doloremque dignissimos natus
            pariatur minima fugit corporis placeat illo sit reiciendis. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Unde sed
            accusantium ipsa similique ullam officiis corrupti ea error
            laboriosam laudantium earum qui minima harum quasi consectetur, et
            ipsum exercitationem magnam. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Unde officia nobis eius dolor nulla illum id
            quisquam repudiandae harum totam sunt nisi expedita hic laborum,
            error quaerat quas praesentium omnis.
          </p>
          <div className="mt-8 p-3 ">
            <Link href={"/home"}>
              <Button color="warning">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-1 items-center justify-center">
        <div>
          <img
            src="./Landing.png"
            alt="landing image"
            className=" p-1 invert"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
