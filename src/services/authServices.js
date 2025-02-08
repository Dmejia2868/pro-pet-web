



const API_URL = 'http://localhost:3000/api/users'; // Ajusta según tu backend

export async function login(email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token); // 🔒 Guardar el token en localStorage
      return data;
    } else {
      throw new Error("No se recibió un token.");
    }
  } catch (error) {
    console.error("❌ Error en login:", error);
    throw error;
  }
}


export async function register(userData) {
  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en el registro");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error en el registro:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("token"); // 🗑️ Eliminar el token de autenticación
  alert("Sesión cerrada"); // ✅ Mensaje de confirmación
  window.location.href = "/"; // 🔄 Redirigir a la página de inicio de sesión
}






