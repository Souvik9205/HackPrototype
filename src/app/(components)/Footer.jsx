import React from "react";
import LogoI from "./(logos)/Instagram";
import LogoF from "./(logos)/Facebook";
import LogoL from "./(logos)/Linkedin";
import LogoG from "./(logos)/Github";
import Link from "next/link";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="grid grid-cols-3 border border-amber-400">
      <div className="col-span-2 justify-center items-center border border-amber-400 p-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-100">
            Smart Bengal Hackathon-2024
          </h1>
          <p className="pt-5 pb-10 text-gray-200 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos harum magnam natus maiores incidunt suscipit illo
            nesciunt tempora! Asperiores, vel tempora. Saepe, mollitia. Eos
            perferendis aspernatur voluptatum, enim aliquam illum! Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Voluptatem fugit
            necessitatibus illum blanditiis nihil ratione! Saepe fugit unde illo
            deleniti obcaecati distinctio hic omnis! Quae aliquam ipsam
            veritatis autem corporis.
          </p>
          <p className="text-gray-400">{`©${date} Souvik. All rights reserved.`}</p>
        </div>
      </div>
      <div className="col-span-1 justify-center items-center px-6 pt-5 text-sm">
        <div>
          <h2 className="text-lg font-semibold">Links-</h2>
          <div>
            <ul className="underline text-gray-300 p-2 flex gap-32 justify-around text-sm">
              <li>
                <Link href="/home" className="hover:text-gray-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-gray-200">
                  Docs
                </Link>
              </li>
            </ul>
          </div>
          <h1 className="text-xl font-semibold">Connect</h1>
          <div className="flex justify-around p-5">
            <a
              href="https://www.instagram.com/souvik_23_/"
              className="logo"
              target="_blank"
            >
              <LogoI />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61550503551153"
              className="logo"
              target="_blank"
            >
              <LogoF />
            </a>
            <a
              href="https://www.linkedin.com/in/souvik-mukhopadhyay-3617302b3/"
              className="logo"
              target="_blank"
            >
              <LogoL />
            </a>
            <a
              href="https://github.com/Souvik9205"
              className="logo"
              target="_blank"
            >
              <LogoG />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
