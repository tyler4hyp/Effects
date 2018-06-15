<template>
  <div class="drag-box">
      <div class="drag-item" draggable="true"
          v-for="item in list"
          :key="item.id"
          @dragstart="dragstartEvent($event, item.id)"
          @dragend="dragendEvent"
          @dragenter="dragenterEvent($event, item.id)">
          {{item.title}}
      </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                startY: '',
                startID: '',
                list: [
                    {id: 1, title: 'a'},
                    {id: 2, title: 'aa'},
                    {id: 3, title: 'aaa'},
                    {id: 4, title: 'aaaa'},
                    {id: 5, title: 'aaaaa'},
                    {id: 6, title: 'aaaaaa'},
                    {id: 7, title: 'aaaaaaa'}
                ]
            }
        },
        methods: {
            dragstartEvent(ev, id) {
                this.startY = ev.clientY;
                this.startID = id;
                ev.target.style.backgroundColor = '#f8f8f8';
            },
            dragendEvent(ev) {
                ev.target.style.backgroundColor = '#fff';
            },
            dragenterEvent(ev, id) {
                const startIndex = this.getIndexById(this.startID);
                if(this.startID !== id){
                  if(ev.clientY - this.startY > 0){
                    this.list.splice(startIndex, 2, this.list[startIndex + 1], this.list[startIndex]);
                  }else{
                    this.list.splice(startIndex - 1, 2, this.list[startIndex], this.list[startIndex - 1]);
                  }
                }
                this.startY = ev.clientY;
                console.log(this.list);
            },
            getIndexById(id){
              for(let i=0; i<this.list.length; i++){
                if(this.list[i].id === id){
                  return i
                }
              }
            }
        }
    }
</script>

<style scoped>
    .drag-box{
        width: 45%;
    }
    .drag-item{
        border: 1px solid #ddd;
        padding:10px;
        margin-bottom: 20px;
    }
</style>