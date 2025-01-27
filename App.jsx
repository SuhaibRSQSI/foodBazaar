import React from "react";
import DataTable from "./DataTable1";
import users from "./data/users.json";
import houses from "./data/houses.json";
import "./App.css"

const userColumns = [
  {
    label: "ID",
    key: "id",
    renderCell: (user) => user.id,
    comparator: (a, b, direction) =>
      direction === "asc" ? a.id - b.id : b.id - a.id,
    filterType: null,
  },
  {
    label: "Name",
    key: "name",
    renderCell: (user) => user.name,
    comparator: (a, b, direction) =>
      direction === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    filterType: "string",
  },
  {
    label: "Age",
    key: "age",
    renderCell: (user) => user.age,
    comparator: (a, b, direction) =>
      direction === "asc" ? a.age - b.age : b.age - a.age,
    filterType: "range",
  },
  {
    label: "Occupation",
    key: "occupation",
    renderCell: (user) => user.occupation,
    comparator: (a, b, direction) =>
      direction === "asc"
        ? a.occupation.localeCompare(b.occupation)
        : b.occupation.localeCompare(a.occupation),
    filterType: "string",
  },
];

const houseColumns = [
  {
    label: "ID",
    key: "id",
    renderCell: (house) => house.id,
    comparator: (a, b, direction) =>
      direction === "asc" ? a.id - b.id : b.id - a.id,
    filterType: null,
  },
  {
    label: "Street",
    key: "street",
    renderCell: (house) => house.street,
    comparator: (a, b, direction) =>
      direction === "asc"
        ? a.street.localeCompare(b.street)
        : b.street.localeCompare(a.street),
    filterType: "string",
  },
  {
    label: "City",
    key: "city",
    renderCell: (house) => house.city,
    comparator: (a, b, direction) =>
      direction === "asc"
        ? a.city.localeCompare(b.city)
        : b.city.localeCompare(a.city),
    filterType: "string",
  },
  {
    label: "State",
    key: "state",
    renderCell: (house) => house.state,
    comparator: (a, b, direction) =>
      direction === "asc"
        ? a.state.localeCompare(b.state)
        : b.state.localeCompare(a.state),
    filterType: "string",
  },
  {
    label: "Built Year",
    key: "built_year",
    renderCell: (house) => house.built_year,
    comparator: (a, b, direction) =>
      direction === "asc"
        ? a.built_year - b.built_year
        : b.built_year - a.built_year,
    filterType: "range",
  },
];

export default function App() {
  return (
    <div>
      <h2>Users</h2>
      <DataTable data={users} columns={userColumns} />
      <br />
      {/* <h2>Houses</h2>
      <DataTable data={houses} columns={houseColumns} /> */}
    </div>
  );
}
