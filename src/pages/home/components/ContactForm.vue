<template>
  <CustomForm title="Contact" submitText="Send" action="/backend/send_message" method="POST" id="contact-form" class="mx-auto mb-16">
    <CustomInput title="Name" type="full_name" name="name" required />
    <CustomInput title="E-Mail" type="email" name="email" required />
    <CustomInput title="Subject" type="text" name="subject" required />
    <CustomInput title="Message" type="textarea" name="message" :minLength="25" />
  </CustomForm>
</template>

<script setup>
import CustomForm from "@/components/CustomForm.vue";
import CustomInput from "@/components/CustomInput.vue";
import gsap from "gsap";
import { nextTick, onMounted } from "vue";

onMounted(async () => {
  await nextTick();

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#contact-form",
        start: "top center"
      },
      defaults: {
        duration: 2.5,
        ease: "power2.out"
      }
    })
    .from("#contact-form", { y: -25, opacity: 0 });
});
</script>
