<template>
  <div>
    <img draggable="false" src="../assets/candy.png" />
  </div>
</template>

<script>
export default {
  name: "Candy",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

img {
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: transparent;
  width: 150px;
  animation: rotation 1.5s infinite linear;
}

@keyframes rotation {
  0% {
    transform: rotate(-60deg);
  }
  50% {
    transform: rotate(-35deg);
  }
  100% {
    transform: rotate(-60deg);
  }
}
</style>
