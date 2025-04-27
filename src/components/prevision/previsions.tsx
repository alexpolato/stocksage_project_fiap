export default async function Previsions() {
  const fetchData = await fetch("http://localhost:8080/api/home").then((res) =>
    res.json()
  );

  return (
    <div>
      <h1>Server Fetched Data: {fetchData.message}</h1>
    </div>
  );
}
