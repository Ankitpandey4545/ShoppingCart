const getUserFromServer = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`, {
      method: 'GET',
      credentials: 'include',
    });

    // Optional: handle status codes manually
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch user');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching user:", error.message);
    return { success: false, message: error.message };
  }
};

export default getUserFromServer;
