<template>
  <div class="bigScreen">
    <div class="header">热立场区域分布</div>
    <div class="main">
      <div class="left">

      </div>
      <div class="right">
        <div class="cityEvent">
          <div>
            <button class=" wirelessTemp"
                v-for="button in data.buttons"
                :key="button.name"
                :style="{ backgroundColor: button.color,color:button.characters  }"
                @click="selectButton(button)">
              <div class="btnLogic">{{ button.name }}</div>
            </button>
            <button class="wirelessTempReset" @click="resetTemp">
              <div class="btnLogic">重置</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue'
import eventHub from "../until/eventHub";

const toggleWirelessTemp = ref(true)
const toggleWiredTemp = ref(true)
const toggleOtherTemp = ref(true)

const data = reactive({
  selectedButton: '',
  buttons: [
    { name: '无线温度计', color: 'blue' , characters:'white'},
    { name: '有线温度计', color: 'blue' , characters:'white'},
    { name: '其他设备', color: 'blue' , characters:'white'}
  ]
})

const  selectButton=(selected)=> {
  data.buttons.forEach(button => {
    if (button.name === selected.name) {
      button.color = 'white';
      button.characters = '#000000';
    } else {
      button.color = 'blue';
      button.characters = 'white';
    }
  });
  data.selectedButton = selected.name;

  // 根据选中的按钮执行对应的函数
  if (selected.name === '无线温度计') {
    wirelessFunction();
  } else if (selected.name === '有线温度计') {
    wiredFunction();
  } else if (selected.name === '其他设备') {
    otherFunction();
  }
}

const wirelessFunction=()=> {
  eventHub.emit("toggleWireless")
  eventHub.emit("closeToggleWired")
  eventHub.emit("closeToggleOther")
}
const wiredFunction=()=> {
  eventHub.emit("toggleWired")
  eventHub.emit("closeToggleWireless")
  eventHub.emit("closeToggleOther")
}
const otherFunction=()=> {
  eventHub.emit("toggleOther")
  eventHub.emit("closeToggleWireless")
  eventHub.emit("closeToggleWired")
}
const resetTemp = ()=>{
  data.buttons.forEach(button => {
      button.color = 'blue';
      button.characters = 'white';
  });
  eventHub.emit("resetTemp")
}



</script>

<style scoped>
.bigScreen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
}

.header {
  width: 19.2rem;
  height: 1rem;
  background-image: url(../assets/bg/title.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: rgb(226, 226, 255);
  font-size: 0.4rem;
}

.main {
  flex: 1;
  width: 19.2rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.left {
  width: 4rem;
  background-color: rgba(255, 255, 255, 0.1);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0;
}

.right {
  width: 4rem;
  background-color: rgba(255, 255, 255, 0.1);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0;

}

.cityEvent {
  position: relative;
  width: 3.5rem;
  margin-bottom: 0.5rem;
  background-repeat: repeat;
  pointer-events: auto;
}

/*.btn{*/
/*  width: 1.5rem;*/
/*  height: auto;*/
/*  margin: 0.5rem auto;*/
/*  text-align: center;*/
/*  font-size: 0.12rem;*/
/*  border-radius: 0.1rem;*/
/*}*/
.btnLogic{
  padding: 0.12rem 0;
}

.wirelessTemp {
  color: black;
  /*background-color: blue;*/
  cursor: pointer;
  width: 1.5rem;
  height: auto;
  margin: 0.2rem 1rem;
  text-align: center;
  font-size: 0.12rem;
  border-radius: 0.02rem;
  border: none;
}
.wirelessTempReset{
  color: white;
  background-color: blue;
  cursor: pointer;
  width: 1.5rem;
  height: auto;
  margin: 0.2rem 1rem;
  text-align: center;
  font-size: 0.12rem;
  border-radius: 0.02rem;
  border: none;
}
.wirelessTempReset:active{
  color: black;
  background-color: white;
  cursor: pointer;
  width: 1.5rem;
  height: auto;
  margin: 0.2rem 1rem;
  text-align: center;
  font-size: 0.12rem;
  border-radius: 0.02rem;
  border: none;
}
.wiredTemp{
  color: white;
  background-color: blue;
  cursor: pointer;
  width: 1.5rem;
  height: auto;
  margin: 0.5rem auto;
  text-align: center;
  font-size: 0.12rem;
  border-radius: 0.1rem;
}
.otherTemp{
  color: white;
  background-color: blue;
  cursor: pointer;
  width: 1.5rem;
  height: auto;
  margin: 0.5rem auto;
  text-align: center;
  font-size: 0.12rem;
  border-radius: 0.1rem;
}

.selected {
  color: black;
  background-color: white;
}


</style>
