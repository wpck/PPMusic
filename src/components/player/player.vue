<template>
<transition name='player'>
	<div class='player' v-show='songlist.length>0'>
		<audio :src='currentsong.url' id='song' autoplay ref='song' @canplay='init()' @timeupdate='getnow()'></audio>
		<!--全屏播放页面-->
		<transition name='fullscreen'>
		<div class="full" v-show='fullscreen' :style='{height:deviceH}'>
			 <div class="player-title">
				<span class='iconfont icon-fold' @touchend.stop.prevent='togglefull'></span>
				<p class='song-name'>{{currentsong.name}}</p>
				<p class='song-singer'>{{currentsong.singer}}</p>
			</div>
			<transition name='playpic'>
				<div class="player-pic" v-show='showPic' @touchend.stop.prevent='showlyric'>
					<img :src="currentsong.picUrl" alt="">
				</div>
			</transition>
			<div class="player-control">
				<div class="process">
					<div class="processing" ref='processing'>
						<div class="process-active" :style='{width:activeWidth}'></div>
						<div class="process-ball" :style='{left:activeLeft}'
							@touchstart.stop.prevent='prostart($event)'
						></div>
					</div>
					<span class='now'>{{formatTime(nowTime)}}</span>
					<span class='total'>{{formatTime(duration)}}</span>
				</div>
				<div class="control">
					<i class='mode iconfont' :class='modeState[mode]' @touchend.stop.prevent='toggleMode()'></i>
					<i class="prev iconfont icon-prev" @touchend.stop.prevent='toprev()'></i>
					<i class="paused iconfont" :class='playState' @touchend.stop.prevent='toggle()'></i>
					<i class="prev iconfont icon-next" @touchend.stop.prevent='tonext()'></i>
					<i class='list iconfont icon-list'></i>
				</div>
			</div> 
			<lyric ref='lyric' :now='nowTime'></lyric>

		</div>
		</transition>

		

		<div class="mini" v-show='!fullscreen' @touchend.stop.prevent='togglefull'> 	<div class="control">
					<i class="prev iconfont icon-prev" @touchend.stop.prevent='toprev()'></i>
					<i class="paused iconfont" :class='playState' @touchend.stop.prevent='toggle()'></i>
					<i class="prev iconfont icon-next" @touchend.stop.prevent='tonext()'></i>
			</div>
		</div>
	</div>
</transition>
</template>

<script type="text/javascript">

	import {mapGetters} from 'vuex'
	import {mapMutations} from 'vuex'
	import lyric from '../lyric/lyric'

	export default{
		props: {
			song: {}
		},
		data(){
			return {
				show: false,
				audio: null,
				duration: '',
				nowTime: '',
				prolength: 0,
				showPic: true,
				deviceH: '',
				playState: 'icon-zanting',
				modeState: ['icon-order','icon-random','icon-repeat']
			}
		},
		created(){
			this.$nextTick( ()=>{
				//获取设备高度
				const iheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				
				this.deviceH = iheight + 'px';
				//获取进度条的总长度
				this.prolength = this.$refs.processing.offsetWidth;
				console.log( this.prolength )

			} )
		},
		computed: {
			//计算进度条高亮部分的宽度
			activeWidth(){
				let scale = ( Number(this.nowTime)/Number(this.duration) );
				let resultW = scale*this.prolength;
				return resultW + 'px';

			},
			//计算进度条终端小球的left值
			activeLeft(){
				let scale = ( Number(this.nowTime)/Number(this.duration) );
				let resultL = scale*this.prolength;
				return resultL-10 + 'px';
			},
			//获取到的mapGetters
			...mapGetters( [
				'fullscreen',
				'pause',
				'songlist',
				'currentsong',
				'currentlyric',
				'mode'
			] )
		},
		methods: {
			//定义显示/隐藏全屏播放页面
			togglefull(){
				this.setFullScreen( !this.fullscreen );
				this.setlyricshow( false );
				
			},//控制播放暂停
			toggle(){
				if( this.$refs.song.paused ){  //获取原生DOM元素
					this.$refs.song.play();
					this.playState = 'icon-zanting';
				}else{
					this.$refs.song.pause();
					this.playState = 'icon-bofang'
				}
			},//切换播放模式：随机，单曲，顺序
			toggleMode(){
				if(this.mode == 2){
					this.setMode( 0 );
				}else{
					this.setMode( this.mode+1 );
				}
				//this.modeTarget = this.mode.order+1;		
			},//切换到下一首或上一首
			tonext(){
				this.setnext();
			},
			toprev(){
				this.setprev();
			},
			//初始化歌曲时间总时间
			init(){ 

				this.duration = this.$refs.song.duration;
				console.log()
				
			},//实时获取播放的当前时间
			getnow(){

				this.nowTime = this.$refs.song.currentTime;

			},
			//拖动进度条processing控制播放进度
			prostart(ev){

				//阻止默认事件，禁止滚动
				const _this = this;
				ev.preventDefault();
				//手指按下时获取到当前位置
				let ox = _this.$refs.processing.offsetLeft;

				document.ontouchmove = function(ev){
					//拖动可以改变进度小球的位置和红色宽度
					let tarx = ev.changedTouches[0].pageX;

					_this.nowTime = _this.fourNum( (tarx-ox)/_this.prolength*_this.duration );
				};

				document.ontouchend = function(ev){
					//手指抬起时设置音频当前播放的时间
					let tarx = ev.changedTouches[0].pageX;
					_this.$refs.song.currentTime = _this.fourNum( (tarx-ox)/_this.prolength*_this.duration );
					//console.log( _this.fourNum((tarx-ox)/_this.prolength*_this.duration ))
					document.ontouchstart = null;
					document.ontouchend = null;
				};
			},
			//从vuex的mutations引入action动作
			...mapMutations( {

				setFullScreen: 'SET_FULL_SCREEN',
				setlyricshow: 'SET_LYRIC_SHOW',
				setMode: 'SET_MODE',
				setnext: 'SET_GONEXT',
				setprev: 'SET_GOPREV'

			} ),
			//显示歌词
			showlyric(lyric){
				// console.log(this.currentsong.lyric)
				this.setlyricshow( true );
				this.$refs.lyric.getLyric();

			},
			showALbum(){

				this.showPic = true;

			},
			//把毫秒时间变成 00:00这种格式
			formatTime( secnum ){

				let min = this.Two( Math.floor( secnum/60 ) );
				let sec = this.Two( Math.floor( secnum%60 ) );
				return `${min}:${sec}`;

			},
			//把时间为单数的前面补0,1=>01
			Two( inum ){

				if( inum<10 ){
					return '0' + inum;
				}else{
					return '' + inum;
				}
			},
			//保留4位小数
			fourNum( num ){

				return String(num).substr( 0,String(num).indexOf('.')+4 );
				
			}
			// test(){
			// 	console.log(this.songlist)
			// }
		},
		components: {
			lyric
		}
	}
</script>

<style type="text/css" lang='stylus'>
	.player
		position: fixed
		top: 0
		left: 0
		z-index: 300
		width: 100%
	.full
		background: #000
		width: 100%
		height: 100%
		position: relative
		.player-title
			position: relative
			padding: 0.2rem 0
			font-size: 0.3rem
			line-height: 0.36rem
			border-bottom: 0.005rem solid #666
			.icon-fold
				display: inline-block
				position: absolute
				left: 0.1rem
				top: 0
				font-size: 0.6rem
				line-height: 1rem
			.song-name
				width:60%
				margin: 0 auto
			.song-singer
				font-size: 0.13rem
				color: #ddd
				padding: 0 0.5rem
		.player-pic
			width: 60%
			border: 0.1rem solid #666
			border-radius: 50%
			margin: auto
			margin-top: 30%
			img
				width: 100%
				border-radius: 50%
		.player-control
			position: absolute
			bottom: 0.6rem
			width: 100%
			.process
				position: relative
				color: #aaa
				font-size: 0.16rem
				.processing
					width: 70%
					height: 0.02rem
					background: #aaa
					margin: 0 auto
					position: relative
				.process-active
					position: absolute
					top: -0.01rem
					height: 0.04rem
					background: red	
				.process-ball
					display: inline-block
					position: absolute
					top:-0.1rem
					left: 0
					background: red
					width: 0.12rem
					height: 0.12rem
					border: 0.08rem solid #aaa
					border-radius: 50%
				.now
					position: absolute
					left: 0.15rem
					top: -0.1rem
				.total
					position: absolute
					right: 0.15rem
					top: -0.1rem
			.control
				position: relative
				display: flex
				width: 100%
				justify-content: space-around
				margin-top: 0.6rem
				span
					display: inline-block
					font-size: 0.36rem
					line-height:0.36rem
		//字体图标的控制
		.iconfont
			font-size: 0.5rem


	.fullscreen-enter-active,.fullscreen-leave-active
		transform: translateY(0)
		transition: all 0.5s linear
	.fullscreen-enter,.fullscreen-leave-to
		transform: translateY(100%)


	.player-enter-active,.player-leave-active
		transform: translateY(0)
		transition: all 0.5s linear
	.player-enter,.player-leave-to
		transform: translateY(100%)
	// .playpic-enter-active,.playpic-leave-active
	// 	transition: all 0.5s linear
	// 	transform: translateX(0)					
	// .playpic-enter,.playpic-leave-to
	// 	transform: translateX(-100%)
	
	//mini播放器样式
	.mini
		position: fixed
		bottom: 0
		z-index: 100
		width:100%
		background: #403a32
		.control 
			padding: 0.2rem 0
			i
				font-size: 0.6rem
				margin: 0 0.2rem
</style>