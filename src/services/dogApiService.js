const API_URL = "http://localhost:3000/api/dogs"; // URL del backend

// ✅ Obtener perros
export async function getDogs() {
    try {
        console.log("📡 Haciendo solicitud al backend:", API_URL);

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Respuesta de la API:", data);
        return data;
    } catch (error) {
        console.error("❌ Error en `getDogs()` (frontend):", error);
        return [];
    }
}
// ✅ Obtener perros con información del dueño (getDogsWithOwners)
export async function getDogsWithOwners() {
    const url = `${API_URL}?includeOwners=true`; // Suponiendo que tu backend admite este parámetro
    try {
        console.log("📡 Haciendo solicitud al backend para perros con datos de dueño:", url);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Perros con datos del dueño:", data);
        return data;
    } catch (error) {
        console.error("❌ Error en `getDogsWithOwners()` (frontend):", error);
        return [];
    }
}

// ✅ Obtener perros por `ownerId` (getDogsByOwner)
export async function getDogsByOwner(ownerId) {
    const url = `${API_URL}?ownerId=${ownerId}`; // Suponiendo que tu backend admite este parámetro
    try {
        console.log(`📡 Haciendo solicitud al backend para perros del dueño ${ownerId}:`, url);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`✅ Perros del dueño ${ownerId}:`, data);
        return data;
    } catch (error) {
        console.error(`❌ Error en \`getDogsByOwner()\` (frontend):`, error);
        return [];
    }
}

export async function createDog(dogData) {
    try {
        console.log("📡 Enviando datos al backend:", dogData);

        const formData = new FormData();
        
        // Agregar los datos del perro al FormData
        Object.keys(dogData).forEach((key) => {
            if (dogData[key] !== null) {
                formData.append(key, dogData[key]);
            }
        });

        console.log("📤 Datos enviados al backend:", [...formData]); // <-- Debug para verificar que la imagen se adjunta

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData, // ✅ Enviar como `multipart/form-data`
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Perro registrado con éxito:", data);
        return data;
    } catch (error) {
        console.error("❌ Error en `createDog()` (frontend):", error);
        throw error;
    }
}
