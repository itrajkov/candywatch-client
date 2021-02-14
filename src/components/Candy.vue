<template>
  <div>
    <img src="../assets/candy.png" />
  </div>
</template>

<script>
export default {
  name: "Candy",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

img {
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
