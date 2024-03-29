import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Logo from "./Logo.jsx";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Nav() {
  const session = await getServerSession(options);
  const menuItems = [
    { label: "Home", href: "/home" },
    { label: "Get Code", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Dashboard", href: "/client" },
    session
      ? { label: "Log out", href: "/api/auth/signout?callbackUrl=/" }
      : { label: "Log in", href: "/api/auth/signin" },
  ];

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link color="foreground" href="/">
            <Logo />
            <p className="font-bold text-2xl p-3">My site</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 pl-4" justify="start">
        <NavbarBrand>
          <Link color="foreground" href="/">
            <Logo />
            <p className="font-bold  text-3xl p-3">My Site</p>
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="/home" className="text-xl">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            href="#"
            aria-current="page"
            color="warning"
            className="text-xl"
          >
            Github
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/client" className="text-xl">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {session ? (
          <NavbarItem>
            <Button
              as={Link}
              color="warning"
              href="/api/auth/signout?callbackUrl=/"
              variant="flat"
            >
              Log out
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color="warning"
              href="/api/auth/signin"
              variant="flat"
            >
              Log in
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
