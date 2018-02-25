<template>
	<div class="songs-page">
		<div class="head">
			<div class="head-title">
				<div class="bgblur" :style='{backgroundImage:`url(${song.coverImgUrl}`}'></div>
				<div class="title-wrap">
					<div class="title-pic">
						<img :src="song.coverImgUrl">
					</div>
					<div class="title-name">
						<p class='name'>{{song.name}}</p>
						<p class='pro'>PPMusic-PP音乐</p>
					</div>
				</div>
			</div>
			<div class="head-info">
				简介：{{song.description}}
			</div>
		</div>
		<div class="detail">
			<div class="detail-title">歌曲列表</div>
			<ul>
				<li v-for='(item,index) in song.lists' class='detail-cont'>
					<div class="index">{{index+1}}</div>
					<div class='item' @touchend.stop.prevent='play(item,index)'>
						<div class='name'>{{item.name}}</div>
						<div class="info">{{item.singer}}-{{item.name}}</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="back" @click='back()'>
			<span>＜</span>
		</div>
	</div>
</template>

<script type="text/javascript">

import {mapActions} from 'vuex'

	export default{
		props: {
			'song': {}
		},
		created(){
			//console.log(this.$router)
		},
		methods: {
			back(){
				this.$emit('back');
			},
			play(song,index){
				this.getlist( {
					list: this.song.lists,
					index
				} )
			},
			...mapActions( [
				'getlist'
			] )
		}
	}
</script>

<style type="text/css" lang='stylus'>
	div
		box-sizing: border-box
	.songs-page
		position: absolute
		top: 0
		left: 0
		z-index: 100
		width: 100%
		min-height: 100%
		text-align: left
		background: #000
		.head-title
			background: #999
			.bgblur
				z-index: 0
				width: 100%
				height: 3.78rem
				position:absolute
				top: 0
				left: 0
				background-size: cover
				opacity: 0.5
		.title-wrap
			width: 100%
			display: flex
			padding: 0.6rem 0.2rem 0.6rem 0.3rem
			.title-pic
				z-index: 10
				flex: 0 0 2.52rem
				margin-right: 0.32rem
				img
					width: 2.52rem
					height: 2.52rem
					box-shadow: 0 0 0 0.02rem #fff
			.title-name
				z-index: 10
				flex: 1
				.name
					font-size: 0.34rem
					line-height: 0.88rem
					font-weight: 700
				.pro
					margin-top: 0.4rem
					font-size: 0.3rem
					color: #eee
		.head-info
			padding: 0.2rem 0.2rem 0.36rem 0.3rem
			font-size: 0.3rem
			line-height: 0.38rem	
			color: #ccc	
		
		.detail
			.detail-title
				background: #222
				width: 100%
				line-height: 0.46rem
				font-size: 0.26rem
				padding: 0 0.2rem
			.detail-cont
				display: flex
				align-items: center
				overflow: hidden
				.index
					flex: 0 0 0.8rem
					text-align: center
					font-size: 0.24rem
				.item
					width: 86%
					border-bottom: 0.01rem solid #333
					padding: 0.12rem 0
					overflow: hidden
					font-weight: 200
					.name
						font-size: 0.34rem
						line-height: 0.5rem
						overflow: hidden
						text-overflow: ellipsis
						white-space: nowrap
					.info
						font-size: 0.24rem
						line-height: 0.36rem
						color: #aaa	
						overflow: hidden
						text-overflow: ellipsis
						white-space: nowrap
		.back
			position: absolute
			top: 0 
			left: 0.05rem
			font-size: 0.5rem				

</style>