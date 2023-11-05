<template>
  <section id="skills-tools" class="mx-auto my-2 flex-wrap justify-around gap-20">
    <div class="skills">
      <ImageAsset fileName="icons/html5.svg" alt="HTML5" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/css3.svg" alt="CSS3" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/sass.svg" alt="SASS / SCSS" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/javascript.svg" alt="JavaScript" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/vue.svg" alt="Vue.js" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/php.svg" alt="PHP" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/java.svg" alt="Java" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/spring.svg" alt="Spring" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/python.svg" alt="Python" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/bash.svg" alt="bash" :width="iconSize" :height="iconSize" />
    </div>
    <div class="tools">
      <ImageAsset fileName="icons/jetbrains.svg" alt="JetBrains" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/vscode.svg" alt="Visual Studio Code" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/git.svg" alt="git" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/tailwind.svg" alt="TailwindCSS" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/mysql.svg" alt="MySQL" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/docker.svg" alt="Docker" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/figma.svg" alt="Figma" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/illustrator.svg" alt="Adobe Illustrator" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/photoshop.svg" alt="Adobe Photoshop" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/canva.svg" alt="Canva" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/github.svg" alt="GitHub" :width="iconSize" :height="iconSize" />
      <ImageAsset fileName="icons/filezilla.svg" alt="FileZilla" :width="iconSize" :height="iconSize" />
    </div>
  </section>
</template>

<script setup>
import gsap from "gsap";
import ImageAsset from "@/components/ImageAsset.vue";
import { nextTick, onMounted } from "vue";

const iconSize = 48,
  iconGapSize = 6;

const alignImageAssetsInLetterForm = (iconsContainer, letterArray) => {
  const skillsToolsTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: "#skills-tools",
      start: "top center"
    },
    defaults: {
      duration: 0.5,
      ease: "power2.out"
    }
  });

  const iconNodes = iconsContainer.getElementsByTagName("IMG");

  const maxColumn = letterArray[0].length,
    maxRow = letterArray.length,
    letterImageAssetCapacity = letterArray
      .map((line) => line.split("").filter((c) => c === "1").length)
      .reduce((length1, length2) => length1 + length2, 0);
  let column = 0,
    row = 0;

  for (let i = 0; i < letterImageAssetCapacity; i++) {
    const icon = iconNodes[i];

    if (column === maxColumn) {
      row++;
      column = 0;

      if (row === maxRow) break;
    }

    while (letterArray[row].charAt(column) !== "1") {
      column++;

      if (column === maxColumn) {
        row++;
        column = 0;

        if (row === maxRow) break;
      }
    }

    if (row === maxRow) break;

    const left = column * iconSize + (column > 0 ? column * iconGapSize : 0);
    const top = row * iconSize + (row > 0 ? row * iconGapSize : 0);

    icon.style.position = "absolute";
    icon.style.top = top + "px";
    icon.style.left = left + "px";

    skillsToolsTimeLine.from(icon, { opacity: 0 }, "<20%");

    column++;
  }

  if (letterImageAssetCapacity < iconNodes.length) {
    row += 1.5;
    column = 0;

    for (let i = letterImageAssetCapacity; i < iconNodes.length; i++) {
      const icon = iconNodes[i];
      const left = column * iconSize + (column > 0 ? column * iconGapSize : 0);
      const top = row * iconSize + (row > 0 ? row * iconGapSize : 0);

      icon.style.position = "absolute";
      icon.style.top = top + "px";
      icon.style.left = left + "px";

      skillsToolsTimeLine.from(icon, { opacity: 0 }, "<20%");

      column++;

      if (column === maxColumn) {
        row++;
        column = 0;

        if (row === maxRow) break;
      }
    }
  }

  iconsContainer.style.width = maxColumn * iconSize + (maxColumn - 1) * iconGapSize + "px";
  iconsContainer.style.height = (row + 1) * iconSize + row * iconGapSize + "px";
};

onMounted(async () => {
  await nextTick();

  alignImageAssetsInLetterForm(document.querySelector(".skills"), ["1111", "   1", "   1", "1  1", " 11 "]);
  alignImageAssetsInLetterForm(document.querySelector(".tools"), [" 111", "1   ", "1 11", "1  1", " 111"]);
});
</script>

<style lang="scss" scoped>
#skills-tools > div {
  @apply relative inline-block text-center;

  img {
    @apply rounded-xl bg-primary-800 p-2;
  }
}
</style>
