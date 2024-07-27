<template>
  <div>
    <div class="flex min-h-[calc(var(--vh,1vh)*100)] flex-col pb-8">
      <PageHeader />
      <slot />
    </div>
    <PageFooter />
  </div>
</template>
