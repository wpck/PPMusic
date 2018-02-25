<template>
    <div id="app">
        <div class="PPM-title">PPMusic<span class='descript'>-随时随地听你想听</span></div>
        <tab></tab>
        <keep-alive>
            <router-view/>
        </keep-alive>
        <!--播放器组件-->
        <player></player>
        <!--歌词组件-->
        <!-- <lyric></lyric> -->
    </div>
</template>

<script>

import tab from '@/components/tab/tab'
import player from '@/components/player/player'
import lyric from '@/components/lyric/lyric'

export default {
    components: {
        tab,
        player,
        lyric
    }
}
</script>

<style lang='stylus'>
#app 
    
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    background: #000
    color: #fff
    width: 100%
    padding-bottom: 0.8rem

.PPM-title
    position: fixed
    top: 0
    left: 0
    padding: 0 0.1rem
    width: 100%
    height: 1.28rem
    background: rgb(64,58,50)
    line-height: 1.28rem
    font-size: 0.50rem
    z-index: 100
    box-sizing: border-box
    .descript
        font-size: 0.30rem
        margin-left: 0.1rem
</style>
