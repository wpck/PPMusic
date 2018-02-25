<template>
	<div class='slider-wrap'>
		<div class="m-slider">
			<div class='slider-pic'>
				<a :href='slider[0].linkUrl'>
					<img :src='slider[0].picUrl'>
				</a>
			</div>
			<transition-group name='slider' tag='ul'>
				<li v-for='(slider,index) in slider' v-show='index===currentIndex' :key='index' class='slider-pic'>
					<a :href='slider.linkUrl'>
						<img :src='slider.picUrl'>
					</a>
				</li>
			</transition-group>
		</div>
		<div class="slider-dot">
			<span v-for='(slider,index) in slider' :class="{active:index===currentIndex}"></span>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props: {
			slider: {
			}
		},
		data(){
			return {
				currentIndex: 0,
				timer: null
			}
		},
		created(){
			this.$nextTick( function(){
				this.timer = setInterval( this.autoPlay,5000 )
			} )
		},
		methods:{
			autoPlay(){
				if( this.currentIndex == 4 ){
					this.currentIndex = 0;
				}else{
					this.currentIndex++;
				}
			}
		}
	}
</script>
<style type="text/css" lang='stylus'>
	.slider-wrap
		position: relative
		width: 100%
		overflow: hidden
		.m-slider
			position: relative
			height: 3rem
		.slider-pic
			position: absolute
			top: 0
			left: 0
			img,a
				display: inline-block
				width: 100%
				height: 3rem
	.slider-enter-active
		transition: all 0.5s linear
		transform: translateX(0)
	.slider-leave-active
		transition: all 0.5s linear
		transform: translateX(-100%)
	.slider-enter
		transform: translateX(100%)
	.slider-leave
		transform: translateX(0)		
	.slider-dot
		position: absolute
		bottom: 0.06rem
		width: 100%;
		text-align: center
		span
			display: inline-block
			width: 0.12rem
			height: 0.08rem
			border-radius: 20%
			background: #aaa
			margin: 0 0.1rem
		.active
			background: #fff
			width: 0.20rem
</style>