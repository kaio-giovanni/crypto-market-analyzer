import React, { useState, useEffect, createElement } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Collapse,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  PowerIcon,
  Bars2Icon,
  CodeBracketSquareIcon,
} from "@heroicons/react/24/solid";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../assets/logo2.png";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, user } = useAuth0();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 ml-auto lg:ml-2"
        >
          <small className="mx-2 text-white">Hi, {user.name}</small>
          <Avatar
            variant="circular"
            size="sm"
            alt="User profile"
            className="border border-gray-200 p-0.5"
            src={user.picture}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            color="white"
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1 bg-indigo-900 border border-solid border-indigo-500 text-white">
        <MenuItem onClick={closeMenu} className="flex items-center gap-2 rounded">
          {createElement(UserCircleIcon, {
            className: "h-4 w-4",
            strokeWidth: 2,
          })}
          <Link to="/home" replace={true}>
            <Typography as="span" variant="small" className="font-normal" color={"inherit"}>
              My Profile
            </Typography>
          </Link>
        </MenuItem>

        <MenuItem onClick={closeMenu} className="flex items-center gap-2 rounded">
          {createElement(Cog6ToothIcon, {
            className: "h-4 w-4",
            strokeWidth: 2,
          })}
          <Link to="/home" replace={true}>
            <Typography as="span" variant="small" className="font-normal" color={"inherit"}>
              Settings
            </Typography>
          </Link>
        </MenuItem>

        <MenuItem onClick={closeMenu} className="flex items-center gap-2 rounded">
          {createElement(InboxArrowDownIcon, {
            className: "h-4 w-4",
            strokeWidth: 2,
          })}
          <Link to="/home" replace={true}>
            <Typography as="span" variant="small" className="font-normal" color={"inherit"}>
              Inbox
            </Typography>
          </Link>
        </MenuItem>

        <MenuItem onClick={closeMenu} className="flex items-center gap-2 rounded ">
          {createElement(PowerIcon, {
            className: "h-4 w-4 text-red-500",
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color={"red"}
            onClick={() => {
              console.log("Logout...");
              logout({
                logoutParams: { returnTo: `${window.location.origin}/login` },
              });
            }}
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const navListItems = [
  {
    label: "Exchanges",
    icon: CodeBracketSquareIcon,
  },
];

const NavList = () => {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon }, key) => (
        <Link to="/exchanges" replace={true} key={key}>
          <Typography as="span" variant="small" color="gray" className="font-medium text-white">
            <MenuItem className="flex items-center gap-2 lg:rounded-full text-xs">
              {createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              <span className="text-white">{label}</span>
            </MenuItem>
          </Typography>
        </Link>
      ))}
    </ul>
  );
};

const NavbarMenu = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setIsNavOpen(false));
  }, []);

  return (
    <Navbar
      className="text-white mx-auto w-full max-w-none p-2 lg:pl-6 rounded-none border border-solid border-indigo-500"
      style={{ backgroundColor: "#1e1b4b" }}
    >
      <div className="relative mx-auto flex items-center justify-items-start">
        <Link to="/home" replace={true}>
          <img src={Logo} alt="logo" className="h-9" />
        </Link>
        <Link to="/home" replace={true}>
          <Typography as="span" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-sm">
            Crypto Market Analyzer
          </Typography>
        </Link>
        <div className="hidden lg:block lg:ml-auto">
          <NavList />
        </div>
        <ProfileMenu />
        <IconButton
          size="sm"
          color="white"
          variant="text"
          onClick={toggleIsNavOpen}
          className="mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
      </div>
      <Collapse open={isNavOpen} className="overflow-hidden">
        <NavList />
      </Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
