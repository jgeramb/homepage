<template>
  <PopUp v-if="isMessageSentSet" @close="dismissMessage">
    <div class="message-container">
      <span class="message-icon material-symbols-rounded text-accent">check</span>
      <p>Your message was sent successfully!</p>
    </div>
  </PopUp>

  <PopUp v-if="isSendErrorSet" @close="dismissMessage">
    <div class="message-container">
      <span class="message-icon material-symbols-rounded text-error">error</span>
      <p>
        Your message could not be delivered:<br />
        <span class="text-sm text-primary-400">{{ sendErrorText }}</span>
      </p>
    </div>
  </PopUp>

  <Hero>
    <div class="hero-wallpaper absolute top-0 -z-20 h-full w-full bg-cover bg-center"></div>
    <div class="flex flex-col items-center">
      <ImageAsset
        class="rounded-full object-cover"
        fileName="portrait.webp"
        alt="Justus G."
        :width="142"
        :height="142"
        eager
      />
      <h1 class="mt-5">Justus G.</h1>
      <p class="text-md mt-2.5 text-center font-title uppercase tracking-widest text-primary-300">
        Fix the cause,<br />not the symptom
      </p>
      <span
        id="down-arrow"
        class="material-symbols-rounded mt-5 flex cursor-pointer items-center rounded-full bg-primary-700 p-1.5 transition-colors duration-500 hover:bg-primary-800"
        style="font-size: 24px"
        @click="scrollDown()"
      >
        expand_more
      </span>
    </div>
  </Hero>

  <section id="skills-tools" class="flex-wrap justify-around gap-20" style="margin: 8rem auto">
    <div class="skills">
      <!-- HTML5 -->
      <ImageAsset fileName="icons/html5.svg" alt="HTML5" :width="this.iconSize" :height="this.iconSize" />

      <!-- CSS3 -->
      <ImageAsset fileName="icons/css3.svg" alt="CSS3" :width="this.iconSize" :height="this.iconSize" />

      <!-- SASS/SCSS -->
      <ImageAsset fileName="icons/sass.svg" alt="SASS / SCSS" :width="this.iconSize" :height="this.iconSize" />

      <!-- JavaScript -->
      <ImageAsset fileName="icons/javascript.svg" alt="JavaScript" :width="this.iconSize" :height="this.iconSize" />

      <!-- Vue.js -->
      <ImageAsset fileName="icons/vue.svg" alt="Vue.js" :width="this.iconSize" :height="this.iconSize" />

      <!-- PHP -->
      <ImageAsset fileName="icons/php.svg" alt="PHP" :width="this.iconSize" :height="this.iconSize" />

      <!-- Java -->
      <ImageAsset fileName="icons/java.svg" alt="Java" :width="this.iconSize" :height="this.iconSize" />

      <!-- Spring -->
      <ImageAsset fileName="icons/spring.svg" alt="Spring" :width="this.iconSize" :height="this.iconSize" />

      <!-- Python -->
      <ImageAsset fileName="icons/python.svg" alt="Python" :width="this.iconSize" :height="this.iconSize" />

      <!-- bash -->
      <ImageAsset fileName="icons/bash.svg" alt="bash" :width="this.iconSize" :height="this.iconSize" />
    </div>

    <div class="tools">
      <!-- JetBrains -->
      <ImageAsset fileName="icons/jetbrains.svg" alt="JetBrains" :width="this.iconSize" :height="this.iconSize" />

      <!-- VSCode -->
      <ImageAsset fileName="icons/vscode.svg" alt="Visual Studio Code" :width="this.iconSize" :height="this.iconSize" />

      <!-- git -->
      <ImageAsset fileName="icons/git.svg" alt="git" :width="this.iconSize" :height="this.iconSize" />

      <!-- TailwindCSS -->
      <ImageAsset fileName="icons/tailwind.svg" alt="TailwindCSS" :width="this.iconSize" :height="this.iconSize" />

      <!-- MySQL -->
      <ImageAsset fileName="icons/mysql.svg" alt="MySQL" :width="this.iconSize" :height="this.iconSize" />

      <!-- Docker -->
      <ImageAsset fileName="icons/docker.svg" alt="Docker" :width="this.iconSize" :height="this.iconSize" />

      <!-- Figma -->
      <ImageAsset fileName="icons/figma.svg" alt="Figma" :width="this.iconSize" :height="this.iconSize" />

      <!-- Illustrator -->
      <ImageAsset
        fileName="icons/illustrator.svg"
        alt="Adobe Illustrator"
        :width="this.iconSize"
        :height="this.iconSize"
      />

      <!-- Photoshop -->
      <ImageAsset fileName="icons/photoshop.svg" alt="Adobe Photoshop" :width="this.iconSize" :height="this.iconSize" />

      <!-- Canva -->
      <ImageAsset fileName="icons/canva.svg" alt="Canva" :width="this.iconSize" :height="this.iconSize" />

      <!-- GitHub -->
      <ImageAsset fileName="icons/github.svg" alt="GitHub" :width="this.iconSize" :height="this.iconSize" />

      <!-- FileZilla -->
      <ImageAsset fileName="icons/filezilla.svg" alt="FileZilla" :width="this.iconSize" :height="this.iconSize" />
    </div>
  </section>

  <section id="projects">
    <h2>Projects</h2>
    <div class="projects-items relative mt-4 w-full overflow-x-hidden px-4">
      <div class="controls absolute left-0 flex h-full w-full items-center justify-between">
        <span class="previous material-symbols-rounded" @click="previousProject()">chevron_left</span>
        <span class="next material-symbols-rounded" @click="nextProject()">chevron_right</span>
      </div>
      <div class="content flex translate-x-0 gap-4 transition duration-500">
        <div class="projects-item">
          <div class="projects-item-header">
            <ImageAsset
              class="projects-item-image"
              fileName="projects/eazynick.webp"
              alt="EazyNick"
              :width="this.projectImageSize"
              :height="this.projectImageSize"
            />
            <h3 class="projects-item-title">EazyNick</h3>
            <a
              class="projects-item-link material-symbols-rounded"
              href="https://github.com/JustixDevelopment/EazyNick"
              target="_blank"
            >
              link
            </a>
          </div>
          <p class="projects-item-description">
            A Minecraft Spigot disguise plugin for 1.7.10 to 1.19.4 that changes your name in the chat and tablist and
            above your head. In addition to that it changes your skin and on some versions also the UUID.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section id="career">
    <h2>Career</h2>
    <div class="career-items mx-auto mt-4 flex flex-col">
      <div class="career-item">
        <div class="career-item-details">
          <span class="career-item-time">
            2022
            <span class="material-symbols-rounded">horizontal_rule</span>
            present
          </span>
          <h3 class="career-item-title">duschdichtungsprofile.de</h3>
          <p class="career-item-description">Software engineer</p>
        </div>
      </div>
      <div class="career-item">
        <div class="career-item-details">
          <span class="career-item-time">2022</span>
          <h3 class="career-item-title">Digital Masters</h3>
          <p class="career-item-description">Internship</p>
        </div>
      </div>
      <div class="career-item">
        <div class="career-item-details">
          <span class="career-item-time">2021</span>
          <h3 class="career-item-title">CoreMedia</h3>
          <p class="career-item-description">Internship</p>
        </div>
      </div>
    </div>
  </section>

  <CForm title="Contact" submitText="Send" action="/contact.php" method="POST" id="contact-form" class="mx-auto mb-16">
    <CInput title="Name" type="full_name" name="name" required />
    <CInput title="E-Mail" type="email" name="email" required />
    <CInput title="Subject" type="text" name="subject" required />
    <CInput title="Message" type="textarea" name="message" :minLength="25" />
  </CForm>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import PopUp from '@/components/PopUp.vue';
import Hero from '@/components/Hero.vue';
import ImageAsset from '@/components/ImageAsset.vue';
import CForm from '@/components/CForm.vue';
import CInput from '@/components/CInput.vue';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default {
  components: {
    PopUp,
    Hero,
    ImageAsset,
    CForm,
    CInput
  },
  data() {
    return {
      iconSize: 48,
      projectImageSize: 36,
      iconGapSize: 6,
      currentProject: 0
    };
  },
  methods: {
    isElementInView(element) {
      const { top, bottom } = element.getBoundingClientRect();

      return top <= window.innerHeight && bottom >= 0;
    },
    alignImageAssetsInLetterForm(iconsContainer, letterArray) {
      const skillsToolsTimeLine = gsap.timeline({
        scrollTrigger: {
          trigger: '#skills-tools',
          start: 'top center'
        },
        defaults: {
          duration: 0.5,
          ease: 'power2.out'
        }
      });

      const iconNodes = iconsContainer.getElementsByTagName('IMG');

      const maxColumn = letterArray[0].length,
        maxRow = letterArray.length,
        letterImageAssetCapacity = letterArray
          .map((line) => line.split('').filter((c) => c === '1').length)
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

        while (letterArray[row].charAt(column) !== '1') {
          column++;

          if (column === maxColumn) {
            row++;
            column = 0;

            if (row === maxRow) break;
          }
        }

        if (row === maxRow) break;

        const left = column * this.iconSize + (column > 0 ? column * this.iconGapSize : 0);
        const top = row * this.iconSize + (row > 0 ? row * this.iconGapSize : 0);

        icon.style.position = 'absolute';
        icon.style.top = top + 'px';
        icon.style.left = left + 'px';

        skillsToolsTimeLine.from(icon, { opacity: 0 }, '<20%');

        column++;
      }

      if (letterImageAssetCapacity < iconNodes.length) {
        row += 1.5;
        column = 0;

        for (let i = letterImageAssetCapacity; i < iconNodes.length; i++) {
          const icon = iconNodes[i];
          const left = column * this.iconSize + (column > 0 ? column * this.iconGapSize : 0);
          const top = row * this.iconSize + (row > 0 ? row * this.iconGapSize : 0);

          icon.style.position = 'absolute';
          icon.style.top = top + 'px';
          icon.style.left = left + 'px';

          skillsToolsTimeLine.from(icon, { opacity: 0 }, '<20%');

          column++;

          if (column === maxColumn) {
            row++;
            column = 0;

            if (row === maxRow) break;
          }
        }
      }

      iconsContainer.style.width = maxColumn * this.iconSize + (maxColumn - 1) * this.iconGapSize + 'px';
      iconsContainer.style.height = (row + 1) * this.iconSize + row * this.iconGapSize + 'px';
    },
    scrollDown() {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: '#skills-tools', offsetY: 50 },
        onComplete: () => {
          window.history.replaceState(null, document.title, '/#skills-tools');
        }
      });
    },
    previousProject() {
      if (this.currentProject > 0) {
        this.currentProject--;

        this.updateProject();
      }
    },
    nextProject() {
      if (
        this.currentProject <
        document.querySelectorAll('.projects-item').length - (window.innerWidth >= 640 ? 3 : 1)
      ) {
        this.currentProject++;

        this.updateProject();
      }
    },
    updateProject() {
      // controls
      document.querySelector('.projects-items .controls .previous').style.opacity = this.currentProject > 0 ? 1 : 0;
      document.querySelector('.projects-items .controls .next').style.opacity =
        this.currentProject < document.querySelectorAll('.projects-item').length - (window.innerWidth >= 640 ? 3 : 1)
          ? 1
          : 0;

      // change project item
      const projectsItemContent = document.querySelector('.projects-items .content');
      const firstProjectsItem = document.querySelector('.projects-item');
      projectsItemContent.style.transform =
        'translateX(-' + this.currentProject * (firstProjectsItem.clientWidth + 16) + 'px)';
    },
    dismissMessage() {
      window.location.href = '/';
    }
  },
  computed: {
    isMessageSentSet() {
      return window.location.search.startsWith('?message_sent');
    },
    isSendErrorSet() {
      return window.location.search.startsWith('?send_error=');
    },
    sendErrorText() {
      return decodeURIComponent(window.location.search.split('=')[1].replace(/\+/g, ' '));
    }
  },
  mounted() {
    // down arrow
    gsap.to('#down-arrow', {
      yPercent: 12.5,
      duration: 0.5,
      ease: 'power2.ease',
      repeat: -1,
      yoyo: true
    });

    // skills + tools
    this.alignImageAssetsInLetterForm(document.querySelector('.skills'), ['1111', '   1', '   1', '1  1', ' 11 ']);
    this.alignImageAssetsInLetterForm(document.querySelector('.tools'), [' 111', '1   ', '1 11', '1  1', ' 111']);

    // projects
    const projectsTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: '#projects',
        start: 'top center'
      },
      defaults: {
        duration: 1,
        ease: 'power2.out'
      }
    });
    gsap.utils.toArray('.projects-item').forEach((careerItem) => {
      projectsTimeLine.from(careerItem, { opacity: 0 }, '<25%');
    });

    this.updateProject();

    // career
    const careerTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: '#career',
        start: 'top center'
      },
      defaults: {
        duration: 0.5,
        ease: 'power2.out'
      }
    });
    gsap.utils.toArray('.career-item').forEach((careerItem) => {
      careerTimeLine.from(careerItem.querySelector('.career-item-details'), {
        opacity: 0,
        onStart: () => {
          careerItem.style.animationPlayState = 'running';
        }
      });
    });

    // contact form
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#contact-form',
          start: 'top center'
        },
        defaults: {
          duration: 2.5,
          ease: 'power2.out'
        }
      })
      .from('#contact-form', { y: -25, opacity: 0 });
  }
};
</script>

<style lang="scss" scoped>
section {
  @apply mx-4 my-16 flex max-w-3xl sm:mx-auto;

  h2 {
    @apply text-center;
  }
}

/* messages */

.message-container {
  @apply flex flex-col items-center gap-6 rounded-xl bg-primary-900 p-8 text-center;

  max-width: min(500px, calc(100% - 1rem * 2));

  .message-icon {
    @apply flex items-center justify-center rounded-full bg-primary-950 p-1.5 text-4xl;

    height: 50px;
    width: 50px;
  }

  > p {
    @apply break-all text-xl;
  }
}

/* Hero */

.hero-wallpaper {
  background-image: url('@/assets/binnenalster.webp');

  &::after {
    @apply relative -z-10 block h-full w-full bg-gradient-to-t from-primary-950 via-primary-900 opacity-[0.825];

    content: '';
  }
}

/* skills + tools  */

#skills-tools > div {
  @apply relative inline-block text-center;

  img {
    @apply rounded-xl bg-primary-800 p-2;
  }
}

/* projects */

#projects {
  @apply flex-col;

  .projects-items {
    &::before,
    &::after {
      @apply absolute top-0 z-10 h-full w-6 from-primary-950;

      content: '';
    }

    &::before {
      @apply left-0 bg-gradient-to-r;
    }

    &::after {
      @apply right-0 bg-gradient-to-l;
    }

    .controls > span {
      @apply relative z-20 cursor-pointer rounded-full bg-primary-600 p-1.5 transition-opacity duration-500;
    }

    .content .projects-item {
      @apply mx-auto flex max-w-full flex-shrink-0 flex-col items-center gap-2 rounded-xl bg-primary-900 px-6 py-4 sm:max-w-[calc((100%-2rem)/3)];

      .projects-item-header {
        @apply flex items-center gap-2;

        .projects-item-image {
          @apply rounded-full;
        }

        .projects-item-title {
          @apply text-2xl;
        }

        .projects-item-link {
          @apply text-lg text-primary-300;
        }
      }

      .projects-item-description {
        @apply text-primary-400;
      }
    }
  }
}

/* career */

#career {
  @apply flex-col;

  .career-items {
    .career-item {
      @apply relative flex pl-8;

      animation-play-state: paused;

      &::before {
        @apply absolute h-full max-h-0 animate-[grow-to-b_0.5s_linear] bg-primary-50;

        animation-fill-mode: forwards;
        animation-play-state: inherit;

        content: '';
        left: 4px;
        width: 2px;
      }

      &::after {
        @apply absolute left-0 top-0 animate-[fade-in_0.5s_linear] rounded-full bg-primary-50 opacity-0 sm:top-6;

        animation-fill-mode: forwards;
        animation-play-state: inherit;

        content: '';
        height: 10px;
        width: 10px;
      }

      .career-item-details {
        @apply flex flex-col py-4;

        .career-item-time {
          @apply absolute top-1.5 flex translate-y-[-50%] items-center font-title text-xs uppercase text-primary-300 sm:-left-5 sm:top-7 sm:translate-x-[-100%];
        }

        .career-item-title {
          @apply text-xl;
        }

        .career-item-description {
          @apply text-primary-400;
        }
      }
    }
  }
}
</style>
