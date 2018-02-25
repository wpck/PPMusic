<template>
<transition name='lyric'>
	<div class="lyric-wrap" @touchend.stop.prevent='hidelyric' v-if='lyricshow'>
		<ul ref='lyric' class='lyric' :style='{top:activeTop}'>
			<li v-for='(line,index) in lyricText' class='line' :class='{active:index==activeLine}'>{{line}}</li>
		</ul>
	</div>
</transition>
</template>
<script type="text/javascript">

import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

	export default{
		props: {
			
			now: ''
		},
		data(){
			return {
				lyricText: [],
				lyricTime: [],
				isShow: false
			}
		},
		created(){
			this.$nextTick( ()=>{
				
			} )
		},
		computed: {
			activeLine(){
				//判断当前播放到哪一行
				for( let i=0;i<this.lyricTime.length;i++ ){
					if( this.now>=this.lyricTime[i]&&this.now<=this.lyricTime[i+1] ){
						return i;
					}
				}
			},
			activeTop(){
				if( this.activeLine>=this.lyricTime.length-4 ){
					return i+'rem';
				}else{
					return -this.activeLine+4+'rem';
				}
			},
			//代理mapgetters
			...mapGetters([
				'currentsong',
				'lyricshow'
			])
		},
		methods: {
			//格式化获取到的歌词
			getLyric(){

				this.lyricText = [];
				this.lyricTime = [];
				let lines = this.currentsong.lyric.split('\n') || [];
				/*匹配歌词时间的正则
				let reT = /\[\d*:\d*\.\d*\]/g;
				*/
				lines.forEach( (item)=>{
					let lyricArr = item.split(']');
					if( lyricArr[1] ){
						//获取到每行歌词的内容
						this.lyricText.push( lyricArr[1] );
						//获取每行歌词的时间
						this.lyricTime.push( this.secTime( lyricArr[0] ) );
					}
				} );

				console.log();
				
			},
			secTime(argu){
				//把‘[00:00.00]’格式的时间转成秒数
				let min = Number( String( argu.match( /\[\d*/ ) ).slice(1) );
				let sec = Number( String( argu.match( /\:\d*\.\d*/ ) ).slice(1) );
				return min*60+sec;
			},
			show(){
				//控制显示歌词页面
				this.isShow = true;
			},
			hidelyric(){
				//隐藏歌词页面
				this.toggleLyric(false)
			},
			...mapMutations( {
				'toggleLyric': 'SET_LYRIC_SHOW'
			} )
		}
	}
</script>

<style type="text/css" lang='stylus'>
	.lyric-wrap
		z-index: 500
		width: 100%
		height: 74%
		position: absolute
		top: 1.5rem
		left: 0
		text-align: center
		box-sizing: border-box
		padding-bottom: 5rem
		overflow: auto
		background: #000
		.lyric
			z-index: 500
			width: 100%
			box-sizing: border-box
			position: absolute
			left: 0
			padding: 0 0.5rem
		.line
			font-size: 0.28rem
			color: #888
			line-height: 1rem
			list-style: none
		.active
			color: #fff;
			font-size: 0.30rem
	.lyric-enter-active,.lyric-leave-active
		transform: translateX(0)
		transition: all 0.5s linear
	.lyric-enter,.lyric-leave-to
		transform: translateX(100%)
	
		
</style>