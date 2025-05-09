const fetchData = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_DATA_URL!, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.statusText} (${response.status})`
      );
    }

    const result = await response.json();
    console.log("Fetched data: -> ", result); // Log the fetched data
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
