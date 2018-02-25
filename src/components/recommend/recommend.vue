<template>
	<div class='recommendPage'>
		<slider :slider='recom.slider'></slider>
		<songlist :songlist='recom.songList'></songlist>
		<newlist :newsong='newsong.songlist' @getlist='play'></newlist>
	</div>
</template>

<script type="text/javascript">
	//import sliderData from '../data/sliderData.json'
	import axios from 'axios'
	import slider from '../slider/slider'
	import songlist from '../songlist/songlist'
	import newlist from '../newlist/newlist'
	import {mapActions} from 'vuex'

	export default{
		data(){
			return {
				recom: {},
				newsong: {
					default: {},
					type: Object
				}
			}
		},
		created: function(){
			//获取源数据，推荐相关数据、新歌数据
			axios.get( 'data/sliderData.json' ).then( (res)=>{
				this.recom = res.data.data

			} );
			axios.get( 'data/newsong.json' ).then( (res)=>{
				this.newsong = res.data.data;
			} )
		},
		methods: {
			//点击列表之后，获取到列表歌曲，并设置store的state控制player组件
			play( song,index ){
				this.getlist( {
					list: this.newsong.songlist,
					index
				} )
			},
			...mapActions( [
				'getlist'
			] )
		},
		components: {
			'slider': slider,
			'songlist': songlist,
			'newlist': newlist
		}
	}
</script>
<style type="text/css" lang='stylus'>
	.recommendPage
		margin-top: 2.19rem
</style>