

export const pause = state => state.pause

export const fullscreen = state => state.fullscreen

export const songlist = state => state.songlist

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentsong = (state) => {
	return state.songlist[state.currentIndex]||{} ;
}

export const lyricshow = state => state.lyricshow ;

// export const currentlyric = (state) =>{
// 	return state.songlist[state.currentIndex].lyric || '' ;
// }
