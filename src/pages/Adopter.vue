<template>
  <div class="container mx-auto p-6">
    <h1 class="text-xl font-bold mb-4">Adoption Application</h1>

    <!-- Form to enter adopter's data -->
    <form v-if="!submitted" @submit.prevent="submitApplication" class="bg-white p-4 rounded shadow">
      <div v-for="field in adopterFields" :key="field.id" class="mb-4">
        <label class="block text-sm font-bold">{{ field.label }}</label>
        <input 
          v-model="form[field.id]"
          :type="field.type"
          class="w-full p-2 border rounded"
          required />
      </div>

      <button type="submit" class="bg-blue-500 text-white p-2 rounded mt-4">Submit Application</button>
    </form>

    <!-- Show details after submission -->
    <div v-if="submitted" class="bg-green-100 p-4 rounded shadow">
      <h2 class="text-lg font-semibold">Application Details</h2>
      <ul class="mt-2">
        <li v-for="(value, key) in form" :key="key" class="mb-2">
          <strong>{{ getLabel(key) }}:</strong> {{ value }}
        </li>
      </ul>
      <p class="mt-4 text-sm text-gray-600">Your application has been successfully submitted!</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const submitted = ref(false);
    const form = ref({
      name: '',
      email: '',
      preferred_size: '',
      preferred_energy_level: '',
      has_children: false,
      has_other_pets: false,
      home_space: '',
    });

    const adopterFields = [
      { id: 'name', label: 'Full Name', type: 'text' },
      { id: 'email', label: 'Email', type: 'email' },
      { id: 'preferred_size', label: 'Preferred Dog Size (1-5)', type: 'number' },
      { id: 'preferred_energy_level', label: 'Preferred Energy Level (1-5)', type: 'number' },
      { id: 'has_children', label: 'Has Children (true/false)', type: 'text' },
      { id: 'has_other_pets', label: 'Has Other Pets (true/false)', type: 'text' },
      { id: 'home_space', label: 'Home Space (m²)', type: 'number' },
    ];

    // Calculate cosine similarity (Placeholder logic)
    const calculateCosineSimilarity = () => {
      const adopterVector = [
        parseFloat(form.value.preferred_size),
        parseFloat(form.value.preferred_energy_level),
        form.value.has_children === "true" ? 1 : 0,
        form.value.has_other_pets === "true" ? 1 : 0,
        parseFloat(form.value.home_space),
      ];

      const dogVector = [4, 3, 1, 1, 80]; // Example dog attributes

      const dotProduct = adopterVector.reduce((sum, val, i) => sum + val * dogVector[i], 0);
      const adopterMagnitude = Math.sqrt(adopterVector.reduce((sum, val) => sum + val * val, 0));
      const dogMagnitude = Math.sqrt(dogVector.reduce((sum, val) => sum + val * val, 0));

      const similarity = dotProduct / (adopterMagnitude * dogMagnitude);
      console.log("Cosine Similarity Score:", similarity);
      return similarity;
    };

    // Submit the application
    const submitApplication = async () => {
      try {
        const response = await axios.post("/api/adopters", form.value);
        console.log("Application submitted:", response.data);
        
        // Perform cosine similarity calculation
        calculateCosineSimilarity();

        submitted.value = true;
      } catch (error) {
        console.error("Error submitting application:", error);
      }
    };

    const getLabel = (key) => {
      const field = adopterFields.find(f => f.id === key);
      return field ? field.label : key;
    };

    return { form, adopterFields, submitted, submitApplication, getLabel };
  }
};
</script>
