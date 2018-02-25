<template>
<div class='PPM-tab'>
	<router-link to='/recommend' tag='div' class='tab-item'>
		<div class='tab-name'>个性推荐</div>
	</router-link>
	<router-link to='/rank' tag='div' class='tab-item'>
		<div class='tab-name'>排行榜</div>
	</router-link><!-- 
	<router-link to='/search' tag='div' class='tab-item'>
		<div class='tab-name'>搜索</div>
	</router-link> -->
</div>
</template>

<script type="text/javascript">

	export default{

	}
</script>

<style type="text/css" lang='stylus'>
	.PPM-tab
		position: fixed
		top: 1.28rem
		width: 100%
		display: flex
		z-index:100
		background: #000
		border-bottom: 0.01rem solid #888
		.tab-item
			flex: 1
			text-align: center
			height: 0.9rem
			color: #aaa
			.tab-name
				line-height: 0.9rem
				font-size: 0.36rem
	.router-link-active
		.tab-name
			color: #fff
			border-bottom: 0.04rem solid #fff			
</style>