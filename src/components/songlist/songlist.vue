<template>
	<div class='songlist'>
		<h2 class="list-title">
			<p>推荐歌单 ></p>
		</h2>
		<div class="list-detail">
				<div v-for=' song in songlist' class='song-item'>
					<img :src="song.picUrl" class='song-pic'>
					<p class='song-text'>{{song.songListDesc}}</p>
				</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props: {
			songlist: {}
		}
	}
</script>

<style type="text/css" lang='stylus'>
	.songlist
		padding: 0.2rem 0;
		border-bottom: 0.01rem solid #aaa
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
		text-align: center
		display: flex
		flex-wrap: wrap
		justify-content: space-between
		.song-item
			width: 32%
			float: left
			padding-bottom: 0.16rem
			.song-pic
				width:100%
			.song-text
				color: #bbb
				font-size: 0.13rem
				line-height: 1.2
				padding: 0.06rem 0.02rem
	.list-detail:after
		clear: both
		content: ''
		display: block
		height: 0
</style>