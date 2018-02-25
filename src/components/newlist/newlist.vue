<template>
	<div class="newlist">
		<h2 class="list-title">
			<p>新歌推荐 ></p>
		</h2>
		<div>
			<ul class="list-detail">
				<li v-for='(song,index) in newsong' @click='playlist(song,index)' class='detail-item'>
					<div class="song-name">
						{{song.name}}
					</div>
					<div class="song-singer">
						{{song.singer}}-{{song.name}}
					</div>
				</li>
			</ul>
		</div>
		<!-- <player ref='song' :song='songPlaying' v-if='loadPlayer'></player> -->
	</div>
</template>
<script type="text/javascript">

	//import player from '../player/player'
	

	export default{
		props: {
			newsong: {}
		},
		data(){
			return {
				songPlaying: {},
				loadPlayer: false
			}
		},
		created(){
			// console.log(this.newsong);
		},
		methods: {
			//点击歌曲列表播放当前歌曲并加载播放组件
			playlist(song,index){
				this.$emit( 'getlist',song,index );
			}
		}
		// components: {
		// 	'player': player
		// }
	}
</script>
<style type="text/css" lang='stylus'>
	.newlist
		padding: 0.2rem 0;
	.list-title
		font-size: 0.28rem
		line-height: 0.36rem
		margin: 0.12rem 0
		border-left: 0.05rem solid #fff
		p
			text-align: left
			padding-left: 0.1rem
	.list-detail
		width: 100%
		padding: 0 0.2rem
		box-sizing: border-box
		.detail-item
			border-bottom: 0.01rem solid #333
			width: 100%
			padding: 0.12rem 0
			text-align: left
		.song-name
			font-size: 0.34rem
			line-height: 0.5rem
			over-flow: hidden
			text-overflow: ellipsis
			white-space: no-wrap
		.song-singer
			font-size: 0.24rem
			line-height: 0.36rem
			color: #aaa	
</style>