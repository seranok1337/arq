import Sidebar from "../Sidebar";

export default function MainPage({ data, getData }) {
  return (
    <>
      <Sidebar data={data} getData={getData} />
    </>
  );
}
