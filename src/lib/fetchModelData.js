async function fetchModel (url) {
  const cleanUrl = url.replace(/^\/+/, '');
  const fullUrl = `http://localhost:8081/${cleanUrl}`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok){
      throw { status: response.status }
    }
    const data = await response.json();
    return { data };

  } catch (error){
    console.error("Lỗi:", error);
    throw error;
  }

}

export default fetchModel;