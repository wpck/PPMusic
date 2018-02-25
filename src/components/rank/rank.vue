<template>
	<div class='rank'>
		<div>
			<a v-for='item in rank' class='rankItem' @click='showList(item)'>
				<div class='item-img'>
					<img :src="item.coverImgUrl">
				</div>
				<div class='item-name'>
					{{item.name}}
				</div>
			</a>
		</div>
		<!-- <keep-alive>
			<router-view></router-view>
		</keep-alive> -->
		<songs v-if="showlist" :song='selSong' @back='hideSongs()'></songs>
	</div>
</template>

<script type="text/javascript">

	import axios from "axios"
	import songs from '../songs/songs'

	export default{
		data(){
			return {
				"rank": {
					default: {},
					type: Object
				},
				'showlist': false,
				'selSong': {}
			}
		},
		created(){
			axios.get( 'data/rank.json' ).then( (res)=>{
				this.rank = res.data.toplist;
				console.log(this.rank);
			} )
		},
		methods: {
			//显示歌单详情页面，songs组件
			showList(list){
				this.selSong = list;
				this.showlist = true;
				console.log(list)
			},//隐藏歌单详情页面，songs组件
			hideSongs(){
				this.showlist = false;
			}
		},
		components: {
			'songs': songs
		}
	}
</script>

<style type="text/css" lang='stylus'>
	.rank
		width: 100%
		padding: 0 0.28rem
		margin-top: 2.19rem
		box-sizing: border-box
	.rankItem
		display: flex
		padding: 0.28rem 0
		border-bottom: 0.01rem solid #aaa
		.item-img
			flex: 0 0 2rem
			height: 2rem
			img
				width: 2rem
				height: 2rem
				border-width: 0
		.item-name
			margin-left: 0.36rem
			line-height: 2rem
			font-size: 0.4rem
	a
		text-decoration: none
		color: #fff
</style>