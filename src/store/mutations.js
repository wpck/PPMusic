
import * as types from './mutation-types'

const mutations = {
	[types.SET_PLAY_STATE]( state,flag ){
		state.pause = flag ;
	},
	[types.SET_FULL_SCREEN]( state,flag ){
		state.fullscreen = flag ;
	},
	[types.SET_SONGLIST]( state,list ){
		state.songlist = list ;
	},
	[types.SET_MODE]( state,mode ){
		state.mode = mode ;
	},
	[types.SET_CURRENT_INDEX]( state,index ){
		state.currentIndex = index ;
	},
	[types.SET_LYRIC_SHOW]( state,flag ){
		state.lyricshow = flag ;
	},
	[types.SET_GONEXT]( state ){
		if( state.currentIndex===state.songlist.length-1 ){
			state.currentIndex = 0;
		}else{
			state.currentIndex++;
		}
	},
	[types.SET_GOPREV]( state ){
		if( state.currentIndex===0 ){
			state.currentIndex = state.songlist.length-1;
		}else{
			state.currentIndex--;
		}
	}
}

export default mutations 