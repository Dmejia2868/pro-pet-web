<template>
  <div class="container mx-auto p-6">
    <h1 class="text-xl font-bold mb-4">Manage Adoption</h1>

    <!-- Alert if user is not logged in -->
    <div v-if="!ownerId" class="bg-red-100 text-red-700 p-3 rounded mb-4">
      Error: You must be logged in as an owner to register a dog.
    </div>

    <!-- Dog Registration Form -->
    <form v-if="ownerId" @submit.prevent="registerDog" class="bg-white p-4 rounded shadow">
      <div v-for="field in dogFields" :key="field.id" class="mb-4">
        <label class="block text-sm font-bold">{{ field.label }}</label>
        <input 
          v-model="form[field.id]"
          type="text"
          class="w-full p-2 border rounded"
          required />
      </div>
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Register Dog</button>
    </form>

    <!-- Adoption Requests -->
    <div class="mt-6">
      <h2 class="text-lg font-semibold">Adoption Requests</h2>
      <ul>
        <li v-for="request in adoptionRequests" :key="request.id">
          {{ request.adopterName }} - Status: {{ request.status }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const ownerId = ref(null);
    const form = ref({
      name: '',
      breed: '',
      age: '',
      size: '',
      energyLevel: '',
      status: 'active',
      good_with_children: false,
      good_with_pets: false,
      space_requirement: '',
    });

    const dogFields = [
      { id: 'name', label: 'Dog Name' },
      { id: 'breed', label: 'Breed' },
      { id: 'age', label: 'Age' },
      { id: 'size', label: 'Size' },
      { id: 'energyLevel', label: 'Energy Level' },
      { id: 'status', label: 'Status (active/inactive)' },
      { id: 'good_with_children', label: 'Good with Children' },
      { id: 'good_with_pets', label: 'Good with Pets' },
      { id: 'space_requirement', label: 'Space Requirement' },
    ];

    const adoptionRequests = ref([]);

    // Retrieve ownerId from localStorage
    onMounted(() => {
      ownerId.value = localStorage.getItem("userId");
      if (!ownerId.value) {
        alert("Error: You are not logged in as an owner.");
      }
    });

    // Function to register a dog
    const registerDog = async () => {
      if (!ownerId.value) {
        alert("Error: You must be logged in as an owner to register a dog.");
        return;
      }

      try {
        await axios.post("/api/dogs", { ownerId: ownerId.value, ...form.value });
        alert("Dog successfully registered!");
      } catch (error) {
        console.error("Error registering dog:", error);
      }
    };

    return { ownerId, form, dogFields, registerDog, adoptionRequests };
  }
};
</script>