<template>
  <div class="slide_line" ref="slide_line" :class="{moving:mousedown}">

  </div>
</template>
<script>
export default {
  props:{
    parentId:{
      type:String
    }
  },
  data () {
    return {
      mousedown:false,
      offsetX:0,
      lastPoint:undefined,
      currentWidth:undefined
    }
  },
  watch:{
  },
  methods:{
  },
  mounted(){
    let parent = document.getElementById(this.parentId)
    this.$refs.slide_line.addEventListener('mousedown',(e)=>{
      // console.log(e,t)
      this.mousedown = true;
      this.offsetX = 0
      this.currentWidth = parent.offsetWidth
    })
    
    document.body.addEventListener('mousemove',(point)=>{
      if(this.mousedown){
        // console.log(point.movementX)
        this.offsetX += point.movementX
        // this.$emit('offsetX',this.offsetX)
        let newWidth = this.currentWidth + this.offsetX
        parent.style.width = newWidth + "px"
        
      }
    })
    document.body.addEventListener('mouseup',(point)=>{
      this.mousedown = false
      // this.currentWidth = newWidth
    })
  }
}
</script>
<style scoped>
.slide_line{
  position: absolute;
  right: 0;
  height: 100%;
  width: 5px;
  background-color: white;
  opacity: 0.1;
  top:0;
}
.slide_line:hover{
  cursor: col-resize;
  background-color: #FF9800;
  opacity: 1;
}
.moving{
  cursor: col-resize;
  background-color: #FF9800;
  opacity: 1;
}
</style>