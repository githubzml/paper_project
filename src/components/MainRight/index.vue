<template>
  <div class="today-recommend">
    <div class="py-container">
      <div class="clock">
        <div class="time">
          <img src="./images/clock.png" />
          <h3>今日推荐</h3>
        </div>
      </div>
      <ul class="recommend">
        <li class="banner">
          <img src="./images/today01.png" />
        </li>
        <li class="banner">
          <img src="./images/today02.png" />
        </li>
        <li class="banner">
          <img src="./images/today03.png" />
        </li>
        <li class="banner">
          <img src="./images/today04.png" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.today-recommend {
  .py-container {
    .clock {
      width: 100%;
      background-color: #5c5251;
      color: #fff;
      font-size: 18px;
      text-align: center;

      .time {
        padding: 30px 0;
      }

      h3 {
        margin: 9px 0;
        font-weight: 700;
        font-size: 18px;
        line-height: 30.06px;
      }
    }

    .recommend {
      height: 165px;
      // background-color: #eaeaea;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .banner {
        padding: 2%;
        width: 45%;

        img {
          width: 100%;
          height: 100%;
          transition: all 400ms;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>