<template>
  <div class="verify-email">
    <h1>Email Verification</h1>
    <p v-if="loading">Verifying your email, please wait...</p>
    <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      message: "",
      isSuccess: false,
    };
  },
  async created() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const token = urlParams.get("token");

    if (!email || !token) {
      this.message = "Invalid verification link.";
      this.isSuccess = false;
      this.loading = false;
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/verify-email", {
        params: { email, token },
      });
      this.message = response.data.message;
      this.isSuccess = true;
    } catch (error) {
      this.message =
        error.response?.data?.error || "Failed to verify email. Please try again.";
      this.isSuccess = false;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.verify-email {
  text-align: center;
  margin-top: 50px;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>
