import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { faBriefcase, faMagnifyingGlass, faUserDoctor } from "@fortawesome/free-solid-svg-icons";

export const userPagesArr = [
  {
    menuLabel: "Suche",
    menuIcon: faMagnifyingGlass,
    path: "find-jobs",
  },
  {
    menuLabel: "Einsätze",
    menuIcon: faBriefcase,
    path: "jobs-user",
  },
  {
    menuLabel: "Bereitschaft",
    menuIcon: faCalendarCheck,
    path: "availibilities-user",
  },
  {
    menuLabel: "Profil",
    menuIcon: faUserDoctor,
    path: "profile",
  },
]